const { clearIntervals } = require("./clearIntervals")
const { starter } = require("./starter")

const update = ({ STATE, VALUE, id }) => {

    const { createElement } = require("./createElement")

    var local = VALUE[id]
    if (!local) return

    clearIntervals({ VALUE, id })
    removeIds({ VALUE, id })
    
    var innerHTML = createElement({ STATE, VALUE, id })
    local.element.style.opacity = '0'
    local.element.innerHTML = innerHTML

    setTimeout(() => local.element.style.opacity = '1', 50)

    if (local.childrenSiblings) local.childrenSiblings.map(id => starter({ STATE, VALUE, id }))
    
    console.log('#', Object.entries(VALUE).length)

}

const removeIds = ({ VALUE, id }) => {
    var local = VALUE[id]

    local.childrenSiblings && local.childrenSiblings.map(id => {

        if (!VALUE[id]) return
        removeIds({ VALUE, id })
        delete VALUE[id]
    })
}

module.exports = {update, removeIds}