import Option from './Option'
import { decode } from 'html-entities'

export default function QandA({ question, answers, index, chooseCurrent }) {
  const shuffledOptions = answers.map(
    ({ optionText, chosen, correct, id, red, green, skipped }) => (
      <Option
        key={id}
        optionText={optionText}
        chosen={chosen}
        correct={correct}
        index={index}
        chooseCurrent={chooseCurrent}
        id={id}
        red={red}
        green={green}
        skipped={skipped}
      />
    ),
  )

  return (
    <article className="quiz__qa">
      <h2 className="quiz__question">{decode(question)}</h2>
      <section className="options">{shuffledOptions}</section>
    </article>
  )
}
