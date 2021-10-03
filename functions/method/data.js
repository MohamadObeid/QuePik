const {setContent} = require("./setContent");
const {setData} = require("./setData");

const createData = ({STATE, VALUE, params, id}) => {
  const local = VALUE[id];
  const data = params.data;

  local.derivations.reduce((o, k, i) => {
    if (i === local.derivations.length - 1) return (o[k] = data);
    return o[k];
  }, STATE[local.Data]);
};

const clearData = ({VALUE, STATE, id}) => {
  setData({VALUE, STATE, id});
};

const removeData = ({STATE, VALUE, id, params = {}}) => {
  const local = VALUE[id];
  if (!STATE[local.Data]) return;

  let path = params.path;
  path = path ? path.split(".") : [];

  // convert string numbers paths to num
  path = path.map((k) => {
    if (!isNaN(k)) k = parseFloat(k);
    return k;
  });

  path = [...local.derivations, ...path];

  path.reduce((o, k, i) => {
    if (i === path.length - 1) {
      if (Array.isArray(o)) return o.splice(k, 1);
      else return delete o[k];
    }
    return o[k];
  }, STATE[local.Data]);

  local.data = "";

  setContent({VALUE, id});
  console.log("data removed", STATE[local.Data]);
};

module.exports = {createData, setData, clearData, removeData};
