const clone = (obj) => {
    var copy
    if (typeof obj !== 'object') return obj

    //if (obj.nodeType === Node.ELEMENT_NODE) return obj

    if (Array.isArray(obj)) {

        copy = []
        obj.map((value, index) => {

            if (typeof value === "object") copy[index] = clone(value)
            else copy[index] = value
        })

    } else {

        copy = obj.constructor()
        Object.entries(obj).map(([key, value]) => {
            copy[key] = value
        })

    }

    return copy
}

module.exports = {clone}