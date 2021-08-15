const dropList = {
    class: 'box-shadow',
    type: 'View?id=drop-list',
    style: {
        transform: 'scale(0.8)',
        opacity: '0',
        position: 'fixed',
        padding: '0.5rem',
        minWidth: '15rem',
        maxWidth: '20rem',
        maxHeight: '25rem',
        minHeight: '3rem',
        overflowY: 'auto',
        borderRadius: '0.5rem',
        backgroundColor: '#fff',
        transition: 'opacity 0.1s, transform 0.1s, max-height 0.2s, top 0.1s',
        pointerEvents: 'none',
        zIndex: '-1',
        after: {
            zIndex: '9999',
            transform: 'scale(1)',
            opacity: '1',
            pointerEvents: 'auto'
        }
    },
    controls: [{
        event: 'mouseover>>body',
        actions: `resetStyles::200??!mouseenter;!state.drop-list-mouseenter`
    }]
}

module.exports = {dropList}