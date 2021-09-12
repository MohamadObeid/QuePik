const focus = ({ VALUE, id }) => {
    
    var local = VALUE[id]
    if (!local) return

    var isInput = local.type === 'Input' || local.type === 'Textarea'
    if (isInput) local.element.focus()
    else {
        if (local.element) {
            var childElements = local.element.getElementsByTagName("INPUT")
            if (childElements.length === 0) childElements = local.element.getElementsByTagName("TEXTAREA")
            if (childElements.length > 0) {
                childElements[0].focus()
            }
        }
    }

    // focus to the end of input
    var value = local.element.value
    local.element.value = ''
    local.element.value = value
}

module.exports = {focus}