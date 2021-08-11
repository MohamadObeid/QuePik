const { generate } = require("./generate")
const { execute } = require("./execute")
const { toBoolean } = require("./toBoolean")
const { isEqual } = require("./isEqual")
const { clone } = require("./clone")
const { toObject } = require("./toObject")
const { setData } = require("./data")

const watch = ({ VALUE, STATE, controls, id }) => {
    var local = VALUE[id]

    var key = generate()
    var watch = controls.watch.toString()
    var names = watch.split('?')[0].split(';')

    // approval
    var conditions = watch.split('?')[2] || true
    var approved = toBoolean({ VALUE, STATE, string: conditions, id })
    if (!approved) return

    names.map(name => {

        // params
        var params = watch.split('?')[1]
        if (params) params = toObject({ VALUE, STATE, string: params, id })
        else params = {}

        var timer = 50
        if (name.includes('::')) {
            timer = name.split('::')[1]
            name = name.split('::')[0]
        }

        // value
        var value = name.split('.')[0] === 'value'

        // state
        var state = name.split('.')[0] === 'state'
        if (state) state = name.split('.')[1]
        else state = name
        if (state === 'true') state = false

        const myFn = () => {

            if (value) {

                value = toObject({ VALUE, STATE, string: `${key}=${name}`, id })[key]

                if (value !== undefined && !isEqual(value, local[`${name}-watch`])) {

                    if (value.nodeType === Node.ELEMENT_NODE) local[`${name}-watch`] = value
                    else local[`${name}-watch`] = clone(value)

                    if (name.split('.')[1] === 'data') setData({ VALUE, STATE, params: { value }, id })
                    if (params.once) clearInterval(local[`${watch}-timer`])

                    execute({ VALUE, STATE, controls, id })
                }

                // rewatch
                value = true

            } else if (state) {

                if (STATE[state] !== undefined && !isEqual(STATE[state], local[`${name}-watch`])) {

                    if (STATE[state].nodeType === Node.ELEMENT_NODE) local[`${name}-watch`] = STATE[state]
                    else local[`${name}-watch`] = clone(STATE[state])

                    if (params.once) STATE[state] = undefined
                    execute({ VALUE, STATE, controls, id })
                }

            } else execute({ VALUE, STATE, controls, id })

        }

        if (local[`${watch}-timer`]) clearInterval(local[`${watch}-timer`])
        local[`${watch}-timer`] = setInterval(myFn, timer)

    })
}

module.exports = {watch}