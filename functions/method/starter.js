const autoActions = ["fill"];
const control = require("../control/control");
const {toArray} = require("./toArray");

const starter = ({STATE, VALUE, id}) => {
  const {defaultEventHandler} = require("./event");
  const {setStyle} = require("./style");
  const {controls} = require("./controls");
  const {defaultInputHandler} = require("./defaultInputHandler");
  const {isArabic} = require("./isArabic");

  const local = VALUE[id];
  if (!local) return delete VALUE[id];

  local.element = document.getElementById(id);
  if (!local.element) return delete VALUE[id];

  // status
  local.status = "mounting";

  /* Defaults must start before controls */

  // arabic text
  isArabic({VALUE, id});

  // input handlers
  defaultInputHandler({VALUE, STATE, id});

  // mouseenter, click, mouseover...
  defaultEventHandler({VALUE, id});

  // prevent a tag from refreshing browser
  if (local.link) {
    local.element.addEventListener("click", (e) => e.preventDefault());
  }

  /* End of default handlers */

  // setStyles
  if (local.style) {
    setStyle({VALUE, STATE, id, params: {style: local.style}});
  }

  // auto actions
  autoActions.map(
      (action) =>
        local[action] && require("./_method")[action]({VALUE, STATE, id})
  );

  // lunch auto controls
  Object.entries(control).map(([type, control]) => {
    if (local[type]) {
      local.controls = toArray(local.controls);
      local.controls.push(
          ...control({VALUE, STATE, id, params: {controls: local[type]}})
      );
    }
  });

  // execute controls
  if (local.controls) controls({VALUE, STATE, id});

  // run starter for children
  const children = [...local.element.children];

  children.map((child) => {
    const id = child.id;
    if (!id) return;
    starter({STATE, VALUE, id});
  });
};

module.exports = {starter};
