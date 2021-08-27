const { generate } = require('../method/generate')
const {toComponent} = require('../method/toComponent')

const Switch = (component) => {

    component = toComponent(component)
    
    return {
        ...component,
        type: 'View',
        class: 'button-13',
        id: generate(),
        controls: {},
        children: [{
            type: `Input?input.type=checkbox;class=switch-checkbox;id=${component.id}`,
            controls: [...component.controls]
        }, {
            type: 'View?class=knobs',
            children: {
                type: 'Span'
            }
        }]
    }
}

module.exports = {Switch}