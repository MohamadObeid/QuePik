const { toPath } = require("./toKey")
const { toArray } = require("./toArray")
const { toValue } = require("./toValue")
const { clone } = require("./clone")
const { reducer } = require("./reducer")

const toParam = ({ VALUE, STATE, string, e, id }) => {

    const { toApproval } = require("./toApproval")

    var localId = id

    if (typeof string !== 'string' || !string) return string || {}
    var params = {}

    string.split(';').map(param => {

        var key, value, id = localId, local = VALUE[localId]

        if (param.includes('=')) {

            var keys = param.split('=')
            key = keys[0]
            value = param.substring(key.length + 1)
            
        } else {

            key = param

            // !key;
            if (key.includes('!')) {

                if (key.split('!')[0]) key = key.split('!')[0]
                else key = key.split('!')[1]
                value = false
            }
        }

        value = toValue({ VALUE, STATE, id, e, params: { value, params } })
        
        // condition not approved
        if (value === '*return*') return
        
        id = localId
        
        var keys = typeof key === 'string' ? key.split('.') : []

        // keys from brackets to dots
        key = toPath({ VALUE, STATE, string: key, e, id })

        // id
        if (key && key.includes('::')) {

            var newId = key.split('::')[1]
            key = key.split('::')[0]

            // id
            id = toValue({ VALUE, STATE, id, params: { value: newId }, e })
        }
        
        // conditions
        if (key && key.includes('<<')) {

            var condition = key.split('<<')[1]
            var approved = toApproval({ STATE, VALUE, id, e, string: condition })
            if (!approved) return
            key = key.split('<<')[0]
            
        }
        
        var local = VALUE[id]
        if (!local) return

        keys = key.split('.')
        
        // object structure
        if (keys && keys.length > 1) {
            
            // mount state & value without using setState & setData
            if (keys[0] === 'state' || keys[0] === 'value') {
                
                var object = keys[0] === 'state' ? STATE : (keys[0] === 'value' && local)
                var keys = keys.slice(1)

                reducer({ VALUE, STATE, id, params: { path: keys, value, key, object } })
            }

            else keys.reduce((obj, key, index) => {

                if (obj[key] !== undefined) {

                    if (index === keys.length - 1) {
                        
                        // if key=value exists => mount the existing to local, then mount the new value to params
                        keys.reduce((o, k, i) => {
                            if (i === keys.length  - 1) return o[k] = value
                            return o[k] || {}
                        }, VALUE[id])

                        return obj[key] = value

                    }

                } else {

                    if (index === keys.length - 1) return obj[key] = value
                    else obj[key] = {}

                }

                return obj[key]
            }, params)

        } else {

            if (params[key]) {

                params[key] = toArray(params[key])
                params[key].push(value)

            } else params[key] = value
        }
    })
    
    return params
}

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

module.exports = {toParam}