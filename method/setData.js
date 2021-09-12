const { clone } = require("./clone")
const { derive } = require("./derive")
const { setContent } = require("./setContent")

const setData = ({ STATE, VALUE, params = {}, id }) => {
    
    var local = VALUE[id]
    if (!STATE[local.Data]) return
    
    var data = params.data
    var path = data.path

    // defualt value
    var defValue = data.value
    if (defValue === undefined) defValue = ''

    // path
    if (path) path = path.split('.')
    else path = []
    
    // convert string numbers paths to num
    path = path.map(k => {
        if (!isNaN(k)) k = parseFloat(k) 
        return k
    })

    // keys
    var derivations = clone(local.derivations)
    var keys = [...derivations, ...path]
    
    // set value
    var value = derive(STATE[local.Data], keys, true, defValue, true)[0]
    local.data = value
    
    if (local.input && local.input.type === 'file') return

    // setContent
    var content = data.content || value
    setContent({ VALUE, params: { content: { value: content } }, id })
}

module.exports = {setData}