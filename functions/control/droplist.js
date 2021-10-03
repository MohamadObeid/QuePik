const {generate} = require("../method/generate");

module.exports = ({STATE, params, id}) => {
  const controls = params.controls;
  const state = generate();
  STATE[state] = controls.style;

  return [
    {
      event: `click?state.droplist=${controls.id || id}`,
      actions: [
        `resetStyles::droplist?break?value.element.style.opacity::droplist=1;positioner::droplist=${id}`,
        `resetStyles::droplist;droplist::${controls.id || id}?path=${
          controls.path || ""
        }`,
        `setPosition::${
          controls.positioner || id
        };mountAfterStyles::droplist?position.id=droplist;position.placement=${
          controls.placement || "bottom"
        };position.distance=${controls.distance}`,
        `setStyle::droplist?style=state.${state}?${controls.style}`,
      ],
    },
  ];
};
