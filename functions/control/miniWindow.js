const {generate} = require("../method/generate");

module.exports = ({VALUE, params, id}) => {
  const controls = params.controls;
  const state = generate();

  return [
    {
      event: "click",
      actions: [
        `createView::mini-window-view?state.${state}=value.data();value.Data.delete()::mini-window-view;value.Data::mini-window-view=${state}<<value.data();view=${controls.view}`,
        "setStyle::mini-window?style.display=flex;style.opacity=1>>25",
      ],
    },
  ];
};
