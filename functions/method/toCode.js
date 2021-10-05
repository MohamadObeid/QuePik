const {generate} = require("./generate");

const toCode = ({VALUE, STATE, string, e, id}) => {
  let keys = string.split('[');

  if (keys.length === 1) return string;

  if (keys[1]) {
    const key = `coded()${generate()}`;
    let subKey = keys[1].split(']');

    // ex. [ [ [] [] ] ]
    while (subKey[0] === keys[1] && keys[2] !== undefined) {
      keys[1] += `${'['}${keys[2]}`;
      if (keys[2]) keys[1] = toCode({VALUE, STATE, string: keys[1], e, id});
      keys.splice(2, 1);
      subKey = keys[1].split(']');
    }

    if (subKey[0].includes(',')) subKey[0] = `[${subKey[0]}]`
    STATE.codes[key] = subKey[0];
    const value = key;

    const before = keys[0];
    subKey = subKey.slice(1);
    keys = keys.slice(2);
    const after = keys.join('[') ? `${'['}${keys.join('[')}` : "";

    string = `${before}${value}${subKey.join(']')}${after}`;
  }

  if (string.split('[')[1]) string = toCode({VALUE, STATE, string, e, id});

  // encode round brackets
  // string = toCode({ VALUE, STATE, string, e, id, roundBrackets: true })

  return string;
};

module.exports = {toCode};
