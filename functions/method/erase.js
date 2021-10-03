const axios = require("axios");
const { toAwait } = require("./toAwait");

const erase = async ({ VALUE, STATE, id, e, params = {} }) => {
  var local = VALUE[id];
  if (!local) return;

  var erase = params.erase;
  var {
    data: { data, message, success },
  } = await axios.delete(
    `/api/${erase.path}${erase.id ? `/id=[${erase.id}]` : ""}`
  );
  console.log("here");
  local.erase = { data, message, success };

  console.log(data, message, success);

  // await params
  toAwait({ VALUE, STATE, id, e, params });
};

module.exports = { erase };
