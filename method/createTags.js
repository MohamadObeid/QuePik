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

    if (Array.isArray(local.data) && local.data.length > 0) {

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
            componentModifier({ VALUE, STATE, id })
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
        
        var keys = Object.keys(clone(local.data || {})).filter(key => !local.originalKeys.includes(key))
        
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
                componentModifier({ VALUE, STATE, id })
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

    // push index 0 to deriv for data = []
    if (Array.isArray(local.data) && local.data.length === 0) {
        local.derivations = [...local.derivations, 0]
        local.data = undefined
    }

    // components
    componentModifier({ VALUE, STATE, id })
    createComponent({ VALUE, STATE, id })
    
    var local = VALUE[id]
    local.length = 1

    componentModifier({ VALUE, STATE, id })

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

const componentModifier = ({ VALUE, STATE, id }) => {
    var local = VALUE[id]
    
    // icon
    if (local.type === 'Icon') {
        local.icon = local.icon || {}
        local.icon.name = local.icon.name || ''
        if (local.icon.google) local.google = true

        if (local.icon.outlined || local.icon.type === 'outlined') local.outlined = true
        else if (local.icon.rounded || local.icon.type === 'rounded') local.rounded = true
        else if (local.icon.sharp || local.icon.type === 'sharp') local.sharp = true
        else if (local.icon.twoTone || local.icon.type === 'twoTone') local.twoTone = true
    }

    // textarea
    else if (local.textarea && !local.templated) {
        local.style = local.style || {}
        local.input = local.input || {}
        local.input.style = local.input.style || {}
        local.input.style.height = 'fit-content'
        local.style.minHeight = '4rem',
        local.input.style.minHeight = '2.5rem'
    }

    // input
    else if (local.type === 'Input') {
        local.input = local.input || {}
        if (local.checked !== undefined) local.input.checked = local.checked
        if (local.max !== undefined) local.input.max = local.max
        if (local.min !== undefined) local.input.min = local.min
        if (local.name !== undefined) local.input.name = local.name 
        if (local.defaultValue !== undefined) local.input.defaultValue = local.defaultValue
    }

    // image
    else if (local.type === 'Image') {
        local.src = local.src || local.data || ''
    }
}

module.exports = {createTags}