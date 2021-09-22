const { update } = require('./update')
const { clone } = require('./clone')
const { derive } = require('./derive')
const { toValue } = require('./toValue')
const { isPath } = require('./isPath')

const droplist = ({ VALUE, STATE, id, e }) => {

    var local = VALUE[id]
    if (!local) return
    
    var dropList = VALUE['droplist']
    var isInput = local.type === 'Input' || local.type === 'Textarea'

    // items
    var items = clone(local.droplist.items) || []
    dropList.derivations = clone(local.derivations)
    dropList.Data = local.Data
    
    // path
    if (local.droplist.path) dropList.derivations.push(...local.droplist.path.split('.'))

    // input id
    var input_id
    if (local.lang || local.unit || local.currency || local.key) 
    input_id = VALUE[local.parent].element.previousSibling.id
    
    // dynamic items
    if (typeof items === 'string') items = items.split(',')
    items = items.map(item => {

        if (typeof item === 'string' && isPath({ params: { path: item } })) 
            return toValue({ VALUE, STATE, id, params: { value: item }, e })

        return item
    })

    // filter undefinds
    items = items.filter(item => item)

    // flat
    if (local.droplist['flat()']) items = items.flat()

    var parent = VALUE[local.parent].parent
    
    if (items.length > 0) dropList.children = clone(items).map(item => {
        
        var readonly = false, input = false, droplist
        if (typeof item === 'string') {

            item = item.split('>>')
            readonly = item[1] === 'readonly'
            input = item[1] === 'input'
            item = item[0]

        } else if (Array.isArray(item)) {
            
            input = true
            droplist = true
        }
        
        if (input && !readonly) {
            return {
                type: `Input?featured;clearable;style.backgroundColor=#f0f0f0;${local.key ? `input.value=value.path::${input_id};edit=${parent};` : `input.value=${item};`}${droplist ? `readonly;droplist.items=[${item}];droplist.positioner=${dropList.positioner};data=${derive(STATE[local.Data], local.derivations)[0]};` : ''}`,
                controls: [{
                    event: `keyup?value.element.innerHTML::${id}=e.target.value||${local.key};state[value.Data][value.derivations::${input_id}].delete();value.derivations::${input_id}=[${input_id && VALUE[input_id].derivations.slice(0, -1).join(',')},e.target.value||${local.key}];state[value.Data][value.derivations::${input_id}]=value.element.value::${input_id};value.path::${input_id}=e.target.value||${local.key}?!${droplist};value.key::${id};value.path::${input_id}!=e.target.value`
                }]
            }
        }

        return {
            type: `Item?text=${item};readonly=${readonly}`,
            controls: [{
                event: `click?value.element.${isInput ? 'value' : 'innerHTML'}::${id}=${item};value.data::${id}=${item};state[value.Data][value.derivations]<<!const.${local.lang}=${item};action.resize::${id}?!readonly;state.droplist=${id}`,
                actions: [

                    // for lang & currency droplists
                    `setData;focus::${input_id}?data.path=${item};data.value=value.data()::${input_id};state[value.Data][value.derivations::${input_id}].delete();value.derivations::${input_id}=[${input_id && VALUE[input_id].derivations.slice(0, -1).join(',')},${item}];value.path::${input_id}=${item}?const.${input_id};value.lang::${id}||value.currency::${id};value.path::${input_id}!=${item}`,

                    // data = free
                    `setData::${input_id}?data.value=free?${input_id};const.${item}=free`,
                    `setData::${input_id}?data.value=''?${input_id};const.${item}!=free;value.data=free`,
                    
                    `focus::${input_id}`,
                ]
            }]
        }
    })

    dropList.positioner = id
    dropList.turnoff = true
    
    update({ VALUE, STATE, id: 'droplist' })
}

module.exports = {droplist}