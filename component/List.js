const { toComponent } = require("../method/toComponent")

const List = (component) => {

    component = toComponent(component)
    var { id, model, props, style, children, controls } = component

    props.placement = props.placement || ''
    props.distance = props.distance || '15'
    
    if (model === 'featured')
        return {
            ...component,
            class: `list flex-box`,
            type: 'View',
            style: {
                flexDirection: 'column',
                alignItem: 'flex-start',
                backgroundColor: '#333',
                padding: '1rem',
                borderRadius: '0.5rem',
                position: 'fixed',
                opacity: '0',
                transform: 'translateY(-100%)',
                transition: 'transform 0.2s, opacity 0.1s, top 0.1s',
                minWidth: '18rem',
                pointerEvents: 'none',
                zIndex: '2',
                ...style,
                after: {
                    pointerEvents: 'auto',
                    opacity: '1',
                    transform: 'translateY(0)',
                    ...style.after
                },
            },
            props,
            children: [...children,
            {
                class: `list-fin`,
                type: 'Text',
                style: {
                    position: 'absolute',
                    backgroundColor: '#333',
                    width: '1rem',
                    height: '1rem',
                    transform: 'rotate(45deg)',
                    borderRadius: '0 0 0 0.4rem',
                }
            }],
            controls: [...controls,
            {
                event: 'mouseleave',
                actions: 'resetStyles'
            }]
        }

    else if (model === 'classic')
        return {
            ...component,
            class: `box-shadow list flex-box`,
            type: 'View',
            style: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: '#fff',
                borderRadius: '0.5rem',
                position: 'fixed',
                opacity: '0',
                transform: 'translateY(-100%)',
                transition: 'transform 0.2s, opacity 0.1s, top 0.1s',
                minWidth: '18rem',
                pointerEvents: 'none',
                zIndex: '-1',
                ...style,
                after: {
                    opacity: '1',
                    pointerEvents: 'auto',
                    transform: 'translateY(0)',
                    zIndex: '2'
                }
            },
            children: [{
                type: 'View',
                style: {
                    height: '100%',
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#fff',
                    borderRadius: '0.5rem',
                    zIndex: '1'
                },
                children,
            }, {
                class: 'box-shadow list-fin',
                type: 'Text',
                style: {
                    position: 'absolute',
                    backgroundColor: '#fff',
                    width: '1rem',
                    height: '1rem',
                    transform: 'rotate(45deg)',
                    borderRadius: '0 0 0 0.4rem',
                    transition: 'top 0.1s',
                    zIndex: '0'
                }
            }],
            controls: [...controls,
            {
                event: 'mouseleave',
                actions: `resetStyles::200??!mouseenter;!state.${id}-mouseenter`
            }]
        }
}

module.exports = {List}