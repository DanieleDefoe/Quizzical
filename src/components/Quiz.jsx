import QandA from './Q&A'
import Loading from './Loading'

import { useState, useEffect } from 'react'

import { nanoid } from 'nanoid'

import Confetti from 'react-confetti'

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState('')

  useEffect(() => {
    getQuestions()
  }, [])

  function chooseCurrent(idx, id) {
    setAnswers((prevAnswers) => {
      const copyOfAnswers = [...prevAnswers]
      return copyOfAnswers.map((el, index) => {
        if (index === idx) {
          return el.map((ans) => {
            if (ans.chosen && ans.id === id) {
              return ans
            } else if (ans.chosen) {
              return { ...ans, chosen: false }
            } else if (ans.id === id) {
              return { ...ans, chosen: true }
            }
            return ans
          })
        }
        return el
      })
    })
  }

  async function getQuestions() {
    setQuestions([])
    const response = await fetch('https://opentdb.com/api.php?amount=5')
    const data = await response.json()
    setQuestions(data.results)

    const allAnswers = data.results.map(
      ({ incorrect_answers, correct_answer }) => {
        const modifiedAnswers = incorrect_answers.map((ans) => ({
          chosen: false,
          correct: false,
          optionText: ans,
          id: nanoid(),
        }))
        const randIndex = parseInt(
          Math.random() * (modifiedAnswers.length + 1),
          10,
        )
        modifiedAnswers.splice(randIndex, 0, {
          chosen: false,
          correct: true,
          optionText: correct_answer,
          id: nanoid(),
        })

        return modifiedAnswers
      },
    )

    setAnswers(allAnswers)
    setResult('')
  }

  function checkAnswers() {
    setAnswers((group) =>
      group.map((ans) =>
        ans.map((el) => {
          if (el.correct) {
            return { ...el, green: true }
          } else if (el.chosen) {
            return { ...el, red: true }
          }
          return { ...el, skipped: true }
        }),
      ),
    )
    const count = answers.reduce((acc, curr) => {
      acc += curr.filter((el) => el.chosen && el.correct).length
      return acc
    }, 0)

    setResult(`You scored ${count} / ${answers.length} correct answers`)
  }

  const questionsData = questions.map(({ question }, index) => {
    return (
      <QandA
        key={nanoid()}
        question={question}
        answers={answers[index]}
        index={index}
        chooseCurrent={chooseCurrent}
      />
    )
  })

  return (
    <>
      {questions.length === 0 ? (
        <Loading />
      ) : (
        <main className="quiz">
          {questionsData}{' '}
          <div className="quiz__container">
            <p className="quiz__result">{result}</p>
            <button
              className="hero__button quiz__button"
              onClick={result.length > 0 ? getQuestions : checkAnswers}
            >
              {result.length > 0 ? 'Play again' : 'Check answers'}
            </button>
          </div>
        </main>
      )}
      {result.length > 0 && <Confetti />}
    </>
  )
}
