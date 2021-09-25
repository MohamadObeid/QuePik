const axios = require('axios')
const { toAwait } = require('./toAwait')

const save = async ({ VALUE, STATE, params = {}, id, e }) => {

    var local = VALUE[id]
    if (!local) return

    var save = params.save
    if (!save.data['file-name']) return

    var { data: { data, message, success } } = await axios.post(`/api/${save.path}`, save.data)

    local.save = { data, message, success }

    STATE[save.path] = STATE[save.path] || {}
    STATE[save.path][data['file-name']] = data

    console.log(data, message, success)
}

module.exports = { save }