const {clone} = require('./clone')

const filter = ({ VALUE, STATE, params = {}, id }) => {
    var local = VALUE[id]
    if (!local) return
    
    var filter = params.filter || {}
    var Data = filter.Data || local.Data
    var options = STATE[`${Data}-options`]
    var backupData = clone(options.backup)
    var path = (filter.path || '').split('.')
    var value = filter.value
    
    options.filter = value

    // no value
    if (value === '' || value === undefined) return STATE[Data] = backupData

    STATE[Data] = backupData.filter(data => 
        path.reduce((o, k, i) => o[k], data).toString().toLowerCase().includes(value.toLowerCase())
    )
}

module.exports = {filter}