module.exports = ({ VALUE, params, id }) => {
    
    return [{
        event: `click??global.${params.id}.view!=${params.view}`,
        actions: [
            `resetStyles;mountAfterStyles::400???global.${params.id}.parent.id`,
            `setValue;createView::250?value.Data=value.data;view=${params.view}??${params.id}`,
        ]
    }]
}