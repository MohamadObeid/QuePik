const axios = require('axios')
const { reducer } = require('./reducer')
const { toPath } = require('./toKey')
const { update } = require('./update')

const save = async ({ VALUE, STATE, params = {}, id, e }) => {

    var local = VALUE[id]
    if (!local) return

    var save = params.save
    if (!save.data['file-name']) return

    var { data: { data, message, success } } = await axios.post(`/api/${save.api}`, save.data)

    STATE[save.api] = STATE[save.api] || {}
    STATE[save.api][data['file-name']] = data

    if (save.path) {

        var value = data
        if (save.value) {

            var path = toPath({ VALUE, STATE, e, id, string: save.value }).split('.').slice(1)
            value = reducer({ VALUE, STATE, id, e, params: { object: value, path } })
        }

        var path = toPath({ VALUE, STATE, e, id, string: save.path }).split('.').slice(1)
        reducer({ VALUE, STATE, id, e, params: { object: STATE, path, value, key: save.path } })

    }

    if (save.state && STATE[save.state]) {

        var exist = STATE[save.state].find(el => el['file-name'] === data['file-name'])

        if (exist) exist = data
        else STATE[save.state].push(data)

    }
    
    if (save.update) update({ VALUE, STATE, id: save.update })

    console.log(data, message, success)
}

module.exports = { save }