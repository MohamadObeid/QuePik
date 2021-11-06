module.exports = {
    toggleView: ({ VALUE, STATE, id, e, params }) => {
        const { execute } = require("./execute")
        var toggle = params.toggle
        
        var actions = [
            `setStyle::${toggle.id}?value.element.style.transition::${toggle.id}=transform .2s, opacity .05s;style.transform=translateY(-150%);style.opacity=0`,
            `setStyle>>400::${toggle.id}?style.transform=translateY(0);style.opacity=1`,
            `createView>>250::${toggle.id}?value.element.innerHTML::${toggle.id}='';value.Data::${toggle.id}=value.data();view=${toggle.view}`,
        ]

        execute({ VALUE, STATE, e, id, actions })
    }
}