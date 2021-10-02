const { controls } = require("./controls")
const { update } = require("./update")

const popup = ({ VALUE, STATE, id, params }) => {
    var local = VALUE[id]

    var popup = VALUE['popup']
    var popupText = VALUE['popup-text']
    var popupConfirm = VALUE['popup-confirm']
    var popupParams = local.popup

    popup.Data = local.Data
    popup.derivations = local.derivations

    // text
    if (popupParams.text) popupText.element.innerHTML = popupParams.text

    popup.positioner = id
    popup.unDeriveData = true

    update({ VALUE, STATE, id: 'popup' })
    
    // remover
    if (popupParams.remove) {
        var _controls = {
            event: "click",
            actions: `resetStyles;await.note;await.setStyle::mini-window;await.remove>>220::global.mini-window-view.element.children.0.id;async.erase?style.display=none>>200;style.opacity=0;erase.path=${popupParams.remove.path};erase.id=[${popupParams.remove.id || 'value.data().id'}];await.state.[${popupParams.remove.Data || 'value.Data'}]=state.[${popupParams.remove.Data || 'value.Data'}].filterById().!.[params.erase.id]`
        }
        controls({ VALUE, STATE, controls: _controls, id: 'popup-confirm' })
    }
    console.log(VALUE['popup'], VALUE['popup-confirm']);
}

module.exports = { popup }