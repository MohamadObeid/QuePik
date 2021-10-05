const {generate} = require("./generate");
const {reducer} = require("./reducer");

const toValue = ({VALUE = {}, STATE, params: {value, params}, id, e}) => {
  const {toApproval} = require("./toApproval");

  var local = VALUE[id];
  let minus = [];
  let plus = [];
  let times = [];
  let division = [];

  // return const value
  if (value && value.split("const.")[1] && !value.split("const.")[0]) {
    return value.split("const.")[1];
  }

  // auto space
  if (value === "_dot") return (value = ".");

  // auto space
  if (value === "&nbsp") return (value = "&nbsp;");

  // auto space
  if (value && value.includes("_question"))
    value = value.split("_question").join("?");

  // space
  if (value === " ") return (value = " ");

  // destructure []
  //if (value) value = toCode({VALUE, STATE, string: value, e, id});

  if ( value && value.charAt(0) === "[" && value.charAt(value.length - 1) === "]" && value.slice(1, value.length - 1) ) {
    
    value = value.slice(1, value.length - 1)
    value = value.split(",").map((value) => toValue({VALUE, STATE, id, e, params: {value, params}}) )
    value = value.filter((value) => value !== undefined && value !== '')
    
  } else {
    // id
    if (value && value.includes("::")) {
      const newId = value.split("::")[1];
      id = toValue({VALUE, STATE, id, params: {value: newId, params}, e});
      value = value.split("::")[0];
    }

    var local = VALUE[id];
    // if (!local) return value

    // value1 || value2 || value3
    if (value && value.includes("||")) {
      const values = value.split("||");
      value = undefined;

      values.map((val) => {
        if (
          value === undefined ||
          value === "" ||
          Number.isNaN(value) ||
          value === "*return*"
        ) {
          value = toValue({ VALUE, STATE, id, e, params: {value: val, params} })
        }
      });

      return value;
    }

    // conditions
    if (value && value.includes("<<")) {
      const condition = value.split("<<")[1];
      const approved = toApproval({STATE, VALUE, id, e, string: condition});
      if (!approved) return "*return*";
      value = value.split("<<")[0];
    }

    if (value) {
      minus = value.split("--");
      plus = value.split("++");
      times = value.split("**");
      division = value.split("÷÷"); // hold Alt + 0247

      if (plus.length > 1) {
        value = plus[0];
        plus.shift();
        minus.shift();
        times.shift();
        division.shift();
        plus = plus.map((value) =>
          toValue({VALUE, STATE, id, params: {params, value}, e})
        );
      } else if (minus.length > 1) {
        value = minus[0];
        plus.shift();
        minus.shift();
        times.shift();
        division.shift();
        minus = minus.map((value) =>
          toValue({VALUE, STATE, id, params: {params, value}, e})
        );
      } else if (times.length > 1) {
        value = times[0];
        plus.shift();
        minus.shift();
        times.shift();
        division.shift();
        times = times.map((value) =>
          toValue({VALUE, STATE, id, params: {params, value}, e})
        );
      } else if (division.length > 1) {
        value = division[0];
        plus.shift();
        minus.shift();
        times.shift();
        division.shift();
        division = division.map((value) =>
          toValue({VALUE, STATE, id, params: {params, value}, e})
        );
      } else {
        plus.shift();
        minus.shift();
        times.shift();
        division.shift();
      }
    }

    const path = typeof value === "string" ? value.split(".") : [];
console.log(path);
    /* value */
    if (typeof value === "boolean") {
    } else if (!isNaN(value)) value = parseFloat(value);
    else if (value === undefined || value === "generate") value = generate();
    else if (path[0].includes("()")) {
      value = reducer({ VALUE, STATE, id, e, params: {path, params, object: VALUE} });
    } else if (value === "undefined") value = false;
    else if (value === "input") value = local && local.element.value;
    else if (value === "false") value = false;
    else if (value === "true") value = true;
    // else if (value === 'string' || value === `''`) value = ''
    // else if (value === 'object' || value === '{}') value = {}
    // else if (value === 'array' || value === '[]') value = []
    // else if (value === '[{}]') value = [{}]
    // else if (value === '[string]') value = ['']
    else if (value === "''") value = "";
    else if (value === "{}") value = {};
    else if (value === "[]") value = [];
    else if (value === '[{}]') value = [{}]
    else if (value.includes("%20")) value = value.split("%20").join(" ");
    else if (value.includes("JSON.parse")) {
      value = JSON.parse(value.split("JSON.parse(")[1].slice(0, -1));
    } else if (value.includes("JSON.stringify")) {
      value = JSON.stringify(value.split("JSON.stringify(")[1].slice(0, -1));
    } else if (path[1]) {
      value = reducer({VALUE, STATE, id, params: { path, value, params }, e});
    }

    if (plus.length > 0) {
      plus.map((plus) => (value += plus));
    } else if (minus.length > 0) {
      minus.map((minus) => (value -= minus));
    } else if (times.length > 0) {
      times.map((times) => (value *= times));
    } else if (division.length > 0) {
      division.map((division) => (division /= plus));
    }
  }

  return value;
};

module.exports = {toValue};
