module.exports = ({ VALUE, id }) => {
    var input_id = VALUE[id].type === 'Input' ? id : `${id}-input`
    return [{
        "event": `input::${input_id}?value.data()::${input_id}=value.element.value.toPrice().else().0::${input_id};value.element.value::${input_id}=value.data().else().0::${input_id}`
    }]
}