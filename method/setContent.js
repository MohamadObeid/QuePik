const { isArabic } = require("./isArabic")

const setContent = ({ VALUE, STATE, params = {}, id }) => {
    var local = VALUE[id]
    
    var content = params.content || {}
    var value = content.value || ''

    if (typeof value !== 'string' && typeof value !== 'number') return

    // not loaded yet
    if (!local.element) return

    if (local.type === 'Input' || local.type === 'TextInput') local.element.value = value || ''
    else if (local.type === 'Text' || local.type === 'Label' || local.type === 'Header') local.element.innerHTML = value || ''
    else if (local.type === 'UploadInput') local.element.value = value || null

    isArabic({ VALUE, params: { value }, id })
}

module.exports = {setContent}