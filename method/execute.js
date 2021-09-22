
const { toApproval } = require("./toApproval")
const { toArray } = require("./toArray")
const { toParam } = require("./toParam")
const { getParam } = require("./getParam")
const { toId } = require("./toId")
const { generate } = require("./generate")
const { toValue } = require("./toValue")
const { toAwait } = require("./toAwait")
const _method = require("./_method")

const execute = ({ VALUE, STATE, controls, actions, e, id, params }) => {

    var local = VALUE[id], awaiter = [], _params = params, localId = id
    // if (!local) return

    if (controls) actions = controls.actions
    if (local) local.break = false

    // execute actions
    toArray(actions).map(_action => {
        
        // stop after actions
        if (local && local.break) return

        var approved = true
        var actions = _action.split('?')
        var params = _params || actions[1]
        var conditions = actions[2]
        var idList = actions[3]

        actions = actions[0].split(';')

        // action does not exist
        actions.map(action => {

            var name = action.split('::')[0]

            // action>>timer
            var timer = parseFloat(name.split('>>')[1] || 0)
            name = name.split('>>')[0]

            // approval => note: essential for break::do not remove
            approved = toApproval({ VALUE, STATE, string: conditions, params, id, e })
            if (!approved) return

            // reset
            var reset = getParam(_action, 'reset', false)
            if (local) local.break = getParam(_action, 'break', false)
            if (reset) clearTimeout(local[`${name}-timer`])
            
            const myFn = () => {
                
                // approval
                approved = toApproval({ VALUE, STATE, string: conditions, params, id, e })
                if (!approved) return
                
                // params
                params = toParam({ VALUE, STATE, string: params, e, id })
                
                // id's
                idList = toId({ VALUE, STATE, id, string: idList, e })

                // action::id
                var actionid = action.split('::')[1]
                if (actionid) actionid = toValue({ VALUE, STATE, params: { value: actionid, params }, id, e })
                
                // action
                var keys = name.split('.')
                if (keys.length > 1) keys.map((k, i) => {

                    if (i === keys.length - 1) return name = k
                    if (k === 'async') {

                        params.asyncer = true
                        
                    } else if (k === 'await') {
                        
                        params.awaiter = true
                        awaiter.push(action.split('await.')[1])
                    }
                })
                
                
                if (_method[name] && (!params.awaiter || params.asyncer)) 
                
                (actionid ? toArray(actionid) : idList).map(async id => {

                    if (typeof id !== 'string') return

                    // id = value.path
                    if (id.indexOf('.') > -1) {
                        
                        var k = generate()
                        id = toParam({ VALUE, STATE, string: `${k}=${id}`, e, id: localId })[k]
                    }

                    // component does not exist
                    if (!id || !VALUE[id]) return

                    if (params.asyncer) params.awaiter = awaiter
                    await _method[name]({ VALUE, STATE, controls, params, e, id })
                    
                    // asyncer
                    //if (_method[name].constructor.name !== 'AsyncFunction') 
                    toAwait({ VALUE, STATE, id, e, params })
                })

            }
            
            if (timer) {
                if (local) local[`${name}-timer`] = setTimeout(myFn, timer)
                else setTimeout(myFn, timer)
            } else myFn()
        })
    })
    
}

module.exports = {execute}