const axios = require('axios')

module.exports = {
    search: async ({ VALUE, STATE, id, params }) => {

        var local = VALUE[id]
        if (!local) return

        var search = params.search
        var { data: { data, message, success } } = await axios.get(`/api/${search.path}${search.id ? `/id=[${search.id}]` : ''}`)

        local.search = { data, message, success }
        
        console.log(data, message, success)
    }
}