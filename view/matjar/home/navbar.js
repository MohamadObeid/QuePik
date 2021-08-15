const navbar = {
    type: 'View?class=nav-bar',
    style: {
        zIndex: '2',
        width: '100%',
        position: 'sticky',
        top: '0',
        backgroundColor: '#fff',
        boxShadow: '0 0 6px rgba(33, 33, 33, 0.431)',
    },
    children: [{
        type: 'View?class=main-nav-bar flex-box',
        style: {
            backgroundColor: '#fff',
            padding: '1rem',
        },
        children: [{
            type: 'Text?link=/;text=digiMatjar;class=nav-bar-logo',
            style: {
                fontSize: '2.9rem',
                fontWeight: '900',
                color: '#ee384e',
                margin: '0 1rem',
                cursor: 'pointer'
            }
        }, {
            view: 'searchBox'
        }, {
            type: 'Button?link=/signin;text=Sign In | Up;icon.name=person-circle;icon.style.fontSize=2.4rem;tooltip=Free Sign Up',
        }, {
            type: 'Text?class=vertical-stroke-nav-bar',
            style: {
                backgroundColor: '#e0e0e0',
                height: '2.5rem',
                width: '1px',
                margin: '0 0.8rem'
            }
        }, {
            type: 'Icon?link=/cart;icon.name=cart3;tooltip=Cart Quick View',
            style: {
                color: '#666',
                fontSize: '2.4rem',
                margin: '0 1rem',
                cursor: 'pointer'
            }
        }]
    }]
}

module.exports={navbar}