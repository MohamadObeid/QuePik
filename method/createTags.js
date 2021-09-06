const { clone } = require("./clone")
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { createComponent } = require("./createComponent")
const { toTag } = require("./toTag")

const actions = ['flicker']

const createTags = ({ VALUE, STATE, id }) => {
    
    const { execute } = require("./execute")

    var local = VALUE[id]
    if (!local) return

    if (Array.isArray(local.data)) {

        local.length = local.data.length || 1
        var $ = clone(local)
        delete VALUE[id]
        
        return $.data.map((data, index) => {

            var id = generate()
            var local = clone($)

            local.derivations = [...local.derivations, index]
            local.data = data
            local.id = id

            VALUE[id] = local
            
            // components
            createComponent({ VALUE, STATE, id })
            
            var local = VALUE[id]

            // execute onload actions
            actions.map(action => {
                if (local[action]) {
                    local.actions = toArray(local.actions)
                    local.actions.push(action)
                }
            })

            if (local.actions) execute({ VALUE, STATE, actions: local.actions, id })

            return toTag({ STATE, VALUE, id })

        }).join('')
    }

    if (local.originalKeys) {
        
        var keys = Object.keys(clone(local.data)).filter(key => !local.originalKeys.includes(key))
        
        if (keys.length > 0) {
            
            local.length = keys.length
            var $ = clone(local)
            delete VALUE[id]
            
            return keys.map(key => {

                var id = generate()
                var local = clone($)

                local.id = id
                local.key = key

                VALUE[id] = local
                
                // components
                createComponent({ VALUE, STATE, id })
                
                var local = VALUE[id]
                
                // execute onload actions
                actions.map(action => {
                    if (local[action]) {
                        local.actions = toArray(local.actions)
                        local.actions.push(action)
                    }
                })
                
                if (local.actions) execute({ VALUE, STATE, actions: local.actions, id })
                return toTag({ STATE, VALUE, id })

            }).join('')
        }
    }

    // components
    createComponent({ VALUE, STATE, id })
    
    var local = VALUE[id]
    local.length = 1

    // execute onload actions
    actions.map(action => {
        if (local[action]) {
            local.actions = toArray(local.actions)
            local.actions.push(action)
        }
    })
    
    // execute onload actions
    if (local.actions) execute({ VALUE, STATE, id, actions: local.actions, instantly: true })

    return toTag({ STATE, VALUE, id })
}

module.exports = {createTags}