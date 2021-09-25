const axios = require('axios')
const { update } = require('./update')

const erase = async ({ VALUE, STATE, id, params = {} }) => {

    var local = VALUE[id]
    if (!local) return

    var erase = params.erase
    if (!erase.data['file-name']) return

    var { data: { data, message, success } } = await axios.delete(`/api/${erase.path}`, { data: erase.data })

    delete STATE[erase.path][data['file-name']]
    
    if (erase.state) STATE[erase.state] = STATE[erase.state].filter(file => file['file-name'] !== data['file-name'])
    if (erase.update) update({ VALUE, STATE, id: erase.update })
    
    console.log(data, message, success)
}

module.exports = { erase }