const { generate } = require("./generate")
const { toObject } = require("./toObject")
const { toBoolean } = require("./toBoolean")
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

    // type
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

    // derivations
    local.derivations = local.derivations || [...(parent.derivations || [])]

    // first mount of local
    VALUE[id] = local

    /////////////////// approval & params /////////////////////
    
    // approval
    var approved = toBoolean({ VALUE, STATE, string: conditions, id })
    if (!approved) return
    
    // push destructured params from type to local
    if (params) {
        params = toObject({ VALUE, STATE, string: params, id })
        Object.entries(params).map(([k, v]) => local[k] = v )
        if (params.id) {

            delete Object.assign(VALUE, { [params.id]: VALUE[id] })[id]
            id = params.id

        } else if (params.data && !local.Data) {

            var state = local.Data = generate()
            STATE[state] = params.data
            
        }
    }

    // pass to children
    if (parent.toChildren) {

        if (typeof parent.toChildren === 'string')
        parent.toChildren = toObject({ VALUE, STATE, string: parent.toChildren, id })
        local = override(local, parent.toChildren)
    }
    
    // icon
    if (local.type === 'Icon') {
        local.icon.name = local.icon.name || ''
        if (local.icon.google) local.google = true

        if (local.icon.outlined || local.icon.type === 'outlined') local.outlined = true
        else if (local.icon.rounded || local.icon.type === 'rounded') local.rounded = true
        else if (local.icon.sharp || local.icon.type === 'sharp') local.sharp = true
        else if (local.icon.twoTone || local.icon.type === 'twoTone') local.twoTone = true
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
    var data, isArray
    if (parent.turnOff) { data = ''; local.turnOff = true }                     //def value
    else { [data, derivations, isArray] = derive(STATE[local.Data], local.derivations, false, local.data, true) }
    
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