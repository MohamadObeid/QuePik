const actionNote = ({ VALUE, params }) => {

    var actionNote = VALUE['action-note']
    var actionNoteText = VALUE['action-note-text']

    var note = params.note
    if (!note) return

    clearTimeout(actionNote['note-timer'])

    actionNote.element.style.transition = 'initial'
    actionNote.element.style.transform = 'translateY(-200%)'

    actionNoteText.element.innerHTML = note

    actionNote.element.style.left = 'center'
    actionNote.element.style.transition = 'transform .2s'
    actionNote.element.style.transform = 'translateY(0)'

    const myFn = () => { 
        actionNote.element.style.transform = 'translateY(-200%)'
    }

    actionNote['note-timer'] = setTimeout(myFn, 5000)
}

module.exports = {actionNote}