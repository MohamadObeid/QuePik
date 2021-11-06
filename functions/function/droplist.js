const {update} = require("./update");
const {clone} = require("./clone");
const {toValue} = require("./toValue");

const droplist = ({VALUE, STATE, id, e}) => {

  var local = VALUE[id]
  var dropList = VALUE["droplist"]
  var isInput = local.type === "Input" || local.type === "Textarea"
  var isButton = local.isButton
  var parent = VALUE[local.parent].parent

  // items
  var items = clone(local.droplist.items) || []
  dropList.derivations = clone(local.derivations)
  dropList.Data = local.Data
  
  // path & derivations
  if (local.droplist.path)
  dropList.derivations.push(...local.droplist.path.split("."))

  // input id
  var input_id
  if (local.lang || local.unit || local.currency || local.key || local.day || local.duration)
  input_id = VALUE[local.parent].element.previousSibling.id
  
  // items
  if (typeof items === "string")
  items = toValue({ VALUE, STATE, id, e, params: {value: items} })
  items = items.filter((item) => item !== undefined && item !== '')
  
  // children
  if (items.length > 0) {
    dropList.children = clone(items).map(item => {
      var readonly = false, input = false, droplist, itemList = []

      if (typeof item === "string" || typeof item === "boolean") {

        item = item.toString()
        item = item.split(">>")
        readonly = item[1] === "readonly"
        input = item[1] === "input"
        item = item[0]

      } else if (Array.isArray(item)) {
        
        itemList = clone(item)
        item = itemList.find((item) => !item.includes("readonly"))
        input = true
        droplist = true
      }

      if (input && !readonly) {
        return {
          type: `Input?featured;clearable;style.backgroundColor=#f0f0f0;${local.key ? `input.value=value.path::${input_id};edit=${parent};` : `input.value=${item || ''};`}${droplist ? `readonly;droplist.items=[${itemList}];droplist.positioner=${dropList.positioner};data=value.data()::${id}` : ""}`,
          controls: {
            event: `keyup?value.element.innerHTML::${id}=e.target.value||${local.key};value.Data().[value.derivations.join()._dot::${input_id}].delete();value.derivations::${input_id}=[value.derivations.!lastIndex().join()::${input_id},e.target.value||${local.key}];value.Data().[value.derivations.join()._dot::${input_id}]=value.element.value::${input_id};value.path::${input_id}=e.target.value||${local.key}?!${droplist};value.key::${id};value.path::${input_id}!=e.target.value`,
          },
        }
      }

      return {
        type: `Item?text.text=const.${item};readonly=${readonly}`,
        controls: [{
          event: `click?value.element.${isInput ? "value" : "innerHTML"}::${isButton ? `${id}-text` : id}=${item}<<!${local.droplist.disabled};action.resize::${id};value.data()=${item}<<${isButton}?!readonly;state.droplist=${id}`,
          actions: [
            `?value.data()=${item}?!value.lang::${id};!value.currency::${id};!value.day::${id};!value.duration::${id}`,
            // for lang & currency droplists
            `?value.data().${item}=value.data()::${input_id};value.data().delete()::${input_id};value.derivations::${input_id}=value.derivations.pull().[value.derivations.length().subs().1].push().${item}::${input_id}?const.${input_id};value.lang::${id}||value.currency::${id}||value.duration::${id}||value.day::${id};value.derivations.lastIndex()::${input_id}!=${item}`,
            `focus::${input_id}??const.${input_id}`,
          ]
        }]
      }
    })
  }

  dropList.positioner = id
  dropList.unDeriveData = true

  update({ VALUE, STATE, id: "droplist" })
}

module.exports = {droplist}
