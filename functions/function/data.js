const { clone } = require("./clone")
const { reducer } = require("./reducer")
const {setContent} = require("./setContent")
const {setData} = require("./setData")

const createData = ({STATE, VALUE, params, id}) => {
  const local = VALUE[id]
  const data = params.data

  local.derivations.reduce((o, k, i) => {
    if (i === local.derivations.length - 1) return o[k] = data
    return o[k]
  }, STATE[local.Data])
}

const clearData = ({ STATE, VALUE, id, e, params = {} }) => {

  var local = VALUE[id]
  if (!STATE[local.Data]) return
  
  var clear = params.clear || {}
  var path = clear.path
  path = path ? path.split(".") : clone(local.derivations)
  path.push('delete()')
  
  reducer({ VALUE, STATE, id, e, params: {path, object: STATE[local.Data]} })

  setContent({ VALUE, id })
  console.log("data removed", STATE[local.Data])
}

module.exports = {createData, setData, clearData}
