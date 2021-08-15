const { clearValues } = require('./clearValues')
const { clone } = require('./clone')
const { toArray } = require('./toArray')
const { derive } = require('./derive')
const { isEqual } = require('./isEqual')
const { removeDuplicates } = require('./removeDuplicates')
const { update } = require('./update')

const duplicate = ({ VALUE, STATE, params = {}, id }) => {

    var local = VALUE[id]
    if (!local) return

    if (local.DATA) {

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

        //if (keys.length === 0) local.parent.children.push(clone(local.parent.children[index]))

        keys.reduce((o, k, i) => {

            if (i === keys.length - 1) {

                o[k] = toArray(o[k])
                i = o[k].length - 1

                o[k].push(clone(local.pushData || o[k][i] || ''))

                if (!params.keepValues) {
                    var i = o[k].length - 1
                    o[k][i] = removeDuplicates(clearValues({ params: { values: o[k][i] } }))
                }
            }

            return o[k]

        }, local.DATA)

    } else {

        var index = params.index || (local.children.length - 1)
        local.children.push(local.children[index])

    }

    update({ VALUE, STATE, id: local.parent })
}

const duplicates = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    var [data] = derive(local.DATA, local.derivations), exists
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