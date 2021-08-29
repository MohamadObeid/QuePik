const textarea = ({ VALUE, id }) => {
    var local = VALUE[id]
    if (!local) return

    if (!local.textarea || local.type !== 'Input') return

    var parent = local.templated && VALUE[local.parent]
    local.element.setAttribute("style", "height:" + (local.element.scrollHeight) + "px;overflow-y:hidden;")
    if (parent) parent.element.setAttribute("style", "height:" + (local.element.scrollHeight) + "px")

    const OnInput = (e) => {

        var element = local.element
        var parent = local.templated && VALUE[local.parent]
        
        element.style.height = "auto"
        element.style.height = (element.scrollHeight) + "px"

        parent.element.style.height = "auto"
        parent.element.style.height = (parent.element.scrollHeight) + "px"
    }
    
    local.element.addEventListener("input", OnInput, false)
}

module.exports = { textarea }