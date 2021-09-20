const pause = ({ VALUE, id }) => {
    var local = VALUE[id]
    clearTimeout(local['note-timer'])
}

module.exports = {pause}