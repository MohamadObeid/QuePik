module.exports = ({params}) => [
  "setData?data.value=value.text",
  `resetStyles?value.mountonload::state.${params.state}.0=false??state.${params.state}`,
  `setState?state.${params.state}=[${params.id || "value.id"},${
    params.id || "value.id"
  }++-icon,${params.id || "value.id"}++-text,${
    params.id || "value.id"
  }++-chevron]`,
  `mountAfterStyles?value.mountonload::state.${params.state}.0??state.${params.state}`,
];
