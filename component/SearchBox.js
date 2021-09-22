const { toComponent } = require("../method/toComponent")

const SearchBox = (component) => {

    component = toComponent(component)
    var { placeholder } = component

    return {
        ...component,
        type: 'View?style.flex=1;style.margin=0 1rem;style.height=4.5rem',
        children: [{
            type: 'View?class=overlay;id=search-mini-page-overlay;style.zIndex=-1;style.transition=.2s;style.display=none;style.after.opacity=1>>50;style.after.display=flex;style.after.zIndex=1',
            controls: [{
                event: 'click',
                actions: [
                    'resetStyles???search-mini-page;search-mini-page-results',
                    'setStyle?style.opacity=0;style.display=none>>250'
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
                position: 'initial>>210',
                width: '60rem',
                after: {
                    backgroundColor: '#fff',
                    boxShadow: '0 0 6px rgba(33, 33, 33, 0.431)',
                    position: 'absolute',
                    zIndex: '2'
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
                    type: 'Icon?icon.name=bi-search',
                    style: {
                        margin: '0 1rem',
                        color: '#888',
                        fontSize: '1.8rem',
                    }
                }, {
                    type: `Input?placeholder=${placeholder};input.type=text`,
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
                    }]
                }]
            }, {
                type: 'View?id=search-mini-page-results',
                style: {
                    width: '100%',
                    padding: '0 1rem',
                    transition: '.2s',
                    height: '0',
                    opacity: '0',
                    after: {
                        opacity: '1',
                        height: '15rem>>25',
                    }
                },
                children: [{
                    type: 'Text?class=divider;style.margin=0'
                }]
            }]
        }]
    }
}

module.exports = {SearchBox}