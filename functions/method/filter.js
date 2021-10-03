const {toArray} = require("./toArray");
const {toAwait} = require("./toAwait");

const filter = ({VALUE, STATE, params = {}, id, e}) => {
  const local = VALUE[id];
  if (!local) return;

  const filter = params.filter || {};
  const Data = filter.Data || local.Data;
  const options = STATE[`${Data}-options`];

  let path = toArray(filter.path);
  path = path.map((path) => path.split("."));

  const backup = filter.backup;
  let value = filter.value;

  if (options.filter === value) return (options.filter = value);

  // reset backup filter options
  options.filter = value;

  // empty value
  if (value === undefined || value === "") STATE[Data] = backup;
  else {
    // remove spaces
    value = value.split(" ").join("").toLowerCase();

    const data = [];
    data.push(
        ...backup.filter((data) => path
              .map((path) => path
                .reduce((o, k) => o[k], data)
                .toString()
                .toLowerCase()
                .split(" ")
                .join("")
              )
              .join("")
              .includes(value)
        )
    );

    STATE[Data] = data;
  }

  // await params
  toAwait({VALUE, STATE, id, e, params});
};

module.exports = {filter};
