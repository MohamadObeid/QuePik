const {generate} = require("./generate")
const {starter} = require("./starter")
const {setElement} = require("./setElement")
const {toArray} = require("./toArray")
const {createElement} = require("./createElement")
const {clone} = require("./clone")

const update = ({ STATE, VALUE, id }) => {

  var local = VALUE[id]
  if (!local || !local.element) return

  // remove id from VALUE
  removeIds({ VALUE, id })
  local.element.style.opacity = "0"
  
  local.element.innerHTML = toArray(local.children)
    .map((child, index) => {
      var id = child.id || generate()
      VALUE[id] = clone(child)
      VALUE[id].id = id
      VALUE[id].index = index
      VALUE[id].parent = local.id

      return createElement({ STATE, VALUE, id })
    })
    .join("")

  setTimeout(() => {
    local.element.style.opacity = "1"

    const children = [...local.element.children]
    children.map((child) => {
      const id = child.id
      setElement({VALUE, id})
      starter({STATE, VALUE, id})
    })
    
  }, 25)
}

const removeIds = ({VALUE, id}) => {

  var local = VALUE[id]
  if (!local.element) return delete VALUE[id]
  var children = [...local.element.children]

  children.map((child) => {
    var id = child.id
    if (!VALUE[id]) return

    // clear time out
    Object.entries(VALUE[id]).map(([key, value]) => {
      if (key.includes("-timer")) setTimeout(() => clearTimeout(value), 1000)
      if (key.includes("-watch")) clearTimeout(value)
    })

    removeIds({VALUE, id})
    delete VALUE[id]
  })
}

module.exports = {update, removeIds}
