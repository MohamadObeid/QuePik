const { toApproval } = require("./toApproval");
const { toArray } = require("./toArray");
const { toParam } = require("./toParam");
const { getParam } = require("./getParam");
const { toId } = require("./toId");
const { toValue } = require("./toValue");
const { toAwait } = require("./toAwait");
const _method = require("./_method");

const execute = ({ VALUE, STATE, controls, actions, e, id, params }) => {
  var local = VALUE[id],
    _params = params,
    localId = id

  if (controls) actions = controls.actions;
  if (local) local.break = false;

  // execute actions
  toArray(actions).map((_action) => {
    var awaiter = []

    // stop after actions
    if (local && local.break) return;

    _action = _action.split("/?").join("_question");

    var approved = true
    var actions = _action.split("?")
    var params = _params || actions[1]
    var conditions = actions[2]
    var idList = actions[3]

    actions = actions[0].split(";")

    // approval
    if (conditions) approved = toApproval({ VALUE, STATE, string: conditions, params, id: localId, e })
    if (!approved) return

    // params
    params = toParam({ VALUE, STATE, string: params, e, id: localId })

    // action does not exist
    actions.map(action => {

      var name = action.split("::")[0]

      // action>>timer<<condition
      var caseCondition = name.split('<<')[1]
      name = name.split('<<')[0]
      var timer = parseFloat(name.split(">>")[1] || 0)
      name = name.split(">>")[0]

      // reset
      var reset = getParam(_action, "reset", false)
      if (local) local.break = getParam(_action, "break", false)
      if (reset) clearTimeout(local[`${name}-timer`])
      
      const myFn = () => {
        var approved = true

        // asyncer & awaiter
        var keys = name.split("."), isAwaiter, isAsyncer
        if (keys.length > 1) keys.map(k => {
  
          if (k === "async") isAsyncer = true
          else if (k === "await") {
            isAwaiter = true
            awaiter.push(action.split("await.")[1])
          }
        })
        if (isAwaiter || isAsyncer) name = name.split(".")[1]
        if (isAwaiter) return

        // case condition approval
        if (caseCondition) approved = toApproval({ VALUE, STATE, string: caseCondition, params, id: localId, e })
        if (!approved) return

        // id list
        idList = toId({ VALUE, STATE, id, string: idList, e })

        // action::id
        var actionid = action.split("::")[1]
        if (actionid) actionid = toValue({ VALUE, STATE, params: { value: actionid, params }, id: localId, e })

        if (_method[name]) (actionid ? toArray(actionid) : idList).map(async (id) => {

            if (typeof id !== "string") return

            // id = value.path
            if (id.indexOf(".") > -1) 
            id = toValue({ VALUE, STATE, params: { value: id }, e, id: localId })

            // component does not exist
            if (!id || !VALUE[id]) return

            if (isAsyncer) {
              params.awaiter = awaiter
              params.asyncer = isAsyncer
            }
            await _method[name]({ VALUE, STATE, controls, params, e, id })
          })
      }

      if (timer) {
        if (local) local[`${name}-timer`] = setTimeout(myFn, timer)
        else setTimeout(myFn, timer)
      } else myFn()
    })
  })
}

module.exports = { execute }
