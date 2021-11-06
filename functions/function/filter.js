const { isEqual } = require("./isEqual")
const { toArray } = require("./toArray")
const { toAwait } = require("./toAwait")
const { compare } = require("./compare")
const { toFirebaseOperator } = require("./toFirebaseOperator")
const { clone } = require("./clone")

const filter = ({VALUE, STATE, params = {}, id, e}) => {

  var local = VALUE[id]
  if (!local) return

  var filter = params.filter || {}
  var Data = filter.Data || local.Data
  var options = STATE[`${Data}-options`]
  if (!options) options = STATE[`${Data}-options`] = {}

  var path = toArray(filter.path)
  path = path.map(path => path.split("."))

  var backup = filter.backup
  var value = filter.value

  if (!value || isEqual(options.filter, value)) {

    options.filter = clone(value)
    data = backup

  } else {

    // reset backup filter options
    options.filter = clone(value)
    
      // remove spaces
    Object.entries(value).map(([k, v]) => value[k] = v.toString().split(" ").join("").toLowerCase())
    
    var data = []
    data.push(
      ...backup.filter(data => {
        return !Object.entries(value).map(([o, v]) => 
        compare(path
        .map(path => (path
        .reduce((o, k) => o[k], data) || '')
        .toString()
        .toLowerCase()
        .split(" ")
        .join("")
        )
        .join(""),
        toFirebaseOperator(o), v))
        .join("")
        .includes("false")
      })
    )
  }
  
  STATE[Data] = data
  local.filter = {
    success: true,
    data
  }

  // await params
  toAwait({VALUE, STATE, id, e, params})
}

module.exports = {filter}
