const { setData } = require("./data")
const { resizeInput } = require("./resize")
const { isArabic } = require("./isArabic")
const { removeData } = require("./data")

const defaultInputHandler = ({ STATE, VALUE, id }) => {

    var local = VALUE[id]
    if (!local) return

    if (local.type !== 'Input') return

    // checkbox input
    if (local.input && local.input.type === 'checkbox') {
        if (local.data === true) local.element.checked = true

        var myFn = (e) => {

            // local doesnot exist
            if (!VALUE[id]) return e.target.removeEventListener('change', myFn)

            var value = e.target.checked
            local.data = value

            if (STATE[local.Data] && local.derivations[0] != '') {

                // reset Data
                var data = { value }
                setData({ STATE, VALUE, params: { data }, id })
            }
        }

        return local.element.addEventListener('change', myFn)
    }

    // input
    local.value = local.element.value
    
    if (local.input && local.input.type === 'number')
        local.element.addEventListener("mousewheel", (e) => e.target.blur())

    if (local.input && local.input.value && !local.data)
        setData({ STATE, VALUE, params: { data: { value: local.input.value } }, id })

    if (local.readonly) return

    var myFn = (e) => {
        e.preventDefault()

        // VAR[id] doesnot exist
        if (!VALUE[id]) return e.target.removeEventListener('input', myFn)

        var value = e.target.value

        // for number inputs, strings are rejecteds
        if (local.input && local.input.type === 'number') {
            if (isNaN(value) || local.data === 'free') return
            value = parseFloat(value)
        }

        // for uploads
        if (local.upload) {

            value = e.target.files
            var length = Object.entries(value).length

            if (length === 0) return
            else if (length === 1) value = value[0].name
            else if (length > 1) {
                value = []
                Object.entries(e.target.files).map(([key, val]) => {
                    value.push(val.name)
                })
            }

        }

        local.element.value = value
        local.data = value

        if (local.Data && local.derivations[0] != '') {

            // reset Data
            setData({ STATE, VALUE, params: { data: { value } }, id })
            
            // remove value from data
            if (value === '') return removeData({ VALUE, STATE, id })
        }

        // resize
        resizeInput({ VALUE, id })

        // arabic values
        isArabic({ VALUE, params: { value }, id })

        console.log(value, STATE[local.Data])
    }

    local.element.addEventListener('input', myFn)
    local.element.addEventListener('keydown', (e) => {
        if (e.keyCode == 13 && !e.shiftKey) e.preventDefault()
    })
    
    // resize
    resizeInput({ VALUE, id })
}

module.exports = {defaultInputHandler}