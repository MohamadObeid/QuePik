const focus = ({ VALUE, id }) => {
    
    var local = VALUE[id]
    if (!local) return

    if (local.type === 'Input') local.element.focus()
    else {
        if (local.element) {
            var childElements = local.element.getElementsByTagName("INPUT")
            if (childElements.length === 0) childElements = local.element.getElementsByTagName("TEXTAREA")
            if (childElements.length > 0) {
                childElements[0].focus()
            }
        }
    }

    var value = local.element.value
    local.element.value = ''
    local.element.value = value
}

module.exports = {focus}