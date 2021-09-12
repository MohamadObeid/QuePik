const { generate } = require("./generate")

const toKey = ({ VALUE, STATE, string, e, id }) => {

    const { toParam } = require("./toParam")

    var keys = [], k = generate()
    keys = string.split('[')

    // is array
    if (!keys[0]) return string

    if (keys[1]) {

        var subKey = keys[1].split(']')

        // ex. [ [ [] [] ] ]
        while (subKey[0] === keys[1] && keys[2] !== undefined) {

            keys[1] += `[${keys[2]}`
            if (keys[2]) keys[1] = toKey({ VALUE, STATE, string: keys[1], e, id })
            keys.splice(2, 1)
            subKey = keys[1].split(']')
            
        }

        var value = toParam({ VALUE, STATE, string: `${k}=${subKey[0]}`, e, id })[k]

        var before = keys[0]
        subKey = subKey.slice(1)
        keys = keys.slice(2)
        var after = keys.join('[') ? `[${keys.join('[')}` : ''
        
        string = `${before}.${value}${subKey.join(']')}${after}`
        
        // a1,a2,a3 => a1.a2.a3
        string = string.split(',').join('.')
        if (string.includes('..')) string.replace('..', '.')
        if (string.slice(-1) === '.') string = string.slice(0, -1)
    }
    
    if (string.split('[')[1]) string = toKey({ VALUE, STATE, string, e, id })
    
    return string
}

module.exports = { toKey }