const { merge } = require("./merge")

const derive = (data, keys, fullDerivation, defaultData, writable) => {
    
    var derivedData = data
    var isArray = false

    if (!Array.isArray(keys)) keys = keys.split('.')
    
    derivedData = keys.reduce((o, k, i) => {
        if (isArray) return o

        if (k === 'merge()') return merge(o)

        // path doesnot exist => create path
        if (writable && typeof o[k] !== 'object') {

            if (i < keys.length - 1) {
                if (!isNaN(keys[i + 1])) o[k] = []
                else o[k] = {}
            }

            else if (i === keys.length - 1) {

                if (defaultData || defaultData === 0) o[k] = defaultData

                else if (Array.isArray(o) && isNaN(k)) {

                    if (o.length === 0) {
                        o.push({})
                        keys.splice(i, 0, 0)
                    }
                }
            }
        }

        if (o === undefined) return undefined

        if (Array.isArray(o) && isNaN(k)) {

            if (fullDerivation) o = o.map(o => derive(o, keys.slice(i), true)[0])
            else keys = keys.slice(0, i) || []

            isArray = true
            return o
        }

        return o[k]
    }, data)
    
        // do not touch isArray...
    return [derivedData, keys, isArray]
}


module.exports = {derive}