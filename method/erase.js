const axios = require('axios')

const erase = async ({ VALUE, STATE, id, params = {} }) => {

    var local = VALUE[id]
    if (!local) return

    var erase = params.erase
    var { data: { data, message, success } } = await axios.delete(`/api/${erase.path}${erase.id ? `/id=[${erase.id}]` : ''}`)
    
    local.erase = { data, message, success }

    console.log(data, message, success)
}

module.exports = { erase }