const {toArray} = require("./toArray")
const {toAwait} = require("./toAwait")

const filter = ({VALUE, STATE, params = {}, id, e}) => {
  var local = VALUE[id]
  if (!local) return

  var filter = params.filter || {}
  var Data = filter.Data || local.Data
  var options = STATE[`${Data}-options`]

  var path = toArray(filter.path)
  path = path.map(path => path.split("."))

  var backup = filter.backup
  var value = filter.value

  if (options.filter === value) return options.filter = value

  // reset backup filter options
  options.filter = value
  
  // empty value
  if (value === undefined || value === "") STATE[Data] = backup
  else {
    // remove spaces
    value = value.split(" ").join("").toLowerCase()

    var data = []
    data.push(
      ...backup.filter(data => path
        .map(path => (path
        .reduce((o, k) => o[k], data) || '')
        .toString()
        .toLowerCase()
        .split(" ")
        .join("")
        )
        .join("")
        .includes(value)
      )
    )

    STATE[Data] = data
  }

  // await params
  toAwait({VALUE, STATE, id, e, params})
}

module.exports = {filter}
