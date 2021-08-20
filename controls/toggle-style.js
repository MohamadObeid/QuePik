module.exports = ({params}) => {
    return [{
        event: 'click',
        actions: `toggleStyles>>${params.id || 'value.id'}`
    }]
}