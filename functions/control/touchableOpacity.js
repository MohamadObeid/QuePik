module.exports = ({VALUE, id, params = {}}) => {
  if (VALUE[id].element.style.transition) {
    VALUE[id].element.style.transition += ", opacity .2s";
  } else VALUE[id].element.style.transition = "opacity .2s";

  return [
    {
      event: "mousedown?global.body.element.addClass().unselectable",
      actions: "setStyle?style.opacity=.5",
    },
    {
      event: "mouseup?global.body.element.removeClass().unselectable",
      actions: "setStyle?style.opacity=1",
    },
    {
      event: "mouseleave",
      actions: "setStyle?style.opacity=1",
    },
    {
      event: "mouseenter",
      actions: "setStyle?style.opacity=1?value.mousedown",
    },
  ];
};
