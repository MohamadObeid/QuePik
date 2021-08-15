const adminNavbar = {
    type: 'View',
    style: {
        zIndex: '2',
        width: '100%',
        position: 'sticky',
        top: '0',
        backgroundColor: '#fff',
        boxShadow: '0 0 6px rgba(33, 33, 33, 0.431)',
    },
    children: [{
        type: 'View?class=flex-box',
        style: {
            backgroundColor: '#fff',
            padding: '1rem'
        },
        children: [{
            type: 'Text?link=/;text=digiMatjar',
            style: {
                fontSize: '2.9rem',
                fontWeight: '900',
                color: '#ee384e',
                margin: '0 1rem',
                cursor: 'pointer'
            },
        }, {
            view: 'searchBox'
        }, {
            type: 'View?class=flex-box',
            style: {
                borderLeft: '1px solid #ddd',
                borderRight: '1px solid #ddd',
                marginRight: '0.5rem',
                padding: '0 1rem',
                height: '3.5rem'
            },
            children: [{
                type: 'Text?text=My sites: ',
                style: {
                    fontSize: '1.3rem',
                    color: '#bbb',
                    marginRight: '0.5rem',
                },
            }, {
                type: 'View?class=flex-box',
                style: {
                    cursor: 'pointer',
                    padding: '0.5rem 0'
                },
                controls: [{
                    event: 'click',
                    actions: 'toggleStyles???my-sites-chevron'
                }],
                children: [{
                    type: 'Text?text=Sarah Originals',
                    style: {
                        fontSize: '1.5rem',
                        color: '#444',
                        margin: '0 0.5rem',
                    },
                }, {
                    type: 'Icon?id=my-sites-chevron;icon.name=chevron-down;icon.code=fas',
                    style: {
                        color: '#444',
                        fontSize: '1.5rem',
                        transition: 'all 0.2s',
                        margin: '0 0.5rem',
                        marginTop: '0.2rem',
                        after: {
                            transform: 'rotate(180deg)'
                        }
                    }
                }]
            }]
        }, {
            type: 'Icon?tooltip=Notifications;icon.name=bell',
            style: {
                color: '#666',
                fontSize: '1.7rem',
                margin: '0 2rem',
                cursor: 'pointer',
                after: {
                    color: '#116dff'
                }
            },
            controls: [{
                event: 'mouseenter',
                actions: 'mountAfterStyles'
            }, {
                event: 'mouseleave',
                actions: 'resetStyles'
            }]
        }, {
            type: 'Icon?icon.name=megaphone;tooltip=New Releases',
            style: {
                color: '#666',
                fontSize: '1.7rem',
                marginRight: '2rem',
                cursor: 'pointer',
                after: {
                    color: '#116dff'
                }
            },
            controls: [{
                event: 'mouseenter',
                actions: 'mountAfterStyles'
            }, {
                event: 'mouseleave',
                actions: 'resetStyles'
            }]
        }, {
            type: 'Icon?icon.name=box;tooltip=Plans & Pricing',
            style: {
                color: '#666',
                fontSize: '1.7rem',
                marginRight: '2rem',
                cursor: 'pointer',
                after: {
                    color: '#116dff'
                }
            },
            controls: [{
                event: 'mouseenter',
                actions: 'mountAfterStyles'
            }, {
                event: 'mouseleave',
                actions: 'resetStyles'
            }]
        }, {
            type: 'Button?link=/signin;text=Sign In | Up;icon.name=person-circle;icon.style.fontSize=2.4rem;tooltip=Free Sign Up',
        }]
    }]
}

module.exports = {adminNavbar}