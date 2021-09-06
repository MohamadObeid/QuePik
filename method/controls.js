const { toArray } = require("./toArray")

const controls = ({ VALUE, STATE, controls, id }) => {
    
    const { addEventListener } = require("./event")
    const { execute } = require("./execute")
    const { watch } = require("./watch")

    var local = VALUE[id]

    // controls coming from createControls action
    controls = controls || local.controls

    controls && toArray(controls).map(controls => {
        
        // watch
        if (controls.watch) watch({ VALUE, STATE, controls, id })

        // event
        else if (controls.event) addEventListener({ VALUE, STATE, controls, id })

        // execute onload
        else execute({ VALUE, STATE, controls, id })
    })
}

const setControls = ({ VALUE, id, params }) => {
    
    var local = VALUE[id]
    if (!local) return
    
    local.controls = toArray(local.controls)
    local.controls.push(...toArray(params.controls))
}

module.exports = {controls, setControls}