const { toComponent } = require("../method/toComponent");

const Button = (component) => {
  component.icon = component.icon || {};
  component = toComponent(component);
  var { style, icon, controls, text, id } = component;

  return {
    ...component,
    type: "View?class=flex-box;touchableOpacity",
    style: {
      border: "1px solid #e0e0e0",
      borderRadius: ".75rem",
      padding: "0.75rem 1rem",
      margin: "0 0.4rem",
      cursor: "pointer",
      transition: "border 0.1s",
      ...style,
      after: {
        border: "1px solid #0d6efd",
        ...style.after,
      },
    },
    children: [
      {
        type: `Icon?id=${id}-icon?const.${icon}`,
        icon,
        style: {
          color: style.color || "#444",
          fontSize: style.fontSize || "1.4rem",
          margin: "0 0.4rem",
          transition: "color 0.1s",
          display: "flex",
          alignItems: "center",
          ...(icon.style || {}),
          after: {
            color: "#0d6efd",
            ...((icon.style && icon.style.after) || {}),
          },
        },
      },
      {
        type: `Text?id=${id}-text?const.${text}`,
        text,
        style: {
          color: style.color || "#444",
          fontSize: style.fontSize || "1.4rem",
          margin: "0 0.4rem",
          transition: "color 0.1s",
          after: {
            color: style.after.color || "#0d6efd",
          }
        }
      }
    ],
    controls: [
      ...controls,
      {
        event: "mouseenter",
        actions: `mountAfterStyles???${id};${id}-text;${id}-icon`,
      },
      {
        event: "mouseleave",
        actions: `resetStyles???${id};${id}-text;${id}-icon`,
      }
    ]
  }
}

module.exports = { Button };
