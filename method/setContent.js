const { isArabic } = require("./isArabic")
const { isEqual } = require("./isEqual")

const setContent = ({ VALUE, STATE, params = {}, id }) => {
    var local = VALUE[id]

    var value = ''
    if (params) value = params.value || params.content || params.data || ''

    // for specific case: VAR.data was equal to [], then updated to ['value'] =>
    if (Array.isArray(value))
        if (value.length === 1 && isNaN(local.derivations.slice(-1)[0])) {
            value = value[0]
            local.derivations.push(0)
        }

    if (typeof value !== 'string' && typeof value !== 'number') return

    // not loaded yet
    if (!local.element) return

    if (local.type === 'Input' || local.type === 'TextInput') local.element.value = value || ''
    else if (local.type === 'Text' || local.type === 'Label' || local.type === 'Header') local.element.innerHTML = value || ''
    else if (local.type === 'UploadInput') local.element.value = value || null

    // set parent data the same as child data
    if (isEqual(local.parent.derivations, local.derivations) && isEqual(local.data, local.parent.data)) {

        // set derivations
        if (Array.isArray(local.data))
            if (isNaN(local.derivations.slice(-1)[0]))
                local.derivations.push(0)

        // set data
        local.data = value

        local.parent.data = local.data
        local.parent.Data = STATE[local.Data]
        local.parent.derivations = local.derivations

    } else {

        // set derivations
        if (Array.isArray(local.data))
            if (isNaN(local.derivations.slice(-1)[0]))
                local.derivations.push(0)

        // set data
        local.data = value
    }

    isArabic({ VALUE, params: { value }, id })
}

module.exports = {setContent}