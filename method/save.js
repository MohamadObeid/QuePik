const axios = require('axios')
const { toAwait } = require('./toAwait')

const save = async ({ VALUE, STATE, params = {}, id, e }) => {

    var local = VALUE[id]
    if (!local) return

    var save = params.save
    if (!save.data['file-name']) return

    var { data: { data, message, success } } = await axios.post(`/api/${save.api}`, save.data)

    local.saved = { data, message, success }

    STATE[save.api] = STATE[save.api] || {}
    STATE[save.api][data['file-name']] = data
    
    // awaits
    toAwait({ VALUE, STATE, id, e, params })

    console.log(data, message, success)
}

module.exports = { save }