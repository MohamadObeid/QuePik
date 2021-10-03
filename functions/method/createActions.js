const control = require("../control/control");

const createActions = ({VALUE, STATE, params, id}) => {
  const {execute} = require("./execute");

  if (!params.type) return;
  const actions = control[params.type]({VALUE, STATE, params, id});

  execute({VALUE, STATE, actions, id});
};

module.exports = {createActions};
