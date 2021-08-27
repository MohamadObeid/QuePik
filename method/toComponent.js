const { generate } = require('./generate')
const { toArray } = require('./toArray')

const toComponent = (obj) => {

    // class
    obj.class = obj.class || ''

    // id
    obj.id = obj.id || generate()

    // style
    obj.style = obj.style || {}
    obj.style.after = obj.style.after || {}

    // text
    obj.text = obj.text || ''

    // controls
    obj.controls = toArray(obj.controls)

    // children
    obj.children = obj.children || []

    // model
    obj.featured = obj.featured && 'featured'
    obj.model = obj.model || obj.featured || 'classic'

    // search
    obj.search = obj.search || {}

    // sort
    obj.sort = obj.sort || {}

    return obj
}

module.exports = {toComponent}