const resizeInput = ({ VALUE, id }) => {
    var local = VALUE[id]
    if (!local) return

    if (local.type !== 'Input') return

    var width = local.style.width
    if (width === 'fit-content') {

        var results = dimensions({ VALUE, id })

        if (local.element) local.element.style.width = results.width + 'px'
        else return results.width + 'px'

    } else return local.style.width
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
    lDiv.style.transform = pStyle.transform

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