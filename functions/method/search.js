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

const { keys } = require("./keys")
const { toAwait } = require('./toAwait')
const { toFirebaseOperator } = require("./toFirebaseOperator")

module.exports = {
    search: async ({ VALUE, STATE, id, e, params }) => {
        
        var local = VALUE[id]
        var search = params.search
        var collection = search.path
        var options = search.options || {}
        var ref = STATE.db.collection(collection)

        // search fields
        if (options.fields)
        Object.entries(options.fields).map(([key, value]) => {
    
            var operator = keys(value)[0]
            if (Array.isArray(value[operator]))
            value[operator].map(value => ref = ref.where(key, toFirebaseOperator(operator), value))
            else ref = ref.where(key, toFirebaseOperator(operator), value[operator])
        })
    
    
        if (options.orderBy) ref = ref.orderBy(options.orderBy)
        if (options.limit) ref = ref.limit(options.limit)
    
        if (options.startAt) ref = ref.startAt(options.startAt)
        if (options.startAfter) ref = ref.startAfter(options.startAfter)
    
        if (options.endAt) ref = ref.endAt(options.endAt)
        if (options.endBefore) ref = ref.endAt(options.endBefore)
    
        // retrieve data
        var data = []
        ref.get()
        .then(query => {
    
            query.forEach(doc => data.push(doc.data()))
        
            local.search = {
                data,
                success: true,
                message: `Data mounted successfuly!`
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