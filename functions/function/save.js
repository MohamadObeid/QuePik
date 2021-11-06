/*const axios = require("axios")

const save = async ({ VALUE, STATE, params = {}, id, e }) => {
  var local = VALUE[id]
  if (!local) return

  var save = params.save

  var { data: { data, message, success } } = await axios.post(`/api/${save.path}`, save.data)

  local.save = { data, message, success }

  console.log(data, message, success)

  // await params
  toAwait({ VALUE, STATE, id, e, params })
}

module.exports = { save }*/
const { capitalize } = require("./capitalize")
const { toAwait } = require("./toAwait")
const { toArray } = require("./toArray")
const { clone } = require("./clone")

module.exports = {
  save: async ({ VALUE, STATE, params = {}, id, e }) => {
        
    var local = VALUE[id]
    var save = params.save
    var collection = save.path
    var ref = STATE.db.collection(collection)
    
    toArray(save.data).map(data => {
      ref.doc(data.id).set(data).then(() => {
        var _params = clone(params)

        local.save = {
          data,
          success: true,
          message: `${capitalize(collection)} saved successfuly!`,
        }
              
        console.log(local.save)
                    
        // await params
        toAwait({ VALUE, STATE, id, e, params:_params })
      })
      .catch(error => {

        local.save = {
            success: false,
            message: error,
        }
        
        console.log(local.save)
      })
    })
  }
}