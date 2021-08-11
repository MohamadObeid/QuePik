const { clone } = require("./clone")
const { setContent } = require("./setContent")
const { update } = require("./update")

const createData = ({ VALUE, params, id }) => {
    var local = VALUE[id]
    var data = params.data

    local.derivations.reduce((o, k, i) => {
        if (i === local.derivations.length - 1) return o[k] = data
        return o[k]
    }, local.DATA)
}

const pushData = ({ VALUE, params }) => {
    var value = params.data
    setData({ VALUE, value })
}

const setData = ({ VALUE, STATE, params = {}, id }) => {
    var local = VALUE[id]
    if (!local.DATA) return

    var path = params.path
    if (path) path = path.split('.')
    else path = []

    var value = params.value || params.data

    var derivations = clone(local.derivations)
    if (params.derivations) derivations = params.derivations.split('.')

    if (!value) value = ''
    local.data = value

    setContent({ VALUE, params: { value }, id })

    var keys = [...derivations, ...path]

    keys.reduce((o, k, i) => {
        if (!o) return o

        if (i === keys.length - 1) {

            if (Array.isArray(o[k]) && typeof value !== 'object') {

                if (isNaN(k) && o[k].length === 0) {

                    local.derivations.push(0)
                    o[k][0] = value

                } else o[k].push(value)


            } else o[k] = value

        } else {
            if (!o[k]) return o[k] = {}

            if (i === keys.length - 2 && !value) {
                if (Array.isArray(o[k]) && o[k].length === 1) {
                    delete o[k]
                    local.derivations.pop()
                    update({ VALUE, STATE, params: { parent: true }, id })
                }
            }
        }

        return o[k]
    }, local.DATA)
}

const clearData = ({ VALUE, id }) => {
    setData({ VALUE, id })
}

const removeData = ({ VALUE, id, params = {} }) => {
    var local = VALUE[id]
    if (!local.DATA) return

    var path = params.path
    path = path ? path.split('.') : []
    path = [...local.derivations, ...path]

    path.reduce((o, k, i) => {
        if (i === path.length - 1) return delete o[k]
        return o[k]
    }, local.DATA)
    
}

module.exports = {createData, setData, pushData, clearData, removeData}