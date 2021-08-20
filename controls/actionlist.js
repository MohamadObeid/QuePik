module.exports = ({ params = {}, id }) => {

    return [{
        event: `click`,
        actions: [
            `setState?state.actionlist-mouseenter;state.actionlist=${params.id || id}`,
            `setPosition?id=actionlist;placement=${params.placement || 'left'};distance=${params.distance}`,
            `actionlist>>${params.id || id}?${params.path ? `;path=${params.path}` : ''}`,
            `mountAfterStyles::10>>actionlist`,
        ]
    }, {
        event: 'mouseleave',
        actions: [
            `setState?state.actionlist-mouseenter=false`,
            `resetStyles::200>>actionlist??!mouseenter;!mouseenter>>actionlist;!state.actionlist-mouseenter`
        ]
    }]
}