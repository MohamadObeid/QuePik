const { generate } = require('./generate')
const { update } = require('./update')
const { filter } = require('./filter')
const { toObject } = require('./toObject')
const { clone } = require('./clone')

const droplist = ({ VALUE, STATE, params, id }) => {

    var local = VALUE[id]
    if (!local) return
    
    var dropList = VALUE['droplist'] // droplist

    // items
    var items = clone(local.droplist.items) || []
    dropList.derivations = clone(local.derivations)
    dropList.Data = local.Data

    // path
    if (params.path) dropList.derivations = params.path.split('.')

    // input components => focus
    var inputid
    if (local.lang || local.unit || local.currency)
        inputid = VALUE[local.parent].element.previousSibling.id

    // data related items
    var index = items.findIndex(item => item && item.split('.')[0] === 'Data' || item.split('.')[0] === 'data')
    if (index !== -1) {
        var k = generate()
        var editedItem = toObject({ VALUE, STATE, string: `${k}=${items[index]}`, id })[k]
        items.splice(index, 1)
        items.push(...editedItem)
    }
    
    items = items.filter(item => item)
    if (items.length > 0) dropList.children = items.map(item => {

        var readonly = false
        item = item.split('>>')
        if (item[1]) readonly = item[1].split(';').find(param => param === 'readonly')

        return {
            type: `Item?text=${item[0]};readonly=${readonly};data=${item[0]}`,
            controls: [{
                event: `click??!readonly;state.droplist=${id}`,
                actions: [
                    `setContent::${id};focus::${inputid}?content=${item[0]}`,
                    `setData::${inputid}?data=free?const.${item[0]}=free`,
                    `setData::${inputid}?data=''?const.${item[0]}!=free;value.data=free`
                ]
            }]
        }
    })
    
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