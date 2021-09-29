module.exports = ({ VALUE, params = {}, id }) => {
    var controls = params.controls
    
    return [{
        event: `click??global.${controls.id}.view!=${controls.view}`,
        actions: [
            `resetStyles;mountAfterStyles>>400???global.${controls.id}.parent().id`,
            `createView>>250?value.Data::${controls.id}=value.data();view=${controls.view}??${controls.id}`,
        ]
    }]
}