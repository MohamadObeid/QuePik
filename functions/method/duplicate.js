var {clearValues} = require("./clearValues");
var {clone} = require("./clone");
var {toArray} = require("./toArray");
var {derive} = require("./derive");
var {isEqual} = require("./isEqual");
var {removeDuplicates} = require("./removeDuplicates");
var {generate} = require("./generate");
var {focus} = require("./focus");

var duplicate = ({ VALUE, STATE, params = {}, id }) => {
  
  var {createElement} = require("./createElement");
  var {starter} = require("./starter");
  var {setElement} = require("./setElement");

  let localID = id, path = []
  var local = VALUE[id];

  if (STATE[local.Data]) {
    
    var keys = clone(local.derivations);
    var duplicate = params.duplicate || {}
    var index = duplicate.index || 0;

    if (!Array.isArray(path))
    keys = duplicate.path ? duplicate.path.split(".") : keys

    // last index refers to data index => must be poped
    if (!isNaN(keys[keys.length - 1])) {
      index = keys[keys.length - 1];
      keys.pop();
    }

    var language; var currency;

    keys.reduce((o, k, i) => {
      if (i === keys.length - 1) {
        if (local.currency) {
          var currencies = [];
          Object.entries(o[k]).map(([k, v]) => {
            currencies.push(k);
          });

          var random = [];
          STATE.asset.currency.options.map((currency) => {
            if (!currencies.includes(currency.name.en)) {
              random.push(currency.name.en);
            }
          });

          currency = random[0];
          o[k][currency] = "";
        } else if (local.lang) {
          var langs = [];
          Object.entries(o[k]).map(([k, v]) => {
            langs.push(k);
          });

          var random = [];
          STATE.asset.language.options.map((lang) => {
            if (!langs.includes(lang.name.en)) random.push(lang.name.en);
          });

          language = random[0];
          o[k][language] = "";
        } else if (local.key) {
          o[k][local.key] = "";
        } else {
          o[k] = toArray(o[k]);
          i = o[k].length - 1;

          if (isNaN(local.derivations[local.derivations.length - 1])) {
            if (path.length > 0) path.push(0)
            else local.derivations.push(0);
            var index = local.derivations.length - 1;
            var children = [...local.element.children];

            // update length
            children.map((child) =>
              VALUE[child.id].derivations.splice(index, 0, 0)
            );
          }

          o[k].push(clone(local.pushData || o[k][i] || ""));
          var index = o[k].length - 1;
          o[k][index] = removeDuplicates(clearValues(o[k][index]));
        }
      }

      return o[k];
    }, STATE[local.Data]);
  } else {
    var index = duplicate.index || local.children.length - 1;
    local.children.push(local.children[index]);
  }

  var length = local.length !== undefined ? local.length : 1;
  var id = generate();

  VALUE[local.parent].children = toArray(VALUE[local.parent].children);
  VALUE[id] = clone(VALUE[local.parent].children[local.index]);
  VALUE[id].id = id;
  VALUE[id].parent = local.parent;
  VALUE[id].duplicatedElement = true;
  VALUE[id].index = local.index;
  VALUE[id].derivations = (duplicate.path) ? duplicate.path.split('.') : [...local.derivations];

  var local = VALUE[id];
  local.duplicated = true;

  if (VALUE[localID].currency) {
    var type = local.type.split("currency=")[0];
    type += local.type.split("currency=")[1].slice(2);
    type += `;currency=${currency}`;
    local.type = type;
  } else if (VALUE[localID].lang) {
    var type = local.type.split("lang=")[0];
    type += local.type.split("lang=")[1].slice(2);
    type += `;lang=${language}`;
    local.type = type;
  } else if (
    VALUE[localID].originalKeys ||
    local.type.includes("originalKeys=")
  ) {
    // remove originalKeys=[]
    var type = local.type.split("originalKeys=")[0];
    if (local.type.split("originalKeys=")[1]) {
      type += local.type
          .split("originalKeys=")[1]
          .split(";")
          .slice(1)
          .join(";");
    }
    local.type = type;
  } else if (VALUE[localID].key) {
    // local.key
  } else {
    var lastIndex = local.derivations.length - 1
    if (!isNaN(local.derivations[lastIndex])) local.derivations[lastIndex] = length;
    else local.derivations.push(length)
  }

  // [type]
  if (local.type.slice(0, 1) === "[") {
    local.type = local.type.slice(1);
    var type = local.type.split("]");
    local.type = type[0] + local.type.split("]").slice(1).join(']');
  }

  // path
  if (local.type.includes("path=")) {
    var type = local.type.split("path=");
    local.type = type[0];
    type = type[1].split(";").slice(1);
    local.type += type.join(";");
  }
  
  // create element => append child
  var newcontent = document.createElement("div");
  newcontent.innerHTML = createElement({ STATE, VALUE, id });

  while (newcontent.firstChild) {
    id = newcontent.firstChild.id;
    VALUE[local.parent].element.appendChild(newcontent.firstChild);

    // starter
    setElement({STATE, VALUE, id});
    starter({STATE, VALUE, id});
  }

  // update length
  [...VALUE[local.parent].element.children].map((child) => {
    var id = child.id;
    VALUE[id].length = length + 1;
  });

  // focus
  focus({VALUE, STATE, id});
};

var duplicates = ({STATE, VALUE, params, id}) => {
  var local = VALUE[id];

  var data = derive(STATE[local.Data], local.derivations)[0];
  var exists;
  if (!params.data) return false;

  data = toArray(data);
  if (params.data) exists = data.find((data) => isEqual(data, params.data));
  else {
    data.map((data0) => {
      if (!exists) exists = data.find((data1) => isEqual(data0, data1));
    });
  }

  return exists;
};

module.exports = {duplicate, duplicates};
