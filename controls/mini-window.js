const { generate } = require("../method/generate")

module.exports = ({params}) => {
    var controls = params.controls
    var state = generate()
    
    return [{
        event: 'click',
        actions: [
            `createView?state.${state}=value.data;value.Data::::mini-window-view=undefined:::!value.data;value.Data::::mini-window-view=${state}:::value.data;view=${controls.view}??mini-window-view`,
            `setStyle?style.display=flex;style.opacity=1::25??mini-window`
        ]
    }]
}