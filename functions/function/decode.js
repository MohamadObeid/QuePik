const { toValue } = require("./toValue")

const decode = ({ VALUE, STATE, string, e, id }) => {
  var keys = string.split('<')

  if (keys.length === 1) return string

  if (keys[1]) {
    var subKey = keys[1].split('>')

    // ex. < < <> <> > >
    while (subKey[0] === keys[1] && keys[2] !== undefined) {
      keys[1] += `${'<'}${keys[2]}`
      if (keys[1].includes('>') && keys[2]) keys[1] = decode({VALUE, STATE, string: keys[1], e, id})
      keys.splice(2, 1)
      subKey = keys[1].split(']')
    }

    // ex. 1.2.3.<4.5.6
    if (subKey[0] === keys[1] && keys.length === 2) 
    return keys.join('<')

    var value = toValue({ VALUE, STATE, id, e, params: { value: subKey[0] } })

    var before = keys[0]
    subKey = subKey.slice(1)
    keys = keys.slice(2)
    var after = keys.join('<') ? `${'<'}${keys.join('<')}` : ""

    string = `${before}${value}${subKey.join('>')}${after}`
  }

  if (string.split('<')[1]) string = decode({VALUE, STATE, string, e, id})

  return string
}

module.exports = {decode}
