/*const axios = require('axios')
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
}*/

const { capitalize } = require("./capitalize")
const { keys } = require("./keys")
const { toAwait } = require('./toAwait')
const { toFirebaseOperator } = require("./toFirebaseOperator")

module.exports = {
    search: async ({ VALUE, STATE, id, e, params }) => {
        
        var local = VALUE[id]
        var search = params.search
        var collection = search.path
        var ref = STATE.db.collection(collection)

        search.limit = !search.limit ? 25 : search.limit

        if (!search.signin) {
            search.orderBy = !search.orderBy ? "creation-date" : search.orderBy
            if (search.orderBy === "creation-date") search.startAfter = !search.startAfter ? "0" : search.startAfter
        }
        
        // search fields
        if (search.fields)
        Object.entries(search.fields).map(([key, value]) => {
    
            var operator = keys(value)[0]
            ref = ref.where(key, toFirebaseOperator(operator), value[operator])
        })
        
        if (search.orderBy) ref = ref.orderBy(search.orderBy)
        if (search.limit) ref = ref.limit(search.limit)
        if (search.offset) ref = ref.endAt(search.offset)
        if (search.limitToLast) ref = ref.limitToLast(search.limitToLast)
    
        if (search.startAt) ref = ref.startAt(search.startAt)
        if (search.startAfter) ref = ref.startAfter(search.startAfter)
    
        if (search.endAt) ref = ref.endAt(search.endAt)
        if (search.endBefore) ref = ref.endBefore(search.endBefore)

        // push options to STATE
        STATE[`${local.Data}-options`] = STATE[`${local.Data}-options`] || {}
        STATE[`${local.Data}-options`].search = search
    
        // retrieve data
        var data = []
        var snapshot = ref.get()
        
        snapshot.then(query => {
            
            query.forEach(doc => data.push(doc.data()))
        
            local.search = {
                data,
                success: true,
                message: `${capitalize(search.path)} mounted successfuly!`
            }
            
            console.log(local.search)
                        
            // await params
            toAwait({ VALUE, STATE, id, e, params })
        })
        .catch(error => {
    
            local.search = {
                success: false,
                message: error,
            }
            
            console.log(local.search)
        })
    }
}