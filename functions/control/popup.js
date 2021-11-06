const {generate} = require("../function/generate");

module.exports = ({STATE, params, id}) => {
  const controls = params.controls;
  const state = generate();
  STATE[state] = controls.style;

  return [
    {
      event: `click?state.popup=${controls.id || id}`,
      actions: [
        `resetStyles::popup?break?value.element.style.opacity::popup=1;positioner::popup=${id}`,
        `resetStyles::popup;popup::${controls.id || id}?path=${controls.path || ""}`,
        `setPosition::popup;mountAfterStyles::popup?position.positioner=${controls.positioner || id};position.placement=${controls.placement || "left"};position.distance=${controls.distance}`,
        `setStyle::popup?style=state.${state}?${controls.style}`,
      ],
    },
  ];
};
