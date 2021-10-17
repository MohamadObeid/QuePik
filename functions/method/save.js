/*const axios = require("axios");

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

module.exports = { save };*/
const { capitalize } = require("./capitalize");
const { toAwait } = require("./toAwait");

module.exports = {
  save: async ({ VALUE, STATE, params = {}, id, e }) => {
        
    var local = VALUE[id]
    var save = params.save
    var collection = save.path
    var ref = STATE.db.collection(collection)
    
    ref.doc(save.data.id).set(save.data).then(() => {

      local.save = {
        data: save.data,
        success: true,
        message: `${capitalize(collection)} saved successfuly!`,
      }
            
      console.log(local.save)
                  
      // await params
      toAwait({ VALUE, STATE, id, e, params })
    })
    .catch(error => {

      local.save = {
          success: false,
          message: error,
      }
      
      console.log(local.save)
    })
  }
}