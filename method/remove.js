const { update } = require("./update")
const { clone } = require("./clone")

const remove = ({ VALUE, STATE, params, id }) => {

    var local = VALUE[id]
    if (!params) params = {}

    if (!local.DATA) return

    var keys = clone(local.derivations)
    if (params.path) keys.push(...params.path.split('.'))

    if (keys.length === 0) local.parent.children.splice([keys[keys.length - 1]], 1)
    else keys.reduce((o, k, i) => {

        if (i === keys.length - 1) {
            if (Array.isArray(o)) {
                o.splice(k, 1)
                local.derivations.pop()
            } else return delete o[k]

        }
        return o[k]

    }, local.DATA)

    //local.parent.children.splice([keys[keys.length - 1]], 1)

    console.log(local.DATA)
    update({ VALUE, STATE, params: { parent: true }, id })
}

module.exports = {remove}