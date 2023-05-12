export default function Header({ changeSection }) {
  return (
    <header className="hero">
      <h1 className="hero__title">Quizzical</h1>
      <p className="hero__subtitle">
        Solve fun quizzes about anything in the Universe!
      </p>
      <button type="button" className="hero__button" onClick={changeSection}>
        Start quiz
      </button>
    </header>
  )
}
