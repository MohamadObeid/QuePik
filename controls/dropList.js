const dropList = ({id, path, placement, distance}) => (
    [{
        event: `mouseenter`,
        actions: [
            `setState?state.drop-list-mouseenter;state.drop-list=${id || 'value.id'}`,
            `dropList>>drop-list?id=${id || 'value.id'}${path ? `;path=${path}` : ''}`,
            `setPosition?id=drop-list;placement=${placement || 'bottom'};distance=${distance}`,
            `mountAfterStyles::10>>drop-list`,
        ]
    }, {
        event: 'Input',
        actions: 'setState?state.drop-list-filter=value.input;state.drop-list-element=value.element'
    }, {
        event: 'mouseleave',
        actions: `setState?state.drop-list-mouseenter=false`
    }]
)

module.exports = {dropList}