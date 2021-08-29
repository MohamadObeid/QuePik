const { clone } = require("./clone")
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toBoolean } = require("./toBoolean")
const { toObject } = require("./toObject")

const _component = require("../component/_component")

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
                
                // push destructured params from type to local
                if (params) {
                    params = toObject({ VALUE, STATE, string: params, id })
                    Object.entries(params).map(([k, v]) => local[k] = v )
                    if (params.id) {

                        delete Object.assign(VALUE, { [params.id]: VALUE[id] })[id]
                        id = params.id

                    } else if (params.data) {

                        var state = local.Data
                        if (!state) state = local.Data = generate()
                        STATE[state] = local.data || {}
                        STATE[`${state}-options`] = {}
            
                    }
                }
            }
            
            VALUE[id] = local
            
            // execute onload actions
            if (local.actions) execute({ VALUE, STATE, actions: local.actions, id })

            return oneTag({ STATE, VALUE, id })

        }).join('')
    }


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
        
        // push destructured params from type to local
        if (params) {
            params = toObject({ VALUE, STATE, string: params, id })
            Object.entries(params).map(([k, v]) => local[k] = v )
            if (params.id) {

                delete Object.assign(VALUE, { [params.id]: VALUE[id] })[id]
                id = params.id

            } else if (params.data) {

                var state = local.Data
                if (!state) state = local.Data = generate()
                STATE[state] = local.data || {}
                STATE[`${state}-options`] = {}

            }
        }
    }
    
    VALUE[id] = local
    //VALUE[local.parent].childrenSiblings.push(id)
    
    // execute onload actions
    if (local.actions) execute({ VALUE, STATE, id, actions: local.actions, instantly: true })

    return oneTag({ STATE, VALUE, id })
}



const oneTag = ({ STATE, VALUE, id }) => {

    const { createElement } = require("./createElement")
    var tag, local = VALUE[id], style = ''
    
    if (local.style) 
    Object.entries(local.style).map(([k, v]) => {
        if (k === 'after' || k.includes('>>')) return
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
        else if (k === 'gridTemplateColumns') k = 'grid-template-columns'
        else if (k === 'gridTemplateRows') k = 'grid-template-rows'
        style += `${k}:${v}; `
    })

    // innerHTML
    var text = (typeof local.data !== 'object' && local.data) || local.text || ''
    var innerHTML = text
    
    if (local.children) {
        
        innerHTML = toArray(clone(local.children)).map((child, index) => {
        
            var id = child.id || generate()
            VALUE[id] = clone(child)
            VALUE[id].id = id
            VALUE[id].index = index
            VALUE[id].parent = local.id
            
            return createElement({ STATE, VALUE, id })
    
        }).join('')
    }
    
    if (local.type === 'View')
    tag = `<div class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</div>`

    else if (local.type === 'Table')
    tag = `<table class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</table>`

    else if (local.type === 'Row')
    tag = `<tr class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</tr>`

    else if (local.type === 'Header')
    tag = `<th class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</th>`

    else if (local.type === 'Cell')
    tag = `<td class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</td>`

    else if (local.type === 'Label')
    tag = `<label class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</label>`

    else if (local.type === 'Span')
    tag = `<span class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</span>`

    else if (local.type === 'Text')
    tag = `<p class='${local.class}' id='${local.id}' style='${style}'>${text}</p>`

    else if (local.type === 'Icon') 
    tag = `<i class='material-icons${local.outlined ? '-outlined' : local.rounded ? '-round' : local.sharp ? '-sharp' : local.twoTone ? '-two-tone' : ''} ${local.class || ''} ${local.icon.name}' id='${local.id}' style='${style}'>${local.google ? local.icon.name : ''}</i>`
    
    else if (local.type === 'Input') {
    if (local.textarea) tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ''}' value='${local.data || local.input.value || ''}' ${local.readonly ? 'readonly' : ''} ${local.maxlength || ''}></textarea>`
    else tag = `<input class='${local.class}' id='${local.id}' style='${style}' ${local.upload ? `type=file accept='${local.upload.type}/*' ${local.upload.multiple ? 'multiple': ''}` : ''} type='${local.input.type || 'text'}' placeholder='${local.placeholder || ''}' value='${local.data || local.input.value || ''}' ${local.readonly ? 'readonly' : ''} />`
    }
    
    else if (local.type === 'Paragraph')
    tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ''}'>${text}</textarea>`

    // linkable
    if (local.link) {

        tag = `<a href=${local.link}>${tag}</a>`
        local.controls = toArray(local.controls) || []
        local.controls.push({
            event: 'click',
            actions: `route?route=${local.link}`
        })
    }
    
    return tag
}

module.exports = {createTags}