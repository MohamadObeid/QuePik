const { toComponent } = require("../function/toComponent");

module.exports = (component) => {

  component = toComponent(component)

  return {
    ...component,
    type: "View",
    class: "button-13",
    controls: {},
    children: [
      {
        type: `Input?input.type=checkbox;class=switch-checkbox`,
        controls: [...component.controls],
      },
      {
        type: "View?class=knobs",
        children: {
          type: "Text?span",
        }
      }
    ]
  }
}
