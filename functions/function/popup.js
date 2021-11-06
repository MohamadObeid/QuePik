const {controls} = require("./controls");
const {update} = require("./update");

const popup = ({VALUE, STATE, id, params}) => {
  var local = VALUE[id];

  var popup = VALUE["popup"];
  var popUp = local.popup;

  popup.Data = local.Data;
  popup.derivations = local.derivations;

  popup.positioner = id;
  popup.unDeriveData = true;

  update({VALUE, STATE, id: "popup"});
  
  // eraser
  if (popUp.type === "eraser") {
    var _controls = {
      event: "click",
      actions: `resetStyles::popup;await.note;await.setStyle::mini-window;await.remove>>220::global.mini-window-view.element.children.0.id${popUp.update ? `;await.update::${popUp.update}` : ""};async.erase?note=${popUp.note || "Data removed successfully"};style.display=none>>200;style.opacity=0;erase.path=${popUp.path};erase.id=${popUp.id || "value.data().id"};await.state.[value.Data]=value.Data()._filterById().[${popUp.id ? `any.${popUp.id}` : "value.data().id"}.isNot().[_.id]]`,
    };
    setTimeout(() => {
      if (popUp.text) VALUE["popup-text"].element.innerHTML = popUp.text;
      controls({VALUE, STATE, controls: _controls, id: "popup-confirm"});
    }, 50);
  }
};

module.exports = {popup};
