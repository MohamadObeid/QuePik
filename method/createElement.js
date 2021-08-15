const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toObject } = require("./toObject")
const { toBoolean } = require("./toBoolean")
const { override } = require("./merge")
const { clone } = require("./clone")
const { derive } = require("./derive")
const { createTags } = require("./createTags")

const _view = require("../view/_view")

const createElement = ({STATE, VALUE, id, params = {}}) => {
    
    var tags = '', innerHTML = '', parent = VALUE[id], children = params.children || parent.children

    // childrenSiblings
    parent.childrenSiblings = params.siblings || []

    children && toArray(children).map(child => {
        var value = clone(child)
        
        // view value
        if (_view[value.view]) value = _view[value.view]

        // no value
        if (!value.type) return

        // destructure type, params, & conditions from type
        var type = value.type.split('?')[0]
        var params = value.type.split('?')[1] 
        var conditions = value.type.split('?')[2]

        // type
        value.type = type
        
        // approval
        var approved = toBoolean({ VALUE, STATE, string: conditions, id })
        if (!approved) return

        // push destructured params from type to value
        if (params) {
            params = toObject({VALUE, STATE, string: params, id})
            Object.entries(params).map(([k, v]) => value[k] = v )
        }
        
        // pass to children
        if (parent.toChildren) {

            if (typeof parent.toChildren === 'string')
            parent.toChildren = toObject({ VALUE, STATE, string: parent.toChildren, id })

            value = override(value, parent.toChildren)
        }
        
        // icon
        if (value.icon) value.icon.name = value.icon.name || ''

        // id
        value.id = value.id || generate()
        value.class = value.class || ''

        // parent
        value.parent = id
        value.DATA = value.DATA || parent.DATA

        // derivations
        var derivations = clone(parent.derivations)

        // path
        var path = typeof value.path === 'string' && value.path !== '' ? value.path.split('.') : []
        if (path.length > 0) {
            if (!parent.DATA) parent.DATA = {}

            // convert string numbers paths to num
            path = path.map(k => { 
                if (!isNaN(k)) k = parseFloat(k) 
                return k
            })

            // push path to a data array and derivations last element is not an index
            if (isNaN(path[0])) {
                var data = derive(parent.DATA, parent.derivations)[0]
                if (Array.isArray(data)) derivations.push(0)
            }

            derivations.push(...path)
        }

        // data (turnoff is do not mount data)
        var data, isArray
        if (parent.turnOff) { data = ''; value.turnOff = true }                     //def value
        else { [data, derivations, isArray] = derive(value.DATA, derivations, false, value.data, true) }
        
        if (isArray) {
            
            tags = data.map((data, index) => {
            
                var keys = clone(derivations)
                keys.push(index, ...path)
                
                // data
                var [data, derivations] = derive(value.DATA, keys, false, value.data, true)

                return createTags({ VALUE, STATE, value, data, derivations })

            }).join('')

        } else tags = createTags({ VALUE, STATE, value, data, derivations })
        
        //tag = innerHTML
        innerHTML += tags
        
    })
    return innerHTML
}

module.exports = {createElement}