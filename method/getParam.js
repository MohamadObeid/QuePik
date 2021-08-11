const getParam = (string, param, defValue) => {
    if (!string) return defValue
    if (!string.includes('?')) return defValue

    string = string.split('?')[1]
    if (!string) return defValue

    string = string.split(';')
    string = string.find(el => el.includes(param))
    if (!string) return defValue

    var value = string.split(param)[1]
    if (!value) value = true

    return value
}

module.exports = {getParam}