const { setData } = require("./data")
const { setStyle } = require("./style")
const { toString } = require("./toString")

const setValue = ({ VALUE, params, id }) => {
    
    if (!params.value) return
    var local = VALUE[id]

    Object.entries(params.value).map(([key, value]) => {
        /*if (key === 'data') setData({ VALUE, params: { value }, id })

        else if (key === 'Data') {
            local[key] = value
            local.data = value
        }

        else if (key === 'element') {

            value = toString(value)
            var keys = value.split('=')[0].split('.')
            value = value.split('=')[1]

            keys.reduce((o, k, i) => {
                if (i === keys.length - 1) return o[k] = value
                return o[k]
            }, local.element)

        }

        else if (key === 'style') {
            setStyle({ VALUE, params: { style: value }, id })
        }

        else local[key] = value */
    })
}

module.exports = {setValue}