const { generate } = require("./generate")

const toKey = ({ VALUE, STATE, string, e, id }) => {

    const { toParam } = require("./toParam")

    var keys = []
    keys = string.split('[')
    if (!keys[0]) return string

    if (keys[1]) {

        var bracketKey = keys[1].split(']')
        var k = generate()
        var value = toParam({ VALUE, STATE, string: `${k}=${bracketKey[0]}`, e, id })[k]
        var before = keys[0]
        keys = keys.slice(2)
        string = `${before}.${value}${bracketKey[1]}${keys.join('[') ? `[${keys.join('[')}` : ''}`
        string = string.split(',').join('.')
        if (string.includes('..')) string.replace('..', '.')
        if (string.slice(-1) === '.') string = string.slice(0, -1)

    }
    
    if (string.split('[')[1]) string = toKey({ VALUE, STATE, string, e, id })
    
    return string
}

module.exports = { toKey }