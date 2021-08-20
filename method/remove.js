const { removeIds } = require("./update")
const { clone } = require("./clone")
const { clearIntervals } = require("./clearIntervals")

const remove = ({ VALUE, params, id }) => {

    var local = VALUE[id]
    if (!params) params = {}

    if (!local.Data) return

    var keys = clone(local.derivations)
    var path = params.path ? params.path('.') : []
    
    // convert string numbers paths to num
    if (path.length > 0)
        path = path.map(k => { 
            if (!isNaN(k)) k = parseFloat(k) 
            return k
        })

    if (params.path) keys.push(...path)

    if (keys.length === 0) local.parent.children.splice([keys[keys.length - 1]], 1)
    else keys.reduce((o, k, i) => {

        if (i === keys.length - 1) {
            if (Array.isArray(o)) {
                o.splice(k, 1)
                local.derivations.pop()
            } else return delete o[k]

        }
        return o[k]

    }, local.Data)

    console.log(local.Data)

    clearIntervals({ VALUE, id })
    removeIds({ VALUE, id })
    local.element.remove()

    // reset length and derivations
    var after = false
    var siblings = clone(VALUE[local.parent].childrenSiblings)
    
    siblings.map((id, i) => {
        VALUE[id].length -= 1
        
        if (after) {
            var index = VALUE[id].derivations.length - 1
            if (!isNaN(VALUE[id].derivations[index])) resetDerivations({VALUE, id, index})
        }

        if (id === local.id) {
            VALUE[local.parent].childrenSiblings.splice(i, 1)
            after = true
        }
    })

    delete VALUE[id]
}

const resetDerivations = ({VALUE, id, index}) => {
    
    VALUE[id].derivations[index] -= 1
    
    VALUE[id].childrenSiblings && VALUE[id].childrenSiblings.map(id => {
        resetDerivations({VALUE, id, index})
    })
}

module.exports = {remove}