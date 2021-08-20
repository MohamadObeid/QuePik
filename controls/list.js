module.exports = ({ VALUE, STATE, params, id }) => {
    
    return [{
        event: `click`,
        actions: [
            `setState?state.${params.id}-mouseenter`,
            `mountAfterStyles>>${params.id}`,
            `setPosition?placement=${params.placement || 'right'};distance=${params.distance || '15'};id=${params.id}`,
        ]
    }, {
        event: 'mouseleave',
        actions: [
            `resetStyles::200>>${params.id}??!mouseenter;!mouseenter>>${params.id};!state.${params.id}-mouseenter`,
            `setState?state.${params.id}-mouseenter=false`
        ]
    }]
}