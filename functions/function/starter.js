const control = require("../control/control")
const { clone } = require("./clone")
const { toArray } = require("./toArray")
const { toParam } = require("./toParam")

const starter = ({ STATE, VALUE, id }) => {
  
  const {defaultEventHandler} = require("./event")
  const {setStyle} = require("./style")
  const {controls} = require("./controls")
  const {defaultInputHandler} = require("./defaultInputHandler")
  const {isArabic} = require("./isArabic")

  var local = VALUE[id]
  if (!local || !local.element) return delete VALUE[id]

  // status
  local.status = "mounting"

  /* Defaults must start before controls */

  // arabic text
  isArabic({VALUE, id})

  // input handlers
  defaultInputHandler({VALUE, STATE, id})

  // mouseenter, click, mouseover...
  defaultEventHandler({VALUE, id})
  
  // on loaded image
  if (local.type === 'Image') local.element.src = local.src

  /* End of default handlers */

  // element awaiters
  if (local.await) {

    var params = toParam({ VALUE, STATE, id, string: local.await.join(';') })
    VALUE[id] = { ...local, ...params }
    local = VALUE[id]
    if (params.id) {
      VALUE[params.id] = { ...local, ...params }
      delete VALUE[id]
    }
    delete local.await
  }

  // setStyles
  if (local.style) setStyle({VALUE, STATE, id, params: { style: local.style }})

  // lunch auto controls
  Object.entries(control).map(([type, control]) => {
    if (local[type]) {
      local.controls = toArray(local.controls)
      var _controls = control({ VALUE, STATE, id, params: { controls: local[type] } })
      _controls && local.controls.push(..._controls)
    }
  })

  // execute controls
  if (local.controls) controls({ VALUE, STATE, id })

  // run starter for children
  const children = [...local.element.children]

  children.map((child) => {
    const id = child.id
    if (!id) return
    starter({ STATE, VALUE, id })
  })
}

module.exports = {starter}
