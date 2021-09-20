const { reducer } = require('./reducer')
const { update } = require('./update')

const sort = ({ VALUE, STATE, params = {}, id }) => {

    var local = VALUE[id]
    if (!local) return

    var sort = params.sort || {}
    var Data = sort.Data || local.Data
    var options = STATE[`${Data}-options`]
    var data = STATE[Data]
    
    options.sort = options.sort === 'ascending' ? 'descending' : 'ascending'
    var path = (sort.path || '').split('.')
    
    data.sort((a, b) => {

        a = reducer({ VALUE, STATE, id, params: { path, object: a } })
        if (a !== undefined) a = a.toString()

        b = reducer({ VALUE, STATE, id, params: { path, object: b } })
        if (b !== undefined) b = b.toString()
        
        if (options.sort === 'ascending') {

            if (!isNaN(a)) return b - a

            if (a < b) return -1
            return a > b ? 1 : 0

        } else {

            if (!isNaN(a)) return a - b

            if (b < a) return -1
            return b > a ? 1 : 0
        }
    })

    if (sort.update) update({ VALUE, STATE, id: sort.update })
}

module.exports = {sort}