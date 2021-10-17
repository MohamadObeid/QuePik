const {update} = require("./update");
const {clone} = require("./clone");
const {toValue} = require("./toValue");

const droplist = ({VALUE, STATE, id, e}) => {
  const local = VALUE[id]
  if (!local) return

  const dropList = VALUE["droplist"]
  const isInput = local.type === "Input" || local.type === "Textarea"
  const parent = VALUE[local.parent].parent

  // items
  var items = clone(local.droplist.items) || []
  dropList.derivations = clone(local.derivations)
  dropList.Data = local.Data

  // path & derivations
  if (local.droplist.path)
  dropList.derivations.push(...local.droplist.path.split("."))

  // input id
  var input_id
  if (local.lang || local.unit || local.currency || local.key || local.day)
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
            event: `keyup?value.element.innerHTML::${id}=e.target.value||${local.key};value.Data().[value.derivations.join()._dot::${input_id}].devare();value.derivations::${input_id}=[value.derivations.!lastIndex().join()::${input_id},e.target.value||${local.key}];value.Data().[value.derivations.join()._dot::${input_id}]=value.element.value::${input_id};value.path::${input_id}=e.target.value||${local.key}?!${droplist};value.key::${id};value.path::${input_id}!=e.target.value`,
          },
        }
      }

      return {
        type: `Item?text=const.${item};readonly=${readonly}`,
        controls: [{
          event: `click?value.element.${isInput ? "value" : "innerHTML"}::${id}=${item}<<!${local.droplist.pause};value.data()<<!const.${local.lang}=${item};action.resize::${id}?!readonly;state.droplist=${id}`,
          actions: [
            // for lang & currency droplists
            `?value.data().${item}=value.data()::${input_id};value.Data().[value.derivations::${input_id}].devare();value.derivations::${input_id}=[${input_id && VALUE[input_id].derivations.slice(0, -1).join(",")},${item}];value.path::${input_id}=${item}?const.${input_id};value.lang::${id}||value.currency::${id}||value.day::${id};value.path::${input_id}!=${item}`,
            `focus::${input_id}`,
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
