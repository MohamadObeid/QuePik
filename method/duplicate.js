const { clearValues } = require('./clearValues')
const { clone } = require('./clone')
const { toArray } = require('./toArray')
const { derive } = require('./derive')
const { isEqual } = require('./isEqual')
const { removeDuplicates } = require('./removeDuplicates')
const { generate } = require('./generate')

const duplicate = ({ VALUE, STATE, params = {}, id }) => {

    const { createElement } = require('./createElement')
    const { starter } = require('./starter')

    var local = VALUE[id]
    if (!local) return

    if (STATE[local.Data]) {

        var keys = clone(local.derivations)
        var index = params.index || 0
        var path = params.path ? params.path('.') : []
        
        // convert string numbers paths to num
        if (path.length > 0)
            path = path.map(k => { 
                if (!isNaN(k)) k = parseFloat(k) 
                return k
            })

        if (params.path) keys.push(...path)

        // last index refers to data index => must be poped
        if (!isNaN(keys[keys.length - 1])) {
            index = keys[keys.length - 1]
            keys.pop()
        }

        keys.reduce((o, k, i) => {

            if (i === keys.length - 1) {

                o[k] = toArray(o[k])
                i = o[k].length - 1

                if (i === 0) local.derivations.push(0)
                o[k].push(clone(local.pushData || o[k][i] || ''))

                if (!params.keepValues) {
                    var i = o[k].length - 1
                    o[k][i] = removeDuplicates(clearValues(o[k][i]))
                }
            }

            return o[k]

        }, STATE[local.Data])

    } else {

        var index = params.index || (local.children.length - 1)
        local.children.push(local.children[index])

    }

    var length = local.length || 1
    var id = generate()
    
    VALUE[id] = clone(VALUE[local.parent].children[local.index])
    VALUE[id].id = id
    VALUE[id].parent = local.parent
    VALUE[id].duplicating = true
    VALUE[id].index = local.index
    VALUE[id].derivations = [...local.derivations]

    var local = VALUE[id]
    
    local.derivations[local.derivations.length - 1] = length
    
    // create element => append child
    var newcontent = document.createElement('div')
    newcontent.innerHTML = createElement({ STATE, VALUE, id })

    while (newcontent.firstChild) {
        VALUE[local.parent].element.appendChild(newcontent.firstChild)
    }

    // update length
    var children = [...VALUE[local.parent].element.children]
    children.map(child => {
        var id = child.id
        VALUE[id].length = length + 1
    })

    // starter
    starter({ STATE, VALUE, id })
}

const duplicates = ({ STATE, VALUE, params, id }) => {
    var local = VALUE[id]

    var [data] = derive(STATE[local.Data], local.derivations), exists
    if (!params.data) return false

    data = toArray(data)
    if (params.data) exists = data.find(data => isEqual(data, params.data))
    else {
        data.map(data0 => {
            if (!exists) exists = data.find(data1 => isEqual(data0, data1))
        })
    }

    return exists
}

module.exports = {duplicate, duplicates}