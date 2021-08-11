const { clone } = require("./clone")

const clearValues = ({ params }) => {
    var obj = params.values
    var newObj = clone(obj)

    if (typeof obj === 'undefined') return ''

    if (typeof obj === 'string') return ''

    if (Array.isArray(obj)) {
        newObj = []
        obj.map((element, index) => {

            if (typeof element === 'object') {
                newObj[index] = clearValues({ params: { values: element } })
            } else newObj[index] = ''

        })

        return newObj
    }

    Object.entries(obj).map(([key, value]) => {
        if (Array.isArray(value)) {
            newObj[key] = []
            value.map((element, index) => {

                if (typeof element === 'object') {
                    newObj[key][index] = clearValues({ params: { values: element } })
                } else newObj[key][index] = ''

            })
        } else if (typeof value === 'object') newObj[key] = clearValues({ params: { values: value } })
        else newObj[key] = ''
    })

    return newObj
}

module.exports = {clearValues}