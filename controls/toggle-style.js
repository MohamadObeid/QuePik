module.exports = ({params}) => {
    var controls = params.controls
    return [{
        event: 'click',
        actions: `toggleStyles::${controls.id || 'value.id'}`
    }]
}