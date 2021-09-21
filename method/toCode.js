const { generate } = require("./generate")

const toCode = ({ VALUE, STATE, string, e, id }) => {

    var open = '[', close = ']'
    var keys = string.split(open)

    if (keys.length === 1) return string

    if (keys[1]) {

        var key = `coded()${generate()}`
        var subKey = keys[1].split(close)

        // ex. [ [ [] [] ] ]
        while (subKey[0] === keys[1] && keys[2] !== undefined) {

            keys[1] += `${open}${keys[2]}`
            if (keys[2]) keys[1] = toCode({ VALUE, STATE, string: keys[1], e, id })
            keys.splice(2, 1)
            subKey = keys[1].split(close)
            
        }

        STATE.codes[key] = subKey[0]
        var value = key

        var before = keys[0]
        subKey = subKey.slice(1)
        keys = keys.slice(2)
        var after = keys.join(open) ? `${open}${keys.join(open)}` : ''
        
        string = `${before}${value}${subKey.join(close)}${after}`
    }
    
    if (string.split(open)[1]) string = toCode({ VALUE, STATE, string, e, id })

    // encode round brackets
    // string = toCode({ VALUE, STATE, string, e, id, roundBrackets: true })

    return string
}

module.exports = { toCode }