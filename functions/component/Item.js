const { toComponent } = require("../method/toComponent")

const Item = (component) => {

  component.icon = component.icon || {}
  component.icon.style = component.icon.style || {}
  component.icon.style.after = component.icon.style.after || {}

  component.title = component.title || {}
  component.text.style = component.text.style || {}
  component.text.style.after = component.text.style.after || {}

  component.chevron = component.chevron || {}
  component.chevron.style = component.chevron.style || {}
  component.chevron.style.after = component.chevron.style.after || {}
  component = toComponent(component)

  var {
    id,
    model,
    state,
    style,
    icon,
    text,
    tooltip,
    chevron,
    controls,
    readonly,
    borderMarker,
  } = component

  borderMarker = borderMarker !== undefined ? borderMarker : true
  readonly = readonly !== undefined ? readonly : false

  if (model === "featured")
    return {
      ...component,
      class: "flex-box item",
      component: "Item",
      type: `View?touchableOpacity;hoverable.id=[${id},${id}-icon,${id}-text,${id}-chevron];hoverable.mountonload`,
      tooltip,
      style: {
        position: "relative",
        justifyContent: "flex-start",
        width: "100%",
        height: "4rem",
        cursor: "pointer",
        pointerEvents: "fill",
        marginRight: "1px",
        marginLeft: "1px",
        marginBottom: "1px",
        borderRadius: "0.45rem",
        ...style,
        after: {
          border: "1px solid #ee384e",
          marginRight: "0",
          marginLeft: "0",
          marginBottom: "1px",
          ...style.after,
        }
      },
      children: [{
        type: `Icon?id=${id}-icon?const.${icon.name}`,
        icon,
        style: {
          width: "4rem",
          color: style.color || "#444",
          fontSize: "1.8rem",
          ...icon.style,
          after: {
            color: style.after.color || "#ee384e",
            ...icon.style.after,
          }
        }
      }, {
        type: `Text?text=const.${text.text};id=${id}-text`,
        text,
        style: {
          fontSize: style.fontSize || "1.4rem",
          color: style.color || "#444",
          userSelect: "none",
          ...text.style,
          after: {
            color: style.after.color || "#ee384e",
            ...text.style.after,
          }
        }
      }, {
        type: `Icon?icon.name=chevron-right;icon.code=fas;id=${id}-chevron`,
        style: {
          display: "flex",
          position: "absolute",
          right: "1.2rem",
          fontSize: style.fontSize || "1.3rem",
          color: style.color || "#666",
          transition: "0.2s",
          ...chevron.style,
          after: {
            right: "0.8rem",
            color: "#ee384e",
            ...chevron.style.after,
          }
        }
      }],
      controls: [
      ...controls,
      {
        event: `loaded?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron]?mountonload`,
        actions: `mountAfterStyles::state.${state}`,
      }, {
        event: `click??state.${state}=undefined||state.${state}.0!=${id}`,
        actions: [
          `resetStyles?value.mountonload::state.${state}.0=false??state.${state}`,
          `mountAfterStyles?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron];value.mountonload::state.${state}.0??state.${state}`,
        ]
      }]
    }

  if (model === "classic")
    return {
      ...component,
      class: "flex-box item",
      component: "Item",
      type: `View?touchableOpacity;hoverable.id=[${id},${id}-icon,${id}-text];hoverable.mountonload`,
      tooltip,
      style: {
        position: "relative",
        justifyContent: "flex-start",
        width: "100%",
        minHeight: "3.3rem",
        cursor: !readonly ? "pointer" : "initial",
        marginBottom: "1px",
        borderRadius: "0.5rem",
        padding: "0.9rem",
        borderBottom: !readonly ? "initial" : "1px solid #eee",
        pointerEvents: "fill",
        ...style,
        after: readonly
          ? {}
          : {
              backgroundColor: "#eee",
              ...style.after,
            }
      },
      children: [{
        icon,
        type: `Icon?id=${id}-icon?const.${icon.name}`,
        style: {
          display: icon ? "flex" : "none",
          color: !readonly ? style.color || "#444" : "#333",
          fontSize: !readonly ? style.fontSize || "1.4rem" : "1.6rem",
          fontWeight: !readonly ? "initial" : "bolder",
          marginRight: "1rem",
          ...icon.style,
          after: {
            color: "#444",
            ...icon.style.after,
          }
        }
      }, {
        type: `Text?text=const.${text.text};id=${id}-text;`,
        style: {
          fontSize: style.fontSize || "1.4rem",
          color: !readonly ? style.color || "#444" : "#333",
          fontWeight: !readonly ? "initial" : "bolder",
          userSelect: "none",
          textAlign: "left",
          ...text.style,
          after: {
            color: style.after.color || style.color || "#444",
            ...text.style.after
          }
        }
      }],
      controls: [
      ...controls,
      {
        event: `loaded?state.${state}=[${id},${id}-icon,${id}-text]?mountonload`,
        actions: `mountAfterStyles::state.${state}`,
      }, {
        event: `click??state.${state}=undefined||state.${state}.0!=${id}`,
        actions: [
          `resetStyles?value.mountonload::state.${state}.0=false??state.${state}`,
          `mountAfterStyles?state.${state}=[${id},${id}-icon,${id}-text];value.mountonload::state.${state}.0??state.${state}`,
        ]
      }]
    }
}

module.exports = { Item }
