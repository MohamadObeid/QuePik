const admin = {
    type: 'View',
    style: {
        display: 'flex',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
    },
    controls: [{
        actions: [
            'search?state=category-list;query.collection=category',
            'search?state=brand-list;query.collection=brand'
        ]
    }],
    children: [{
        view: 'adminSidebar',
    }, {
        type: 'View',
        style: {
            width: '83%',
            height: '90%',
            overflowY: 'auto',
            marginLeft: '17%',
            padding: '2.5rem 3rem',
            flexDirection: 'column',
            transform: 'translateY(-110%)',
            position: 'fixed',
            after: {
                transform: 'translateY(0)',
            }
        },
        children: [{
            type: 'View?id=admin-view',
        }],
        controls: [{
            actions: 'setStyle?style.transition=transform 0.2s'
        }]
    }]
}

module.exports = {admin}