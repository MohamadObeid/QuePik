const {clone} = require("./clone");
const {generate} = require("./generate");
const {toApproval} = require("./toApproval");
const {toParam} = require("./toParam");

const component = require("../component/component");

module.exports = {
  createComponent: ({VALUE, STATE, id}) => {
    let local = VALUE[id];

    if (!component[local.type]) return [local, id];
    local = component[local.type](local);

    // destructure type, params, & conditions from type
    local.type = local.type.split("/?").join("_question");
    const type = local.type.split("?")[0];
    let params = local.type.split("?")[1];
    const conditions = local.type.split("?")[2];

    // type
    local.type = type;

    // approval
    const approved = toApproval({VALUE, STATE, string: conditions, id});
    if (!approved) return;

    // push destructured params from type to local
    if (params) {
      params = toParam({VALUE, STATE, string: params, id});
      Object.entries(params).map(([k, v]) => (local[k] = v));
      if (params.id) {
        delete Object.assign(VALUE, {[params.id]: VALUE[id]})[id];
        id = params.id;
      } else if (params.data) {
        let state = local.Data;
        if (!state) state = local.Data = generate();
        STATE[state] = local.data || {};
        STATE[`${state}-options`] = {backup: clone(STATE[state])};
      }
    }

    VALUE[id] = local;
  },
};
