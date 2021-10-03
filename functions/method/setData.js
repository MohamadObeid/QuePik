const {clone} = require("./clone");
const {reducer} = require("./reducer");
const {setContent} = require("./setContent");

const setData = ({STATE, VALUE, params = {}, id}) => {
  const local = VALUE[id];
  if (!STATE[local.Data]) return;

  const data = params.data;
  let path = data.path;

  // defualt value
  let defValue = data.value;
  if (defValue === undefined) defValue = "";

  // path
  if (path) path = path.split(".");
  else path = [];

  // convert string numbers paths to num
  path = path.map((k) => {
    if (!isNaN(k)) k = parseFloat(k);
    return k;
  });

  // keys
  const derivations = clone(local.derivations);
  const keys = [...derivations, ...path];

  // set value
  const value = reducer({
    VALUE,
    STATE,
    id,
    params: {
      object: STATE[local.Data],
      path: keys,
      value: defValue,
      key: true,
    },
  });
  local.data = value;

  if (local.input && local.input.type === "file") return;

  // setContent
  const content = data.content || value;

  setContent({VALUE, params: {content: {value: content}}, id});
};

module.exports = {setData};
