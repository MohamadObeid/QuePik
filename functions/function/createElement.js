var {generate} = require("./generate");
var {toParam} = require("./toParam");
var {toApproval} = require("./toApproval");
var {override} = require("./merge");
var {clone} = require("./clone");
var {createTags} = require("./createTags");
var {reducer} = require("./reducer");

var createElement = ({ STATE, VALUE, id }) => {

  let local = VALUE[id];
  var parent = VALUE[local.parent];

  // html
  if (local.html) return local.html;

  // view value
  if (local.view && STATE.view[local.view]) {
    local = clone(STATE.view[local.view]);
  }

  // no value
  if (!local.type) return;

  // destructure type, params, & conditions from type
  local.type = local.type.split("/?").join("_question");
  let type = local.type.split("?")[0];
  let params = local.type.split("?")[1];
  var conditions = local.type.split("?")[2];

  // [type]
  if (type.slice(0, 1) === "[" && type.slice(-1) === "]") {
    type = type.slice(1).slice(0, -1);
    if (!local.duplicatedElement) local.mapType = true;
  }
  local.type = type;

  // parent
  local.parent = parent.id;

  // style
  local.style = local.style || {}

  // id
  local.id = local.id || generate();
  id = local.id;

  // class
  local.class = local.class || "";

  // Data
  local.Data = parent.Data;
  local.data = parent.data;

  // derivations
  local.derivations = local.derivations || [...(parent.derivations || [])];

  // status
  local.status = "loading";

  // first mount of local
  VALUE[id] = local;

  // ///////////////// approval & params /////////////////////

  // approval
  var approved = toApproval({VALUE, STATE, string: conditions, id});
  if (!approved) return;

  // push destructured params from type to local
  if (params) {

    params = toParam({ VALUE, STATE, string: params, id })
    VALUE[id] = local = override(local, params)

    if (params.id) {

      delete Object.assign(VALUE, {[params.id]: VALUE[id]})[id];
      id = params.id;
    }

    if (params.data && (!local.Data || params.Data)) {

      local.Data = local.Data || generate();
      var state = local.Data;
      STATE[state] = clone(local.data || STATE[state]);
      STATE[`${state}-options`] = STATE[`${state}-options`] || {};
    }

    if (params.Data) {
      STATE[`${params.Data}-options`] = STATE[`${params.Data}-options`] || {};
    }
  } else params = {};

  // pass values To Children
  if (parent.passToChildren) local = override(local, parent.passToChildren);

  // duplicated element
  if (local.duplicatedElement) {
    delete local.path;
    delete local.data;
  }

  // path
  let path =
    typeof local.path === "string" && local.path !== "" ?
      local.path.split(".") : []
      
  if (path.length > 0) {
    if (!local.Data) {

      var state = (local.Data = generate())
      STATE[state] = local.data || {}
      STATE[`${state}-options`] = {}
    }

    // convert string numbers to num
    path = path.map((k) => {
      if (!isNaN(k)) k = parseFloat(k)
      return k
    })

    local.derivations.push(...path)
  }

  // data
  if (parent.unDeriveData || local.unDeriveData) {

    local.data = local.data || ""
    local.unDeriveData = true

  } else {

    local.data = reducer({ VALUE, STATE, id,
      params: {
        path: local.derivations,
        value: params.data,
        key: true,
        object: STATE[local.Data],
      }
    })
  }

  return createTags({VALUE, STATE, id})
}

module.exports = {createElement}
