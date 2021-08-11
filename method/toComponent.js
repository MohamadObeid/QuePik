const { generate } = require('./generate')
const {toArray} = require('./toArray')

const toComponent = (obj) => {

    // class
    obj.class = obj.class || ''

    // id
    obj.id = obj.id || generate()

    // style
    obj.style = obj.style || {}
    if (!obj.style.after) obj.style.after = obj.style.after || {}

    // controls
    obj.controls = toArray(obj.controls) || []

    // input
    if (obj.type === 'Input') {
    obj.input = obj.input || { type: 'text'}
    obj.input.value = obj.input.value || ''
    }

    // text
    obj.text = obj.text || obj.data

    // icon
    obj.icon = obj.icon || { name: '', style: { after: {} } }
    obj.icon.style = obj.icon.style || { after: {} }
    obj.icon.style.after = obj.icon.style.after || {}

    // label
    if (obj.type === 'Label') {
    obj.label = obj.label || { text: false }
    }

    // children
    obj.children = obj.children || []

    // chevron
    obj.chevron = obj.chevron || { style: { after: {} } }
    obj.chevron.style = obj.chevron.style || { after: {} }
    obj.chevron.style.after = obj.chevron.style.after || {}

    // props
    obj.props = obj.props || {}

    // text
    obj.text = obj.text || ''

    // item
    obj.item = obj.item || {}

    // model
    obj.featured = obj.featured && 'featured'
    obj.model = obj.model || obj.featured || 'classic'

    // path
    obj.path = obj.path || ''

    // search
    obj.search = obj.search || {}

    // sort
    obj.sort = obj.sort || {}

    return obj
}

module.exports = {toComponent}