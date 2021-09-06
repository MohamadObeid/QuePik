const axios = require('axios')
const { update } = require('./update')

const save = async ({ VALUE, STATE, params = {}, id }) => {

    var local = VALUE[id]
    if (!local) return

    var save = params.save
    if (!save.data['file-name']) return

    var { data: { data, message, success } } = await axios.post(`/api/${save.api}`, save.data)

    STATE[save.api][data['file-name']] = data

    if (save.state && STATE[save.state]) {

        var exist = STATE[save.state].find(el => el['file-name'] === data['file-name'])

        if (exist) exist = data
        else STATE[save.state].push(data)

    }
    
    if (save.update) update({ VALUE, STATE, id: save.update })

    console.log(data, message, success)
}

module.exports = { save }