const { clearIntervals } = require("./clearIntervals")
const { starter } = require("./starter")

const update = ({ STATE, VALUE, params = {}, id }) => {

    const { createElement } = require("./createElement")

    var local = VALUE[id]
    if (!local) return

    if (params.parent) {

        var id = local.parent
        var local = VALUE[id]
        
        clearIntervals({ VALUE, id })
        removeId({ VALUE, id })

        var innerHTML = createElement({ STATE, VALUE, id })
        local.element.innerHTML = innerHTML

        if (local.childrenSiblings) local.childrenSiblings.map(id => starter({ STATE, VALUE, id }))

        console.log('#', Object.entries(VALUE).length)

    } else {

        clearIntervals({ VALUE, id })
        removeId({ VALUE, id })

        var innerHTML = createElement({ STATE, VALUE, id })
        local.element.innerHTML = innerHTML

        if (local.childrenSiblings) local.childrenSiblings.map(id => starter({ STATE, VALUE, id }))

        console.log('#', Object.entries(VALUE).length)
    }

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