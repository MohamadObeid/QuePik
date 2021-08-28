const {resizeInput} = require('./resize')

const setStyle = ({ VALUE, params, id }) => {

    var local = VALUE[id]
    if (!local) return
    
    if (!local.style) local.style = {}

    Object.entries(params.style).map(([key, value]) => {

        var timer = 0

        if ((value + '').includes('::')) {
            value = value + ''
            timer = value.split('::')[1]
            value = value.split('::')[0]
        }

        local[key + '-timer'] = setTimeout(() => {

            //VAR.style[key] = value
            if (local.element) local.element.style[key] = value
            else local.style[key] = value

        }, timer)
        if (key === 'width') resizeInput({ VALUE, id })
    })
}

const resetStyles = ({ VALUE, params, id }) => {
    
    var local = VALUE[id]
    if (!local.style || !local.style.after) return

    local.afterStylesMounted = false

    params = { style: {} }

    Object.entries(local.style.after).map(([key]) => {

        if (local.style[key]) params.style[key] = local.style[key]
        else params.style[key] = null
    })

    setStyle({ VALUE, params, id })
    
}

const toggleStyles = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    if (local.afterStylesMounted) resetStyles({ VALUE, params, id })
    else mountAfterStyles({ VALUE, params, id })
};

const mountAfterStyles = ({ VALUE, params, id }) => {
    var local = VALUE[id]
    if (!local.style || !local.style.after) return

    local.afterStylesMounted = true
    
    Object.entries(local.style.after).map(([key, value]) => {
        var timer = 0
        value = value + ''
        if (value.includes('::')) {
            timer = value.split('::')[1]
            value = value.split('::')[0]
        }
        local[key + '-timer'] = setTimeout(
            () => local.element.style[key] = value, timer
        )
    })
}

module.exports = {setStyle, resetStyles, toggleStyles, mountAfterStyles}