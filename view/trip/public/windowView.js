const windowView = {
    type: 'View?id=mini-window;class=flex-box',
    style: {
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'none',
        height: '100%',
        width: '100%',
        backgroundColor: '#00000050',
        opacity: '0',
        transition: 'opacity 0.2s',
        zIndex: '999'
    },
    children: [{
        type: 'View?style.height=70%;style.width=60%;style.overflowY=auto;style.borderRadius=.5rem;style.backgroundColor=#fff',
        children: { type: 'View?id=window-view' },
        controls: [{
            event: 'mouseenter',
            actions: 'setState?state.hide-window-view'
        }, {
            event: 'mouseleave',
            actions: 'setState?state.hide-window-view=false'
        }]
    }],
    controls: [{
        event: 'click',
        actions: 'setStyle?style.display=none::200;style.opacity=0?!state.hide-window-view'
    }]
}

module.exports = {windowView}