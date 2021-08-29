const { update } = require('./update')

const sort = ({ VALUE, STATE, params = {}, id }) => {

    var local = VALUE[id]
    if (!local) return

    var Data = params.Data || local.Data
    var options = STATE[`${Data}-options`]
    var data = STATE[Data]

    options.sort = options.sort === 'ascending' ? 'descending' : 'ascending'
    var path = (params.path || '').split('.')

    data.sort((a, b) => {

        a = path.reduce((o, k) => o[k], a)
        if (a !== undefined) a = a.toString()

        b = path.reduce((o, k) => o[k], b)
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

    update({ VALUE, STATE, id: local.parent })
}

module.exports = {sort}