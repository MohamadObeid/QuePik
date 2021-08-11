const { generate } = require('./generate')
const { update } = require('./update')
const { filter } = require('./filter')
const { toObject } = require('./toObject')
const { clone } = require('./clone')

const dropList = ({ VALUE, STATE, params, id }) => {
    
    var local = VALUE[id] // drop-list
    if (!local) return

    // button or input or text...
    var button = clone(VALUE[params.id]) 

    // items
    var items = clone(button.dropList.items) || []
    local.derivations = clone(button.derivations)
    local.DATA = button.DATA

    // path
    if (params.path) local.derivations = params.path.split('.')

    // input components => focus
    var inputid
    if (button.id.includes('-language') || button.id.includes('-unit') || button.id.includes('-currency')) {

        inputid = button.id.split('-language')
        if (inputid[1] === undefined) inputid = button.id.split('-unit')
        if (inputid[1] === undefined) inputid = button.id.split('-currency')

        inputid = inputid[0] + '-input'
    }

    // data related items
    var index = items.findIndex(item => item && item.split('.')[0] === 'DATA' || item.split('.')[0] === 'data')
    if (index !== -1) {
        var k = generate()
        var editedItem = toObject({ VALUE, STATE, string: `${k}=${items[index]}`, id: button.id })[k]
        items.splice(index, 1)
        items.push(...editedItem)
    }
    
    items = items.filter(item => item)
    if (items.length > 0) local.children = items.map(item => {

        var readOnly = false
        item = item.split(':')
        if (item[1]) readOnly = item[1].split(';').find(param => param === 'readOnly')

        return {
            type: `Item?text=${item[0]};readOnly=${readOnly};data=${item[0]}`,
            controls: [{
                event: `click??!readOnly;state.drop-list=${button.id}`,
                actions: [
                    `setContent>>${button.id};focus>>${inputid}?content=${item[0]}`,
                    //`update::50>>${button.id}`,
                    `setData>>${inputid}?data=free?const.${item[0]}=free`,
                    `setData>>${inputid}?data=''?const.${item[0]}!=free;value.data=free`
                ]
            }]
        }
    })
    
    local.turnOff = true
    update({ VALUE, STATE, id })
    
    if (local.filterable) {
        // get input value for filter
        var value = button.value

        if (!value) {
            value = button.getElementsByTagName('INPUT')[0]
            if (value) value = value.value
        }

        if (value) filter({ VALUE, STATE, params: { value }, id })
    }
}

module.exports = {dropList}