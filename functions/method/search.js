const axios = require('axios')
const { toAwait } = require('./toAwait')
const { toString } = require('./toString')

module.exports = {
    search: async ({ VALUE, STATE, id, e, params }) => {

        var local = VALUE[id]
        if (!local) return
        
        var search = params.search
        var { data: { data, message, success } } = await axios.get(`/api/${search.path}${search.options ? `/${toString(search.options)}` : ''}`)

        local.search = { data, message, success }
        
        console.log(data, message, success)
                    
        // await params
        toAwait({ VALUE, STATE, id, e, params })
    }
}