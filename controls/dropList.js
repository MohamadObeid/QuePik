module.exports = ({ params, id }) => {

    return [{
        event: `click`,
        actions: [
            `setState?state.droplist-mouseenter;state.droplist=${params.id || id}`,
            `setPosition?id=droplist;placement=${params.placement || 'bottom'};distance=${params.distance}`,
            `droplist>>${params.id || id}?${params.path ? `;path=${params.path}` : ''}`,
            `mountAfterStyles::10>>droplist`,
        ]
    }, {
        event: 'Input',
        actions: 'setState?state.droplist-filter=value.input;state.droplist-element=value.element'
    }, {
        event: 'mouseleave',
        actions: `setState?state.droplist-mouseenter=false`
    }]
}