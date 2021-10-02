const { toApproval } = require("./toApproval")
const { clone } = require("./clone")
const { toParam } = require("./toParam")
const { toValue } = require("./toValue")
const { isEqual } = require("./isEqual")

const watch = ({ VALUE, STATE, controls, id }) => {

    const { execute } = require("./execute")

    var local = VALUE[id]
    if (!local) return

    var watch = controls.watch.split('/?').join('_question')

    watch.split('?')[0].split(';').map(name => {

        var timer = 500
        if (name.includes('>>')) {
            timer = name.split('>>')[1]
            name = name.split('>>')[0]
        }

        local[`${name}-watch`] = toValue({ VALUE, STATE, id, params: { value: name } })

        const myFn = async () => {
            if (!VALUE[id]) return clearInterval(local[`${name}-timer`])
            
            var value = toValue({ VALUE, STATE, id, params: { value: name } })

            if (value === undefined || isEqual(value, local[`${name}-watch`])) return
            
            local[`${name}-watch`] = clone(value)
            
            // approval
            var approved = toApproval({ VALUE, STATE, id, string: watch.split('?')[2] })
            if (!approved) return
            
            // params
            params = toParam({ VALUE, STATE, id, string: watch.split('?')[1] })
            
            // once
            if (params.once) clearInterval(local[`${name}-timer`])
            if (controls.actions) await execute({ VALUE, STATE, controls, id })
                
            // await params
            if (params.await) toParam({ VALUE, STATE, id, string: params.await.join(';') })

        }

        if (local[`${name}-timer`]) clearInterval(local[`${name}-timer`])
        local[`${name}-timer`] = setInterval(myFn, timer)

    })
}

module.exports = {watch}