const axios = require('axios')

module.exports = {
    search: async ({ VALUE, STATE, id, params }) => {

        var local = VALUE[id]
        if (!local) return

        var search = params.search
        
        var { data: { data, message, success } } = await axios.get(`/api/${search.path}`)

        local.search = { data, message, success }

        STATE[search.path] = STATE[search.path] || {}
        STATE[search.path][data['file-name']] = data

        console.log(data, message, success)
    }
}