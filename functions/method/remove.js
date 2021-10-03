const {removeIds} = require("./update");
const {clone} = require("./clone");
const {reducer} = require("./reducer");

const remove = ({STATE, VALUE, params, id}) => {
  const local = VALUE[id];
  if (!params) params = {};

  const keys = clone(local.derivations);
  let path = params.path ? params.path(".") : [];

  // convert string numbers paths to num
  if (path.length > 0) {
    path = path.map((k) => {
      if (!isNaN(k)) k = parseFloat(k);
      return k;
    });
  }

  if (params.path) keys.push(...path);
  keys.push("delete()");

  // delete
  if (keys.length > 0) {
    reducer({
      VALUE,
      STATE,
      id,
      params: {path: keys, object: STATE[local.Data]},
    });
  }

  removeIds({VALUE, id});

  // reset length and derivations
  let nextSibling = false;
  const children = [...VALUE[local.parent].element.children];
  const index = local.derivations.length - 1;

  children.map((child) => {
    const id = child.id;
    VALUE[id].length -= 1;

    // derivation in array of next siblings must decrease by 1
    if (nextSibling) resetDerivations({VALUE, id, index});

    if (id === local.id) {
      nextSibling = true;
      local.element.remove();
      delete VALUE[id];
    }
  });
};

const resetDerivations = ({VALUE, id, index}) => {
  if (!VALUE[id]) return;
  VALUE[id].derivations[index] -= 1;

  const children = [...VALUE[id].element.children];
  children.map((child) => {
    const id = child.id;
    resetDerivations({VALUE, id, index});
  });
};

module.exports = {remove};
