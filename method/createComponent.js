const { clone } = require("./clone")
const { generate } = require("./generate")
const { toApproval } = require("./toApproval")
const { toParam } = require("./toParam")

const _component = require("../component/_component")

module.exports = {
    createComponent: ({ VALUE, STATE, id }) => {

        var local = VALUE[id]
        
        if (!_component[local.type]) return [local, id]
        local = _component[local.type](local)

        // destructure type, params, & conditions from type
        local.type = local.type.split('/?').join('_question')
        var type = local.type.split('?')[0]
        var params = local.type.split('?')[1]
        var conditions = local.type.split('?')[2]

        // type
        local.type = type
        
        // approval
        var approved = toApproval({ VALUE, STATE, string: conditions, id })
        if (!approved) return
        
        // push destructured params from type to local
        if (params) {
            params = toParam({ VALUE, STATE, string: params, id })
            Object.entries(params).map(([k, v]) => local[k] = v )
            if (params.id) {

                delete Object.assign(VALUE, { [params.id]: VALUE[id] })[id]
                id = params.id

            } else if (params.data) {

                var state = local.Data
                if (!state) state = local.Data = generate()
                STATE[state] = local.data || {}
                STATE[`${state}-options`] = { backup: clone(STATE[state]) }

            }
        }
        
        VALUE[id] = local
    }
}