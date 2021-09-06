const axios = require('axios')
const { update } = require('./update')

module.exports = {
    search: async ({ VALUE, STATE, id, params }) => {

        var local = VALUE[id]
        if (!local) return

        var search = params.search
        
        var { data: { data, message, success } } = await axios.get(`/api/${search.api}`)

        STATE[search.api] = { ...(STATE[search.api] || {}), ...data }

        if (search.state) STATE[search.state] = Object.entries(data).map(([k, v]) => v)
        if (search.update) update({ VALUE, STATE, id: search.update })

        console.log(data, message, success)
    }
}