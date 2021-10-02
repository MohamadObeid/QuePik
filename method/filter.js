const { toArray } = require('./toArray')

const filter = ({ VALUE, STATE, params = {}, id, e }) => {

    var local = VALUE[id]
    if (!local) return
    
    var filter = params.filter || {}
    var Data = filter.Data || local.Data
    var options = STATE[`${Data}-options`]

    var path = toArray(filter.path)
    path = path.map(path => path.split('.'))
    
    var backup = filter.backup
    var value = filter.value

    if (options.filter === value) return options.filter = value

    // reset backup filter options
    options.filter = value

    // empty value
    if (value === undefined || value === '') return STATE[Data] = backup
    
    // remove spaces
    value = value.split(' ').join('').toLowerCase()
    
    var data = []
    data.push(...backup.filter(data => 
        path.map(path => path

            .reduce((o, k) => o[k], data)
            .toString()
            .toLowerCase()
            .split(' ')
            .join('')
        )
        .join('')
        .includes(value)
    ))

    STATE[Data] = data
}

module.exports = {filter}