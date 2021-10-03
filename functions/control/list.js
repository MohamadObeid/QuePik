module.exports = ({VALUE, STATE, params, id}) => {
  const controls = params.controls;

  return [
    {
      event: "click",
      actions: [
        `setState?state.${controls.id}-mouseenter`,
        `mountAfterStyles::${controls.id}`,
        `setPosition?position.placement=${
          controls.placement || "right"
        };position.distance=${controls.distance || "15"};position.id=${
          controls.id
        }`,
      ],
    },
    {
      event: "mouseleave",
      actions: [
        `resetStyles>>200::${controls.id}??!mouseenter;!mouseenter::${controls.id};!state.${controls.id}-mouseenter`,
        `setState?state.${controls.id}-mouseenter=false`,
      ],
    },
  ];
};
