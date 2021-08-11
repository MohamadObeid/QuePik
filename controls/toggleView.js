const toggleView = ({id, view}) => ([
    {
        event: `click??global.${id}.view!=${view}`,
        actions: [
            `resetStyles;mountAfterStyles::400???global.${id}.parent.id`,
            `createView::250>>${id}?view=${view}`,
        ]
    }
])

module.exports = {toggleView}