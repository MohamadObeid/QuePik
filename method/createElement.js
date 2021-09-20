const { generate } = require("./generate")
const { toParam } = require("./toParam")
const { toApproval } = require("./toApproval")
const { override } = require("./merge")
const { clone } = require("./clone")
const { derive } = require("./derive")
const { createTags } = require("./createTags")

const createElement = ({ STATE, VALUE, id }) => {

    var innerHTML = ''
    var local = VALUE[id]
    var parent = VALUE[local.parent]

    // html
    if (local.html) return local.html

    // view value
    if (local.view && STATE.view[local.view]) local = clone(STATE.view[local.view])

    // no value
    if (!local.type) return

    // destructure type, params, & conditions from type
    var type = local.type.split('?')[0]
    var params = local.type.split('?')[1] 
    var conditions = local.type.split('?')[2]

    // [type]
    if (type.slice(0, 1) === '[' && type.slice(-1) === ']') {
        type = type.slice(1).slice(0, -1)
        local.mapType = true
    }
    local.type = type

    // parent
    local.parent = parent.id

    // id 
    local.id = local.id || generate()
    id = local.id

    // class
    local.class = local.class || ''

    // Data
    local.Data = parent.Data
    local.data = parent.data
    
    // derivations
    local.derivations = local.derivations || [...(parent.derivations || [])]

    // first mount of local
    VALUE[id] = local

    /////////////////// approval & params /////////////////////
    
    // approval
    var approved = toApproval({ VALUE, STATE, string: conditions, id })
    if (!approved) return
    
    // push destructured params from type to local
    if (params) {

        params = toParam({ VALUE, STATE, string: params, id })
        Object.entries(params).map(([k, v]) => local[k] = v )
        
        if (params.id) {

            delete Object.assign(VALUE, { [params.id]: VALUE[id] })[id]
            id = params.id

        }
        
        if (params.data && (!local.Data || params.Data)) {
            
            var state = local.Data
            if (!state) state = local.Data = generate()
            STATE[state] = clone(local.data || STATE[state])
            STATE[`${state}-options`] = STATE[`${state}-options`] || {}

        }

    } else params = {}

    // pass to children
    if (parent.toChildren) {

        if (typeof parent.toChildren === 'string')
        parent.toChildren = toParam({ VALUE, STATE, string: parent.toChildren, id })
        local = override(local, parent.toChildren)
    }

    if (local.duplicating) {

        delete local.path
        delete local.data
    }

    // path
    var path = typeof local.path === 'string' && local.path !== '' ? local.path.split('.') : []
    if (path.length > 0) {

        if (!local.Data) {

            var state = local.Data = generate()
            STATE[state] = local.data || {}
            STATE[`${state}-options`] = { backup: clone(STATE[state]) }
            
        }

        // convert string numbers paths to num
        path = path.map(k => { 
            if (!isNaN(k)) k = parseFloat(k) 
            return k
        })

        // push path to a data array and derivations last element is not an index
        if (isNaN(path[0])) {
            var data = derive(STATE[parent.Data], parent.derivations)[0]
            if (Array.isArray(data)) local.derivations.push(0)
        }

        local.derivations.push(...path)
    }
    
    
    // data (turnoff is do not mount data)
    var data, isArray, derivations = clone(local.derivations)
    if (parent.turnoff || local.turnoff) { data = local.data || ''; local.turnoff = true }                                // params cz local.data is inherited from parent which is not default
    else { [data, derivations, isArray] = derive(STATE[local.Data], local.derivations, false, clone(params.data), true) }
    
    if (isArray) {
        
        innerHTML = data.map((data, index) => {

            var keys = clone(derivations)
            keys.push(index, ...path)
            
            // data
            var [data, derivations] = derive(STATE[local.Data], keys, false, local.data, true)
            VALUE[id] = { ...local, id, data, derivations }

            return createTags({ VALUE, STATE, id })

        }).join('')

    } else {

        VALUE[id] = { ...local, data, derivations }
        innerHTML = createTags({ VALUE, STATE, id })
    }
        
    return innerHTML
}

module.exports = {createElement}