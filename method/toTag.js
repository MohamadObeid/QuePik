const { toStyle } = require("./toStyle")
const { toArray } = require("./toArray")
const { generate } = require("./generate")
const { clone } = require("./clone")

module.exports = {
    toTag: ({ STATE, VALUE, id }) => {

        const { createElement } = require("./createElement")
    
        var tag, local = VALUE[id]
        var style = toStyle({ STATE, VALUE, id })
    
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
        if (local.textarea) tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ''}' ${local.readonly ? 'readonly' : ''} ${local.maxlength || ''}>${local.data || local.input.value || ''}</textarea>`
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
}