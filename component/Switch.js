const {toComponent} = require('../method/toComponent')

const Switch = (component) => {

    component = toComponent(component)
    
    return {
        ...component,
        type: 'View',
        class: 'button-13',
        controls: {},
        children: [{
            type: `Input?input.type=checkbox;class=switch-checkbox`,
            controls: [...component.controls]
        }, {
            type: 'View?class=knobs',
            children: {
                type: 'Text?span'
            }
        }]
    }
}

module.exports = {Switch}