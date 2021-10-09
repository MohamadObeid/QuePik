const axios = require("axios");
const { toAwait } = require("./toAwait");

const save = async ({ VALUE, STATE, params = {}, id, e }) => {
  var local = VALUE[id];
  if (!local) return;

  var save = params.save;

  var { data: { data, message, success } } = await axios.post(`/api/${save.path}`, save.data)

  local.save = { data, message, success };

  console.log(data, message, success);

  // await params
  toAwait({ VALUE, STATE, id, e, params });
};

module.exports = { save };
