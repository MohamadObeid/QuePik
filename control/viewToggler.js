module.exports = ({ VALUE, params = {}, id }) => {
    var controls = params.controls
    var parent = VALUE[controls.id].parent
    
    return [{
        event: `click?value.element.style.transition::${parent}=transform .2s, opacity .1s?value.view::${controls.id}!=${controls.view}`,
        actions: [
            `setStyle::${parent}?style.transform=translateY(-110%);style.opacity=0`,
            `setStyle>>400::${parent}?style.transform=translateY(0);style.opacity=1`,
            `createView>>250::${controls.id}?value.Data::${controls.id}=value.data();view=${controls.view}`,
        ]
    }]
}