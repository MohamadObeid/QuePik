const { clone } = require("./clone")
const { setContent } = require("./setContent")

const createData = ({ STATE, VALUE, params, id }) => {
    var local = VALUE[id]
    var data = params.data

    local.derivations.reduce((o, k, i) => {
        if (i === local.derivations.length - 1) return o[k] = data
        return o[k]
    }, STATE[local.Data])
}

const pushData = ({ STATE, VALUE, params }) => {
    var value = params.data
    setData({ STATE, VALUE, value })
}

const setData = ({ STATE, VALUE, params = {}, id }) => {
    var local = VALUE[id]
    if (!STATE[local.Data]) return

    var path = params.path
    if (path) path = path.split('.')
    else path = []

    
    // convert string numbers paths to num
    path = path.map(k => { 
        if (!isNaN(k)) k = parseFloat(k) 
        return k
    })

    var value = (params.value !== undefined && params.value) || params.data

    var derivations = clone(local.derivations)
    if (params.derivations) derivations = params.derivations.split('.')

    if (value === undefined) value = ''
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
                /*if (Array.isArray(o[k]) && o[k].length === 1) {
                    delete o[k]
                    local.derivations.pop()
                    update({ VALUE, STATE, id: local.parent })
                }*/
            }
        }

        return o[k]
    }, STATE[local.Data])
}

const clearData = ({ VALUE, STATE, id }) => {
    setData({ VALUE, STATE, id })
}

const removeData = ({ STATE, VALUE, id, params = {} }) => {
    var local = VALUE[id]
    if (!STATE[local.Data]) return

    var path = params.path
    path = path ? path.split('.') : []

    // convert string numbers paths to num
    path = path.map(k => { 
        if (!isNaN(k)) k = parseFloat(k) 
        return k
    })
    
    path = [...local.derivations, ...path]
    
    path.reduce((o, k, i) => {
        if (i === path.length - 1) {
            if (Array.isArray(o)) return o.splice(k, 1)
            else return delete o[k]
        }
        return o[k]
    }, STATE[local.Data])

    setContent({ VALUE, id })
    console.log(STATE[local.Data]);
}

module.exports = {createData, setData, pushData, clearData, removeData}