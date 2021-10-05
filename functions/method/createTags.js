const {clone} = require("./clone");
const {generate} = require("./generate");
const {toArray} = require("./toArray");
const {createComponent} = require("./createComponent");
const {toTag} = require("./toTag");
const {isEqual} = require("./isEqual");

const autoActions = ["flicker"];

const createTags = ({VALUE, STATE, id}) => {
  const local = VALUE[id];
  if (!local) return;

  local.length = 1;

  if (local.mapType && Array.isArray(local.data) && local.data.length > 0) {
    local.length = local.data.length || 1;

    var $ = clone(local);
    delete VALUE[id];

    if (local.unmount !== undefined && local.data > 0) {
      const toUnmount = [];
      toArray(local.unmount).map((i) => {
        toUnmount.push(local.data[i]);
      });
      toUnmount.map((unmount) => {
        const index = local.data.findIndex((el) => isEqual(el, unmount));
        if (index !== -1) local.data.splice(index, 1);
      });
    }

    return $.data
        .map((data, index) => {
          const id = generate();
          const local = clone($);

          local.derivations = [...local.derivations, index];
          local.mapIndex = index;
          local.data = data;
          local.id = id;

          VALUE[id] = local;
          return createTag({VALUE, STATE, id});
        })
        .join("");
  }

  if (local.originalKeys) {
    const keys = Object.keys(clone(local.data || {})).filter(
        (key) => !local.originalKeys.includes(key)
    );

    if (keys.length > 0) {
      local.length = keys.length;
      var $ = clone(local);
      delete VALUE[id];

      return keys
          .map((key, index) => {
            const id = generate();
            const local = clone($);

            local.id = id;
            local.key = key;
            local.mapIndex = index;
            VALUE[id] = local;

            return createTag({VALUE, STATE, id});
          })
          .join("");
    }
  }

  if (local.lang && !local.templated && !local.duplicated) {
    const langs = Object.keys(clone(local.data || {}));

    if (langs.length > 0) {
      local.length = langs.length;
      var $ = clone(local);
      delete VALUE[id];

      return langs
          .map((lang, index) => {
            const id = generate();
            const local = clone($);

            local.id = id;
            local.lang = lang;
            local.mapIndex = index;

            VALUE[id] = local;

            return createTag({VALUE, STATE, id});
          })
          .join("");
    }
  }

  if (local.currency && !local.templated && !local.duplicated) {
    const currencies = Object.keys(clone(local.data || {}));

    if (currencies.length > 0) {
      local.length = currencies.length;
      var $ = clone(local);
      delete VALUE[id];

      return currencies
          .map((currency, index) => {
            const id = generate();
            const local = clone($);

            local.id = id;
            local.currency = currency;
            local.mapIndex = index;

            VALUE[id] = local;

            return createTag({VALUE, STATE, id});
          })
          .join("");
    }
  }

  if (local.mapType) {
    local.mapIndex = 0
    local.derivations.push(0)
  }
  return createTag({VALUE, STATE, id});
};

const createTag = ({VALUE, STATE, id}) => {
  const {execute} = require("./execute");

  // components
  componentModifier({VALUE, STATE, id});
  createComponent({VALUE, STATE, id});

  const local = VALUE[id];

  // execute onload actions
  autoActions.map((action) => {
    if (local[action]) {
      local.actions = toArray(local.actions);
      local.actions.push(action);
    }
  });

  if (local.actions) execute({VALUE, STATE, actions: local.actions, id});
  return toTag({STATE, VALUE, id});
};

const componentModifier = ({VALUE, id}) => {
  const local = VALUE[id];

  // icon
  if (local.type === "Icon") {
    local.icon = local.icon || {};
    local.icon.name = local.icon.name || "";
    if (local.icon.google) local.google = true;

    if (local.icon.outlined || local.icon.type === "outlined") {
      local.outlined = true;
    } else if (local.icon.rounded || local.icon.type === "rounded") {
      local.rounded = true;
    } else if (local.icon.sharp || local.icon.type === "sharp") {
      local.sharp = true;
    } else if (local.icon.twoTone || local.icon.type === "twoTone") {
      local.twoTone = true;
    }
  }

  // textarea
  else if (local.textarea && !local.templated) {
    local.style = local.style || {};
    local.input = local.input || {};
    local.input.style = local.input.style || {};
    local.input.style.height = "fit-content";
  }

  // input
  else if (local.type === "Input") {
    local.input = local.input || {};

    if (local.checked !== undefined) local.input.checked = local.checked;
    if (local.max !== undefined) local.input.max = local.max;
    if (local.min !== undefined) local.input.min = local.min;
    if (local.name !== undefined) local.input.name = local.name;
    if (local.defaultValue !== undefined) {
      local.input.defaultValue = local.defaultValue;
    }
  } else if (local.type === "Item") {
    const parent = VALUE[local.parent];

    if (local.index === 0) {
      local.state = generate();
      parent.state = local.state;
    } else local.state = parent.state;
  }
};

module.exports = {createTags};
