const { setData } = require("./data")
const { resize } = require("./resize")
const { isArabic } = require("./isArabic")
const { generate } = require("./generate")

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
    
    if (local.input && local.input.type === 'number')
        local.element.addEventListener("mousewheel", (e) => e.target.blur())

    //if (local.input && local.input.value && !local.data)
    //    setData({ STATE, VALUE, params: { data: { value: local.input.value } }, id })

    if (local.readonly) return

    var myFn = async (e) => {
        e.preventDefault()

        // VAR[id] doesnot exist
        if (!VALUE[id]) return e.target.removeEventListener('input', myFn)

        var value = e.target.value

        // for number inputs, strings are rejecteds
        if (local.input && local.input.type === 'number') {

            value = parseFloat(value)
            if (isNaN(value) || local.data === 'free') return
            if (local.input.min > value) value = local.input.min
            else if (local.input.max < value) value = local.input.max
            local.input.value = value
        }

        // for uploads
        if (local.input.type === 'file') {

            value = e.target.files
            
            // add files to state for saving
            const readFile = (file) => {
                return new Promise ((res, rej) => {
                    let myReader = new FileReader()
                    myReader.onloadend = (e) => res(myReader.result)
                    myReader.readAsDataURL(file)
                })
            }

            var file = await readFile(value[0])
            var fileName = `${Date.now()}-${generate()}`
            
            return STATE.file = { file, "file-name": fileName }

        } else local.element.value = value
        
        // rating input 
        if (local.class.includes('rating__input')) {
            value = local.element.getAttribute('defaultValue')
        }

        if (local.Data && local.derivations[0] != '') {

            // reset Data
            setData({ STATE, VALUE, params: { data: { value } }, id })
        }

        // resize
        resize({ VALUE, id })

        // arabic values
        isArabic({ VALUE, params: { value }, id })

        console.log(value, STATE[local.Data])
    }

    local.element.addEventListener('input', myFn)
    local.element.addEventListener('keydown', (e) => {
        if (e.keyCode == 13 && !e.shiftKey) e.preventDefault()
    })
    
    // resize
    resize({ VALUE, id })
}

module.exports = {defaultInputHandler}