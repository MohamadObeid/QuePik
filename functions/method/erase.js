/*const axios = require("axios");

const erase = async ({ VALUE, STATE, id, e, params = {} }) => {
  var local = VALUE[id];
  if (!local) return;
  
  var erase = params.erase
  var { data: { data, message, success } } = await axios.delete(`/api/${erase.path}${erase.id ? `/id=${erase.id}` : ''}`)
  
  local.erase = { data, message, success };

  console.log(data, message, success);

  // await params
  toAwait({ VALUE, STATE, id, e, params });
};

module.exports = { erase };*/
const { toAwait } = require("./toAwait");

module.exports = {
  erase: async ({ VALUE, STATE, params = {}, id, e }) => {
        
    var local = VALUE[id]
    var erase = params.erase
    var collection = erase.path
    var ref = STATE.db.collection(collection)
    
    ref.doc(erase.id).delete().then(() => {

      local.erase = {
        success: true,
        message: `Data erased successfuly!`,
      }
            
      console.log(local.erase)
                  
      // await params
      toAwait({ VALUE, STATE, id, e, params })
    })
    .catch(error => {

      local.erase = {
          success: false,
          message: error,
      }
      
      console.log(local.erase)
    })
  }
}
