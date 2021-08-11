const windowView = (params) => (
    [{
        event: 'click',
        actions: [
            `setValue;createView?value.DATA=value.DATA;view=${params.view}??window-view`,
            `setStyle?style.display=flex;style.opacity=1::25??sub-window`
        ]
    }]
)

module.exports = {windowView}