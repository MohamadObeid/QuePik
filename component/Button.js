const { toString } = require('../method/toString')
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Button = (component) => {
    
    component.icon = component.icon || {}
    component = toComponent(component)
    var { style, tooltip, icon, controls, text } = component
    var id = component.id || generate()

    // for search inputs
    if (component.search.query) {
        component.state = component.search.state
        component.query = toString(component.search)
        component.searchable = true
    }
    
    return {
        ...component,
        class: 'flex-box button',
        type: 'View',
        id,
        tooltip,
        style: {
            border: '1px solid #e0e0e0',
            borderRadius: '.75rem',
            padding: '0.75rem 1rem',
            margin: '0 0.4rem',
            cursor: 'pointer',
            transition: 'border 0.1s',
            ...style,
            after: {
                border: '1px solid #0d6efd',
                ...style.after
            }
        },
        children: [{
            icon,
            type: `Icon?id=${id}-icon`,
            style: {
                color: style.color || '#444',
                fontSize: style.fontSize || '1.4rem',
                margin: '0 0.4rem',
                transition: 'color 0.1s',
                display: 'flex',
                alignItems: 'center',
                ...(icon.style || {}),
                after: {
                    color: '#0d6efd',
                    ...(icon.style && icon.style.after || {})
                }
            }
        }, {
            type: `Text?id=${id}-text`,
            text,
            style: {
                color: style.color || '#444',
                fontSize: style.fontSize || '1.4rem',
                margin: '0 0.4rem',
                transition: 'color 0.1s',
                after: {
                    color: style.after.color || '#0d6efd'
                }
            }
        }],
        controls: [...controls,
           /*{
            event: 'click',
            actions: 'ripple'
        }, */{
            event: 'mouseenter',
            actions: `mountAfterStyles???${id};${id}-text;${id}-icon`
        }, {
            event: 'mouseleave',
            actions: `resetStyles???${id};${id}-text;${id}-icon`
        }]
    }
}

module.exports = {Button}