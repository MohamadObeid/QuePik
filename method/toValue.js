const { clone } = require("./clone")
const { merge } = require("./merge")
const { toKey } = require("./toKey")
const { generate } = require("./generate")
const { reducer } = require("./reducer")

const toValue = ({ VALUE, STATE, params: { value, params }, id, e }) => {
    
    const { toParam } = require("./toParam")
    const { toApproval } = require("./toApproval")
    const { toId } = require("./toId")

    var local = VALUE[id], minus, plus, times, division
        
    // destructure []
    if (value) value = toKey({ VALUE, STATE, string: value, e, id })

    if (value && value.charAt(0) === '[' && value.charAt(value.length - 1) === ']') {

        value = value.slice(1, value.length - 1)

        var open = value.split('[')
        var k = generate()
        value = []

        if (open[0]) {
            open[0] = open[0].split(',')
            open[0].map(open => {
                if (open) {
                    var flat = open.includes('.flat()')
                    if (flat) open = open.split('.flat()')[0]
                    var val = toParam({ VALUE, STATE, string: `${k}=${open}`, id, e })[k]
                    flat ? value.push(...val) : value.push(val)
                }
            })
        }
        
        // an array value
        if (open[1]) {

            open = open.slice(1)
            open.map(open => {

                var close = open.split(']')
                value.push(toParam({ VALUE, STATE, string: `${k}=[${close[0]}]`, id, e })[k])

                if (close[1]) {
                    close[1] = close[1].split(',')
                    close[1].map(close => {
                        if (close) {
                            var flat = close.includes('.flat()')
                            if (flat) close = close.split('.flat()')[0]
                            var val = toParam({ VALUE, STATE, string: `${k}=${close}`, id, e })[k]
                            flat ? value.push(...val) : value.push(val)
                        }
                    })
                }
            })
            
            value = value.filter(value => value)
            console.log(value);
        }


    } else {

        // id
        if (value && value.includes('::')) {

            var newId = value.split('::')[1]
            id = toId({ VALUE, STATE, id, string: newId, e })[0]
            value = value.split('::')[0]

        }

        var local = VALUE[id]
        if (!local) return value
        
        // conditions
        if (value && value.includes('<<')) {

            var condition = value.split('<<')[1]
            var approved = toApproval({ STATE, VALUE, id, e, string: condition })
            if (!approved) return '*return*'
            value = value.split('<<')[0]
            
        }
        
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

        if (value) {
            minus = value.split('--')[1]
            plus = value.split('++')[1]
            times = value.split('**')[1]
            division = value.split('÷÷')[1] // hold Alt + 0247
        }

        if (plus) {
            value = value.split('++')[0]
            if (!isNaN(plus)) plus = parseFloat(plus)
        } else if (minus) {
            value = value.split('--')[0]
            if (!isNaN(minus)) minus = parseFloat(minus)
        } else if (times) {
            value = value.split('**')[0]
            if (!isNaN(times)) times = parseFloat(times)
        } else if (division) {
            value = value.split('÷÷')[0]
            if (!isNaN(division)) division = parseFloat(division)
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
        else if (path.length > 1) {

            if (path[0] === 'global') {
                
                local = VALUE[path[1]]
                path = path.slice(2)
                path.unshift('value')
            }

            if (path[0] === 'value' || path[0] === 'state' || path[0] === 'e' || path[0] === 'params') {

                var object = path[0] === 'value' ? clone(local) 
                : path[0] === 'state' ? clone(STATE[path[1]]) 
                : path[0] === 'params' ? clone(params) 
                : path[0] === 'e' && e
                
                if (path[0] === 'state') path = path.slice(2)
                else path = path.slice(1)

                value = reducer({ VALUE, STATE, id, params: { path, object } })
                
            } else if (path[0] === 'const') {
                value = value.split('const.')[1]

            } else if (path[0] === 'encoded') {
                value = STATE.encoded[path[1]]

            } else if (path[0] === 'generate') {

                if (path[1] === 'capitalize') value = generate().toUpperCase()
                else value = generate()

            } else if (path[path.length - 1] === 'parent') {

                var element = VALUE[path[0]]
                if (!element) value = path[0]
                else value = element.parent
            }

        }

        if (plus) value = value + plus
        else if (minus) value = value - minus
        else if (times) value = value * times
        else if (division) value = value / division

    }

    return value
}

module.exports = { toValue }