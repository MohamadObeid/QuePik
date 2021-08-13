const { clearIntervals } = require("./clearIntervals")
const { starter } = require("./starter")

const update = ({ STATE, VALUE, id }) => {

    const { createElement } = require("./createElement")

    var local = VALUE[id]
    if (!local) return

    clearIntervals({ VALUE, id })
    removeId({ VALUE, id })

    var innerHTML = createElement({ STATE, VALUE, id })
    
    var transition = local.element.style.transition
    if (transition.includes('; opacity .1s')) {
        transition = transition.split('; opacity .1s')[0]
        transition += '; opacity 50ms'
        local.element.style.transition = transition
    }
    local.element.style.opacity = '0'

    setTimeout(() => {
        local.element.innerHTML = innerHTML
        var transition = local.element.style.transition
        if (transition.includes('; opacity 50ms')) {
            transition = transition.split('; opacity 50ms')[0]
            transition += '; opacity .1s'
            local.element.style.transition = transition
        }
        if (local.childrenSiblings) local.childrenSiblings.map(id => starter({ STATE, VALUE, id }))
    }, 50)
    
    setTimeout(() => local.element.style.opacity = '1', 100)

    console.log('#', Object.entries(VALUE).length)

}

const removeId = ({ VALUE, id }) => {
    var local = VALUE[id]

    local.childrenSiblings && local.childrenSiblings.map(id => {

        if (!VALUE[id]) return
        removeId({ VALUE, id })
        delete VALUE[id]
    })
}

module.exports = {update, removeId}