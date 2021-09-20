const close = ({ VALUE, id }) => {
    var local = VALUE[id]
    clearTimeout(local['note-timer'])
    local.element.style.transform = 'translateY(-200%)'
}

module.exports = {close}