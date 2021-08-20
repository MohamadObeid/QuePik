const { update } = require("./update")
const { generate } = require("./generate")

const createView = ({ STATE, VALUE, params, id }) => {

    var local

    // append view to root
    if (id === 'root') {

        id = generate()
        var element = document.createElement("div")
        element.id = id

        element.style.height = '100%'
        element.style.width = '100%'

        VALUE[id] = {element, id, derivations: []}
        local = VALUE[id]

        VALUE.root.element.appendChild(element)

    } else local = VALUE[id]

    if (!local) return
    
    var view = params.view

    if (!view) return
    //if (local.view === view) return

    local.view = view
    if (!STATE.view[view]) return

    local.children = [STATE.view[view]]
    
    // update
    update({ VALUE, STATE, id })

}

module.exports = {createView}