
const { toApproval } = require("./toApproval")
const { toArray } = require("./toArray")
const { toParam } = require("./toParam")
const { getParam } = require("./getParam")
const { toId } = require("./toId")
const { generate } = require("./generate")
const _method = require("./_method")

const execute = ({ VALUE, STATE, controls, actions, e, id, instantly, params }) => {

    var local = VALUE[id], awaiter = [], _params = params
    if (!local) return
    if (controls) actions = controls.actions
    local.break = false

    // execute actions
    toArray(actions).map(_action => {
        
        // stop after actions
        if (local.break) return

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
            var timer = name.split('>>')[1] || 0
            name = name.split('>>')[0]

            // approval => note: essential for break::do not remove
            approved = toApproval({ VALUE, STATE, string: conditions, params, id })
            if (!approved) return

            // reset
            var reset = getParam(_action, 'reset', false)
            local.break = getParam(_action, 'break', false)
            if (reset) clearTimeout(local[`${name}-timer`])
            
            const myFn = () => {

                // approval
                approved = toApproval({ VALUE, STATE, string: conditions, params, id })
                if (!approved) return

                // params
                if (typeof params === 'string') 
                params = toParam({ VALUE, STATE, string: params, e, id })

                // id's
                idList = toId({ VALUE, STATE, id, string: idList, e })

                // action::id
                var actionid = action.split('::')[1];
                
                (actionid ? [actionid] : idList).map(id => {

                    // id = value.path
                    if (id.includes('.')) {

                        var k = generate()
                        id = toParam({ VALUE, STATE, string: `${k}=${id}`, e, id: local.id })[k]
                    }

                    // component doesnot exist
                    if (!id || !VALUE[id]) return
                    
                    var keys = name.split('.')
                    if (keys.length > 1) keys.map((k, i) => {

                        if (i === keys.length - 1) return name = k
                        if (k === 'async') {

                            params.asyncer = true
                            params.awaiter = awaiter
                            
                        } else if (k === 'await') {
                            
                            params.awaiter = true
                            return awaiter.push(action.split('await.')[1])
                        }
                    })

                    if (!_method[name]) return
                    _method[name]({ VALUE, STATE, controls, params, e, id })
                })

            }

            if (instantly) return myFn()
            local[`${name}-timer`] = setTimeout(myFn, timer)
        })
    })
    
}

module.exports = {execute}