const toString = (object) => {
    if (!object) return ''

    var string = ''
    var length = Object.entries(object).length

    Object.entries(object).map(([key, value], index) => {

        if (Array.isArray(value)) {
            string += `${key}=[${value.join(',')}]`
        }

        else if (typeof value === 'object') {
            var path = toString(value).split(';')
            string = path.map(path => path = `${key}.${path}`).join(';')
        }

        else string += `${key}=${value}`

        if (index < length - 1) string += ';'
    })

    return string || ''
}

module.exports = {toString}