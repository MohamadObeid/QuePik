const { update } = require('./update')
const { filter } = require('./filter')
const { clone } = require('./clone')
const { derive } = require('./derive')

const droplist = ({ VALUE, STATE, id }) => {

    var local = VALUE[id]
    if (!local) return
    
    var dropList = VALUE['droplist']

    // items
    var items = clone(local.droplist.items) || []
    dropList.derivations = clone(local.derivations)
    dropList.Data = local.Data
    
    // path
    if (local.droplist.path) dropList.derivations.push(...local.droplist.path.split('.'))

    // input components => focus
    var input_id
    if (local.lang || local.unit || local.currency || local.key) input_id = VALUE[local.parent].element.previousSibling.id
    
    items = items.filter(item => item)
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
                type: `Input?${droplist ? `featured;readonly;droplist.items=[${item}];droplist.positioner=${dropList.positioner};data=${derive(STATE[dropList.Data], dropList.derivations)[0]}` : `input.value=${item}`};style.backgroundColor=#f0f0f0`,
                controls: [!droplist ? {
                    event: `keyup?value.element.innerHTML::${id}=e.target.value||${local.key};state[value.Data][value.derivations::${input_id}].delete;value.derivations::${input_id}=[${VALUE[input_id].derivations.slice(0, -1).join(',')},e.target.value||${local.key}];state[value.Data][value.derivations::${input_id}]=value.element.value::${input_id};value.path::${input_id}=e.target.value||${local.key}?value.key::${id};value.path::${input_id}!=e.target.value`
                }: {}]
            }
        }

        return {
            type: `Item?text=${item};readonly=${readonly}`,
            controls: [{
                event: `click?value.element.${local.type === 'Input' ? 'value' : 'innerHTML'}::${id}=${item};state[value.Data][value.derivations]<<!const.${local.lang}=${item}?!readonly;state.droplist=${id}`,
                actions: [

                    // for lang droplist                // setData for new lang                    // delete last lang value from main Data                         // reset derivations for input                                                              // reset path for input                                 // if input lang is different from new lang
                    `setData;focus::${input_id}?data.path=${item};data.value=value.data::${input_id};state[value.Data][value.derivations::${input_id}].delete;value.derivations::${input_id}=[${input_id && VALUE[input_id].derivations.slice(0, -1).join(',')},${item}];value.path::${input_id}=${item}?const.${input_id};value.lang::${id};value.path::${input_id}!=${item}`,

                    // data = free
                    `setData::${input_id}?data.value=free?const.${item}=free`,
                    `setData::${input_id}?data.value=''?const.${item}!=free;value.data=free`,
                    
                    `focus::${input_id}`,
                ]
            }]
        }
    })
    
    dropList.positioner = id
    dropList.turnOff = true
    update({ VALUE, STATE, id: 'droplist' })

    
    if (dropList.filterable) {
        // get input value for filter
        var value = local.element.value

        if (!value) {
            value = local.getElementsByTagName('INPUT')[0]
            if (value) value = value.value
        }

        if (value) filter({ VALUE, STATE, params: { value }, id: 'droplist' })
    }
}

module.exports = {droplist}