const {resize} = require('./resize')
const { toArray } = require('./toArray')

const setStyle = ({ VALUE, params = {}, id }) => {

    var local = VALUE[id]
    if (!local) return

    if (!local.style) local.style = {}
    if (!params.style) params.style = {}
    
    Object.entries(params.style).map(([key, value]) => {

        if (key === 'after') return
        var timer = 0
        if (value || value === 0) value = value + ''

        if (value && value.includes('>>')) {
            timer = value.split('>>')[1]
            value = value.split('>>')[0]
        }

        var style = () => {

            // value = width || height
            if (value) {
                if (value === 'width' || value.includes('width/')) {

                    var divide = value.split('/')[1]
                    value = local.element.clientWidth
                    if (divide) value = value / parseFloat(divide)

                    value += 'px'

                } else if (value === 'height' || value.includes('height/')) {

                    var divide = value.split('/')[1]
                    value = local.element.clientHeight
                    if (divide) value = value / parseFloat(divide)

                    value += 'px'

                } else if (key === 'left' && value === 'center') {

                    var width = local.element.offsetWidth
                    var parentWidth = VALUE[local.parent].element.clientWidth

                    value = parentWidth/2 - width/2 + 'px'
                }
            }

            if (local.element) local.element.style[key] = value
            else local.style[key] = value

        }

        if (timer) {
            local[`${key}-timer`] = setTimeout(style, timer)
        } else style()
        
        if (key === 'width') resize({ VALUE, id })
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
        if (value.includes('>>')) {
            timer = value.split('>>')[1]
            value = value.split('>>')[0]
        }

        if (timer) local[key + '-timer'] = setTimeout(() => local.element.style[key] = value, timer) 
        else {
            if (local.element) local.element.style[key] = value
            else {
                local.controls = toArray(local.controls)
                local.controls.push({
                    event: `load?value.element.style.${key}=${value}`
                })
            }
        }
    })
}

module.exports = {setStyle, resetStyles, toggleStyles, mountAfterStyles}