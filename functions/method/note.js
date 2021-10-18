const note = ({VALUE, params}) => {
  const note = VALUE["action-note"]
  const noteText = VALUE["action-note-text"]

  if (!params.note) return

  clearTimeout(note["note-timer"])

  note.element.style.transition = "initial"
  note.element.style.transform = "translateY(-200%)"

  noteText.element.innerHTML = params.note

  note.element.style.left = "center"
  note.element.style.transition = "transform .2s"
  note.element.style.transform = "translateY(0)"

  const myFn = () => note.element.style.transform = "translateY(-200%)"

  note["note-timer"] = setTimeout(myFn, 5000)
}

module.exports = {note}
