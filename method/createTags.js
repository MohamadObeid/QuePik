const { clone } = require("./clone")
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toBoolean } = require("./toBoolean")
const { toObject } = require("./toObject")

const _component = require("../component/_component")

const createTags = ({ VALUE, STATE, value, data, derivations }) => {
    const { execute } = require("./execute")
    
    if (Array.isArray(data)) {

        value.length = data.length

        if (data.length > 0) {
            var tags = data.map((data, index) => {

                var id = generate(), local = clone(value)
                local.id = id
        
                // components
                if (_component[local.type]) {
                    
                    local = _component[local.type](local)
        
                    // destructure type, params, & conditions from type
                    var type = local.type.split('?')[0]
                    var params = local.type.split('?')[1] 
                    var conditions = local.type.split('?')[2]
            
                    // type
                    local.type = type
                    
                    // approval
                    var approved = toBoolean({ VALUE, STATE, string: conditions, id })
                    if (!approved) return
                    
                    // push destructured params from type to value
                    if (params) {
                        params = toObject({VALUE, STATE, string: params, id})
                        Object.entries(params).map(([k, v]) => local[k] = v )
                    }

                    id = local.id
                }

                VALUE[id] = { ...local, id, index, data, derivations: [...derivations, index] }
                VALUE[local.parent].childrenSiblings.push(id)

                // execute onload actions
                if (local.actions) execute({ VALUE, STATE, actions: local.actions, id })

                //if (!Components[local.type]) return <></>

                return oneTag({ STATE, VALUE, id })

            }).join('')

            return tags
        }
    }

    
    var id = value.id || generate()
    value.id = id

    // components
    if (_component[value.type]) {
        
        value = _component[value.type](value)

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

        id = value.id
    }
    
    
    VALUE[id] = { ...value, id, data, derivations }
    VALUE[value.parent].childrenSiblings.push(id)

    // execute onload actions
    if (value.actions) execute({ VALUE, STATE, actions: value.actions, id })

    //if (!Components[value.type]) return <></>

    tag = oneTag({ STATE, VALUE, id })

    return tag
}



const oneTag = ({STATE, VALUE, id}) => {

    const { createElement } = require("./createElement")
    var tag, value = VALUE[id]
    
    // style
    var style = ''
    if (value.style) {
        Object.entries(value.style).map(([k, v]) => {
            if (k === 'after' || k.includes('::')) return
            else if (k === 'borderBottom') k = 'border-bottom'
            else if (k === 'borderLeft') k = 'border-left'
            else if (k === 'borderRight') k = 'border-right'
            else if (k === 'borderTop') k = 'border-top'
            else if (k === 'marginBottom') k = 'margin-bottom'
            else if (k === 'marginLeft') k = 'margin-left'
            else if (k === 'marginRight') k = 'margin-right'
            else if (k === 'marginTop') k = 'margin-top'
            else if (k === 'fontSize') k = 'font-size'
            else if (k === 'fontWeight') k = 'font-weight'
            else if (k === 'lineHeight') k = 'line-weight'
            else if (k === 'textOverflow') k = 'text-overflow'
            else if (k === 'whiteSpace') k = 'white-space'
            else if (k === 'backgroundColor') k = 'background-color'
            else if (k === 'zIndex') k = 'z-index'
            else if (k === 'boxShadow') k = 'box-shadow'
            else if (k === 'borderRadius') k = 'border-radius'
            else if (k === 'zIndex') k = 'z-index'
            else if (k === 'alignItems') k = 'align-items'
            else if (k === 'justifyContent') k = 'justify-content'
            else if (k === 'userSelect') k = 'user-select'
            else if (k === 'textAlign') k = 'text-align'
            else if (k === 'pointerEvents') k = 'pointer-events'
            else if (k === 'flexDirection') k = 'flex-direction'
            else if (k === 'maxWidth') k = 'max-width'
            else if (k === 'minWidth') k = 'min-width'
            else if (k === 'maxHeight') k = 'max-height'
            else if (k === 'minHeight') k = 'min-height'
            style += `${k}:${v}; `
        })
    }

    // innerHTML
    var text = (typeof value.data !== 'object' && value.data) || value.text || ''
    
    if (value.type === 'View')
    tag = `<div class='${value.class}' id='${value.id}' style='${style}'>${value.children ? createElement({STATE, VALUE, id}) : text}</div>`

    else if (value.type === 'Table')
    tag = `<table class='${value.class}' id='${value.id}' style='${style}'>${value.children ? createElement({STATE, VALUE, id}) : text}</table>`

    else if (value.type === 'Row')
    tag = `<tr class='${value.class}' id='${value.id}' style='${style}'>${value.children ? createElement({STATE, VALUE, id}) : text}</tr>`

    else if (value.type === 'Header')
    tag = `<th class='${value.class}' id='${value.id}' style='${style}'>${value.children ? createElement({STATE, VALUE, id}) : text}</th>`

    else if (value.type === 'Cell')
    tag = `<td class='${value.class}' id='${value.id}' style='${style}'>${value.children ? createElement({STATE, VALUE, id}) : text}</td>`

    else if (value.type === 'Text')
    tag = `<p class='${value.class}' id='${value.id}' style='${style}'>${text}</p>`

    else if (value.type === 'Label')
    tag = `<label class='${value.class}' id='${value.id}' style='${style}'>${text}</label>`

    else if (value.type === 'Span')
    tag = `<span class='${value.class}' id='${value.id}' style='${style}'>${text}</span>`

    else if (value.type === 'Icon')
    tag = `<i class='${value.class} bi-${value.icon.name}' id='${value.id}' style='${style}'></i>`
    
    else if (value.type === 'Input')
    tag = `<input class='${value.class}' id='${value.id}' style='${style}' ${value.upload ? `type=file accept='${value.upload.type}/*' ${value.upload.multiple ? 'multiple': ''}` : ''} type='${value.input.type || 'text'}' placeholder='${value.placeholder || ''}' value='${value.data || value.input.value || ''}'/>`
    
    else if (value.type === 'Paragraph')
    tag = `<textarea class='${value.class}' id='${value.id}' style='${style}' placeholder='${value.placeholder || ''}'>${text}</textarea>`

    // linkable
    if (value.link) {

        tag = `<a href=${value.link}>${tag}</a>`
        value.controls = toArray(value.controls) || []
        value.controls.push({
            event: 'click',
            actions: `route?route=${value.link}`
        })
    }

    return tag
}

module.exports = {createTags}