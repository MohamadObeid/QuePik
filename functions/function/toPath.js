const toPath = ({VALUE, STATE, string, e, id}) => {
  /* const {toValue} = require("./toValue");
  let keys = [];
  const _keys = string.split("[");

  // is array
  if (!_keys[0] || _keys.length === 1) return string;

  // key1.[key2].
  _keys.map((k, i) => {
    if (i !== 0 && keys[keys.length - 1].slice(-1) === ".") {
      keys[keys.length - 1] += `[${k}`;
    } else keys.push(k);
  });

  // is array
  if (!keys[0] || keys.length === 1) return string;

  if (keys[1]) {
    let subKey = keys[1].split("]");

    // ex. [ [ [] [] ] ]
    while (subKey[0] === keys[1] && keys[2] !== undefined) {
      keys[1] += `[${keys[2]}`;
      if (keys[2]) keys[1] = toPath({VALUE, STATE, string: keys[1], e, id});
      keys.splice(2, 1);
      subKey = keys[1].split("]");
    }

    const value = toValue({VALUE, STATE, params: {value: subKey[0]}, e, id});

    const before = keys[0];
    subKey = subKey.slice(1);
    keys = keys.slice(2);
    const after = keys.join("[") ? `[${keys.join("[")}` : "";

    string = `${before}.${value}${subKey.join("]")}${after}`;

    // a1,a2,a3 => a1.a2.a3
    string = string.split(",").join(".");
    if (string.includes("..")) string.replace("..", ".");
    if (string.slice(-1) === ".") string = string.slice(0, -1);
  }

  if (string.split("[")[1]) string = toPath({VALUE, STATE, string, e, id});  */

  return string;
};

module.exports = {toPath};
