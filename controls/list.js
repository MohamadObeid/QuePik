const list = ({id, placement, distance}) => (
    [{
        event: `mouseenter`,
        actions: [
            `setState?state.${id}-mouseenter`,
            `mountAfterStyles>>${id}`,
            `setPosition?placement=${placement || 'right'};distance=${distance || '15'};id=${id}`,
        ]
    }, {
        event: 'mouseleave',
        actions: [
            `resetStyles::200>>${id}??!mouseenter;!mouseenter>>${id};!state.${id}-mouseenter`,
            `setState?state.${id}-mouseenter=false`
        ]
    }]
)

module.exports = {list}