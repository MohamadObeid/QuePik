const { update } = require("./update")

const sort = ({ VALUE, STATE, params, id }) => {
    var local = VALUE[id]
    if (!local) return

    local.sort = local.sort === 'ascending' ? 'descending' : 'ascending'
    var path = params.path.split('.')
    var data = params.data || local.data || []

    data.sort((a, b) => {

        a = path.reduce((o, k) => o[k], a)
        if (a !== undefined) a = a.toString()

        b = path.reduce((o, k) => o[k], b)
        if (b !== undefined) b = b.toString()

        if (local.sort === 'ascending') {

            if (!isNaN(a)) return b - a

            if (a < b) return -1
            return a > b ? 1 : 0

        } else {

            if (!isNaN(a)) return a - b

            if (b < a) return -1
            return b > a ? 1 : 0
        }
    })

    if (params.id) {
        var id = params.id
        VALUE[id].Data = data
        update({ VALUE, STATE, id })
    }

}

module.exports = {sort}