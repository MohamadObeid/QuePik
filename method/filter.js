const {update} = require('./update')

const filter = ({ VALUE, STATE, params = {}, id }) => {
    var local = VALUE[id]
    if (!local) return
    
    var filter = params.filter || {}
    var Data = filter.Data || local.Data
    var options = STATE[`${Data}-options`]
    var backup = filter.backup
    var path = (filter.path || '').split('.')
    var value = filter.value
    
    if (options.filter === value) return
    options.filter = value
    
    // no value
    if (value === '' || value === undefined) STATE[Data] = backup
    else STATE[Data] = backup.filter(data => 
        path.reduce((o, k, i) => o[k], data).toString().toLowerCase().includes(value.toLowerCase())
    )

    if (filter.update) update({ VALUE, STATE, id: filter.update })
}

module.exports = {filter}