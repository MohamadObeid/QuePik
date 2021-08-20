module.exports = ({params}) => (
    [{
        event: 'click',
        actions: [
            `setValue;createView?value.Data=value.data;view=${params.view}??mini-window-view`,
            `setStyle?style.display=flex;style.opacity=1::25??mini-window`
        ]
    }]
)