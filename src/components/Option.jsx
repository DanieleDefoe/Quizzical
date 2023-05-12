import { decode } from 'html-entities'

export default function Option({
  optionText,
  chosen,
  chooseCurrent,
  index,
  id,
  red,
  green,
  skipped,
}) {
  let classList = 'options__title'

  if (chosen) {
    classList += ' chosen'
  }

  if (red) {
    classList += ' red'
  }

  if (green) {
    classList += ' green'
  }

  if (skipped) {
    classList += ' skipped'
  }
  return (
    <button
      type="button"
      className={classList}
      onClick={() => chooseCurrent(index, id)}
    >
      {decode(optionText)}
    </button>
  )
}
