const {toValue} = require("./toValue")
const {reducer} = require("./reducer")
const { toCode } = require("./toCode")
const { generate } = require("./generate")
const { toArray } = require("./toArray")

const toParam = ({VALUE = {}, STATE, string, e, id}) => {
  var {toApproval} = require("./toApproval")

  var localId = id

  if (typeof string !== "string" || !string) return string || {}
  var params = {}

  string.split(";").map((param) => {
    var key, value, id = localId
    
    if (param.includes("=")) {
      var keys = param.split("=")
      key = keys[0]
      value = param.substring(key.length + 1)

    } else key = param
    
    
    // break
    if (params.break) return

    // await
    if (key.includes("await.")) {
      var awaiter = param.split("await.")[1]
      params.await = toArray(params.await) || []
      return params.await.push(awaiter)
    }
    
    value = toValue({VALUE, STATE, id, e, params: {value, params}})

    // condition not approved
    if (value === "*return*") return

    id = localId

    var keys = typeof key === "string" ? key.split(".") : []

    // id
    if (key && key.includes("::")) {
      var newId = key.split("::")[1]
      key = key.split("::")[0]

      // id
      id = toValue({VALUE, STATE, id, params: {value: newId, params}, e})
    }

    // keys from brackets to dots
    key = toCode({ VALUE, STATE, string: key, e, id })

    // array id
    if (Array.isArray(id)) {
      id.slice(1).map(id => {
        var state = generate()
        STATE[state] = value
        toParam({ STATE, VALUE, id, e, string: `${key}=state.${state}` })
      })
      id = id[0]
    }

    // conditions
    if (key && key.includes("<<")) {
      
      var condition = key.split("<<")[1]
      var approved = toApproval({STATE, VALUE, id, e, string: condition})
      if (!approved) return
      key = key.split("<<")[0]
    }

    // timer
    var timer
    if (key && key.includes(">>")) {
      timer = key.split(">>")[1]
      key = key.split(">>")[0]
    }

    var path = typeof key === "string" ? key.split(".") : []

    // object structure
    if (path && path.length > 1) {
      // mount state & value
      if (
        path[0] === "state" ||
        path[0] === "value" ||
        path[0] === "params" ||
        path[0] === "e" ||
        path[0] === "action" ||
        path[0] === "global" ||
        path[0] === "document" ||
        path[0] === "window" ||
        path[0] === "history"
      ) {
        var myFn = () => reducer({VALUE, STATE, id, params: {path, value, key, params}})
        if (timer) VALUE[localId][keys.join(".").split(">>")[0]] = setTimeout(myFn, timer)
        else myFn()
      } else {
        path.reduce((obj, key, index) => {
          if (obj[key] !== undefined) {
            if (index === path.length - 1) {
              // if key=value exists => mount the existing to local, then mount the new value to params
              path.reduce((o, k, i) => {
                if (i === path.length - 1) return (o[k] = value)
                return o[k] || {}
              }, VALUE[id])

              return (obj[key] = value)
            }
          } else {
            if (index === path.length - 1) return (obj[key] = value)
            else obj[key] = {}
          }

          return obj[key]
        }, params)
      }

      key = path[0]
    } else params[key] = value
  })

  return params
}

module.exports = {toParam}
