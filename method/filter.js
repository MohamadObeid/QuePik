const filter = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    var element = params.element || local.element
    var value = params.value || local.element.value

    if (!value) return
    value = value.toLowerCase()
    var textEl = [...element.getElementsByClassName('text')]

    textEl.map(el => {
        if (el.innerHTML.toLowerCase().includes(value)) el.parentElement.style.display = 'flex'
        else el.parentElement.style.display = 'none'
    })
}

module.exports = {filter}