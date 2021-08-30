const resizeInput = ({ VALUE, id }) => {
    var local = VALUE[id]
    if (!local) return

    if (local.type !== 'Input') return

    var results = dimensions({ VALUE, id })

    // for width
    var width = local.style.width
    if (width === 'fit-content') {

        if (local.element) {

            local.element.style.width = results.width + 'px'
            if (local.templated) VALUE[local.parent].element.style.width = results.width + 'px'

        } else results.width + 'px'

    } else local.style.width

    // for height
    var height = local.style.height
    if (height === 'fit-content') {

        if (local.element) {

            local.element.style.height = results.height + 'px'
            if (local.templated) VALUE[local.parent].element.style.height = results.height + 'px'

        } else results.height + 'px'

    } else local.style.height
}

const dimensions = ({ VALUE, id, params = {} }) => {
    var local = VALUE[id]
    if (!local) return

    var lDiv = document.createElement('div')
    document.body.appendChild(lDiv)

    var pStyle = local.style
    var pText = params.text || local.data || (local.input && local.input.value) || local.text || ''
    var pFontSize = pStyle.fontSize

    if (pStyle != null) lDiv.style = pStyle

    lDiv.style.fontSize = pFontSize
    lDiv.style.position = "absolute"
    lDiv.style.left = -1000
    lDiv.style.top = -1000
    lDiv.style.padding = pStyle.padding
    lDiv.style.maxWidth = pStyle.maxWidth 
    lDiv.style.maxHeight = pStyle.maxHeight
    lDiv.style.transform = pStyle.transform
    if (pStyle.width === '100%') lDiv.style.width = local.element.clientWidth + 'px'

    lDiv.innerHTML = pText

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    }

    document.body.removeChild(lDiv)
    lDiv = null
    
    return lResult
}

module.exports = {resizeInput, dimensions}