const { clone } = require("./clone")
const { setContent } = require("./setContent")
const { derive } = require("./derive")

const createData = ({ STATE, VALUE, params, id }) => {
    var local = VALUE[id]
    var data = params.data

    local.derivations.reduce((o, k, i) => {
        if (i === local.derivations.length - 1) return o[k] = data
        return o[k]
    }, STATE[local.Data])
}

const setData = ({ STATE, VALUE, params = {}, id }) => {
    
    var local = VALUE[id]
    if (!STATE[local.Data]) return
    
    var data = params.data
    var path = data.path
    var value = data.value

    if (value === undefined) value = ''
    if (path) path = path.split('.')
    else path = []

    
    // convert string numbers paths to num
    path = path.map(k => { 
        if (!isNaN(k)) k = parseFloat(k) 
        return k
    })

    var derivations = clone(local.derivations)
    if (data.derivations) derivations = data.derivations.split('.')

    // set local data equal to value
    local.data = value

    // keys
    var keys = [...derivations, ...path]
    
    keys.reduce((o, k, i) => {
        
        if (!o) return o
        
        if (i === keys.length - 1) {
            
            if (Array.isArray(o[k]) && typeof value !== 'object') {

                if (isNaN(k) && o[k].length === 0) {

                    local.derivations.push(0)
                    o[k][0] = value
                    
                } else o[k].push(value)


            } else return o[k] = value

        } else if (!o[k]) return o[k] = {}

        return o[k]

    }, STATE[local.Data])

    // set content
    var content = data.content || derive(STATE[local.Data], keys)[0]
    setContent({ VALUE, params: { content: { value: content } }, id })
}

const clearData = ({ VALUE, STATE, id }) => {
    setData({ VALUE, STATE, id })
}

const removeData = ({ STATE, VALUE, id, params = {} }) => {
    
    var local = VALUE[id];
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

module.exports = {createData, setData, clearData, removeData}