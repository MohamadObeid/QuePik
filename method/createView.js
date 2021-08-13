const { update } = require("./update")
const _view = require("../view/_view")

const createView = ({ STATE, VALUE, params, id }) => {

    var local = VALUE[id]
    var view = params.view

    if (!view) return
    if (local.view === view) return

    local.view = view
    if (!_view[view]) return

    local.children = [_view[view]]

    // update
    update({ VALUE, STATE, id })
}

module.exports = {createView}