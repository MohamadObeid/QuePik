const searchBox = {
    type: 'View',
    style: {
        flex: '1',
        margin: '0 1rem',
        height: '4.5rem',
    },
    children: [{
        type: 'View?class=overlay;id=search-mini-page-overlay',
        style: {
            zIndex: '-1',
            transition: '0.2s',
            display: 'none',
            after: {
                opacity: '1::50',
                display: 'flex'
            }
        },
        controls: [{
            event: 'click',
            actions: [
                'resetStyles???search-mini-page;search-mini-page-results',
                'setStyle?style.opacity=0;style.display=none::250'
            ],
        }]
    }, {
        type: 'View?id=search-mini-page',
        style: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f0f0f0',
            borderRadius: '.75rem',
            flex: '1',
            top: '1rem',
            position: 'initial::210',
            width: '60rem',
            after: {
                backgroundColor: '#fff',
                boxShadow: '0 0 6px rgba(33, 33, 33, 0.431)',
                position: 'absolute',
                width: '60rem',
            }
        },
        children: [{
            type: 'View?class=flex-box',
            style: {
                flex: '1',
                borderRadius: '.75rem',
                height: '4.5rem',
                justifyContent: 'flex-start',
            },
            children: [{
                type: 'Icon?icon.name=search',
                style: {
                    margin: '0 1rem',
                    color: '#888',
                    fontSize: '1.8rem',
                }
            }, {
                type: 'Input?placeholder=Search for product, category, brand...',
                style: {
                    flex: '1',
                    height: '4.5rem',
                    backgroundColor: 'inherit',
                    border: '0',
                    color: '#444',
                    fontSize: '1.4rem',
                    outline: 'none',
                },
                controls: [{
                    event: 'focusin',
                    actions: 'mountAfterStyles???search-mini-page-overlay;search-mini-page;search-mini-page-results'
                }, {
                    event: 'input',
                    actions: 'search?query.collection=all;query.name=input||query.nameEn=input;state=search-input?value.input'
                }]
            }]
        }, {
            type: 'View?id=search-mini-page-results',
            style: {
                width: '100%',
                padding: '0 1rem',
                transition: '.2s',
                height: '0',
                after: {
                    height: '15rem',
                }
            },
            children: [{
                type: 'Text?class=divider;style.margin=0'
            }]
        }]
    }]
}

module.exports = {searchBox}