const { toPath } = require("./toPath")
const { generate } = require("./generate")
const { reducer } = require("./reducer")

const toValue = ({ VALUE, STATE, params: { value, params }, id, e }) => {
    
    const { toApproval } = require("./toApproval")

    var local = VALUE[id], minus, plus, times, division
    
    // return const value
    if (value && value.split('const.')[1] && !value.split('const.')[0] ) return value.split('const.')[1]
        
    // destructure []
    if (value) value = toPath({ VALUE, STATE, string: value, e, id })
    
    // auto space
    if (value === '&nbsp') value = '&nbsp;'
    
    if (value && value.charAt(0) === '[' && value.charAt(value.length - 1) === ']') {

        value = value.slice(1, value.length - 1)
        value = value.split(',').map(value => toValue({ VALUE, STATE, id, e, params: { value, params } }))
        value = value.filter(value => value)
        
    } else {

        // id
        if (value && value.includes('::')) {

            var newId = value.split('::')[1]
            id = toValue({ VALUE, STATE, id, params: { value: newId, params }, e })
            value = value.split('::')[0]

        }

        var local = VALUE[id]
        if (!local) return value
        
        // value1 || value2 || value3
        if (value && value.includes('||')) {

            var values = value.split('||')
            value = undefined
            
            values.map(val => {
                if (value === undefined || value === '' || value === NaN || value === '*return*') 
                value = toValue({ VALUE, STATE, id, e, params: { value: val, params } })
            })
            
            return value
        }

        // conditions
        if (value && value.includes('<<')) {

            var condition = value.split('<<')[1]
            var approved = toApproval({ STATE, VALUE, id, e, string: condition })
            if (!approved) return '*return*'
            value = value.split('<<')[0]
            
        }

        if (value) {
            minus = value.split('--')[1]
            plus = value.split('++')[1]
            times = value.split('**')[1]
            division = value.split('÷÷')[1] // hold Alt + 0247
        }

        if (plus) {

            value = value.split('++')[0]
            plus = toValue({ VALUE, STATE, id, params: { params, value: plus }, e })

        } else if (minus) {

            value = value.split('--')[0]
            minus = toValue({ VALUE, STATE, id, params: { params, value: minus }, e })

        } else if (times) {

            value = value.split('**')[0]
            times = toValue({ VALUE, STATE, id, params: { params, value: times }, e })

        } else if (division) {

            value = value.split('÷÷')[0]
            division = toValue({ VALUE, STATE, id, params: { params, value: division }, e })
        }

        var path = typeof value === 'string' ? value.split('.') : []
        
        /* value */
        if (typeof value === 'boolean') { }
        else if (!isNaN(value)) value = parseFloat(value)
        else if (value === undefined || value === 'generate') value = generate()
        else if (value === 'undefined') value = false
        else if (value === 'input') value = local && local.element.value
        else if (value === 'false') value = false
        else if (value === 'true') value = true
        else if (value === 'string' || value === `''`) value = ''
        else if (value === 'object' || value === '{}') value = {}
        else if (value === 'array' || value === '[]') value = []
        else if (value === '[{}]') value = [{}]
        else if (value === '[string]') value = ['']
        else if (value.includes('%20')) value = value.split('%20').join(' ')
        else if (value.includes('JSON.parse')) value = JSON.parse(value.split('JSON.parse(')[1].slice(0, -1))
        else if (value.includes('JSON.stringify')) value = JSON.stringify(value.split('JSON.stringify(')[1].slice(0, -1))
        else if (path[1]) {

            if (path[0] === 'global') {
                local = VALUE[path[1]]
                id = path[1]
                path = path.slice(1)
                path[0] = 'value'
            }
            
            value = reducer({ VALUE, STATE, id, params: { path, value, params }, e })
        }

        if (plus) value = value + plus
        else if (minus) value = value - minus
        else if (times) value = value * times
        else if (division) value = value / division

    }
    
    return value
}

module.exports = { toValue }