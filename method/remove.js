const { removeId } = require("./update")
const { clone } = require("./clone")
const { clearIntervals } = require("./clearIntervals")

const remove = ({ VALUE, params, id }) => {

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
    clearIntervals({ VALUE, id })
    removeId({ VALUE, id })
    local.element.remove()
    
    VALUE[local.parent].childrenSiblings.map((id, i) => {
        VALUE[id].length -= 1
        if (id === local.id) VALUE[local.parent].childrenSiblings.splice(i, 1)
    })
    delete VALUE[id]

}

module.exports = {remove}