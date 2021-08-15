const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Item = (component) => {

    component = toComponent(component)
    var { model, state, props, style, icon, text, tooltip, chevron, controls } = component

    props.borderMarker = props.borderMarker !== undefined ? props.borderMarker : true
    component.readOnly = component.readOnly !== undefined ? component.readOnly : false

    var id = component.id || generate()

    if (model === 'featured')
        return {
            ...component,
            class: `flex-box`,
            type: 'View',
            tooltip,
            props,
            style: {
                position: 'relative',
                justifyContent: 'flex-start',
                width: '100%',
                height: '4rem',
                cursor: 'pointer',
                pointerEvents: 'fill',
                marginRight: '1px',
                marginLeft: '1px',
                marginBottom: '1px',
                borderRadius: '0.5rem',
                ...style,
                after: {
                    border: '1px solid #ee384e',
                    marginRight: '0',
                    marginLeft: '0',
                    marginBottom: '1px',
                    ...style.after,
                },
            },
            children: [{
                type: `Icon?icon.name=${icon.name};icon.code=${icon.code};id=${id}-icon?const.${icon.name}`,
                style: {
                    width: '4rem',
                    color: style.color || '#444',
                    fontSize: '1.8rem',
                    ...icon.style,
                    after: {
                        color: style.after.color || '#ee384e',
                        ...icon.style.after,
                    },
                }
            }, {
                type: `Text?text=${text};id=${id}-text`,
                style: {
                    fontSize: style.fontSize || '1.4rem',
                    color: style.color || '#444',
                    userSelect: 'none',
                    after: {
                        color: style.after.color || '#ee384e',
                        fontSize: style.after.fontSize || style.fontSize || '1.4rem',
                    }
                },
            }, {
                type: `Icon?icon.name=chevron-right;icon.code=fas;id=${id}-chevron`,
                style: {
                    display: 'flex',
                    position: 'absolute',
                    right: '1.2rem',
                    fontSize: style.fontSize || '1.3rem',
                    color: style.color || '#666',
                    transition: '0.2s',
                    ...chevron.style,
                    after: {
                        right: '0.8rem',
                        color: style.after.color || '#ee384e',
                        ...chevron.style.after,
                    }
                }
            }],
            controls: [...controls,
            {
                actions: [
                    `mountAfterStyles??mountOnLoad?${id};${id}-icon;${id}-text;${id}-chevron`,
                    `setState?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron]?mountOnLoad`,
                ]
            }, {
                event: `click??state.${state}=undefined||state.${state}.0!=${id}`,
                actions: `createActions?type=item;id=${id};state=${state}`
            }, {
                event: 'mouseenter',
                actions: `mountAfterStyles???${id};${id}-icon;${id}-text;${id}-chevron`
            }, {
                event: 'mouseleave',
                actions: `resetStyles??!mountOnLoad?${id};${id}-icon;${id}-text;${id}-chevron`
            }]
        }

    if (model === 'classic')
        return {
            ...component,
            class: `flex-box`,
            type: 'View',
            tooltip,
            style: {
                position: 'relative',
                justifyContent: 'flex-start',
                width: '100%',
                minHeight: '3.3rem',
                cursor: !component.readOnly ? 'pointer' : 'initial',
                marginBottom: '1px',
                borderRadius: '0.5rem',
                padding: '0.9rem',
                borderBottom: !component.readOnly ? 'initial' : '1px solid #eee',
                pointerEvents: 'fill',
                ...style,
                after: component.readOnly ? {} : {
                    backgroundColor: '#eee',
                    ...style.after,
                },
            },
            children: [{
                class: 'side-bar-home-icon',
                type: `Icon?icon.name=${icon.name};icon.code=${icon.code};id=${id}-icon?const.${icon.name}`,
                style: {
                    display: icon ? 'flex' : 'none',
                    color: !component.readOnly ? style.color || '#444' : '#333',
                    fontSize: !component.readOnly ? style.fontSize || '1.4rem' : '1.6rem',
                    fontWeight: !component.readOnly ? 'initial' : 'bolder',
                    marginRight: '1rem',
                    ...icon.style,
                    after: {
                        color: style.after.color || style.color || '#444'
                    }
                }
            }, {
                type: `Text?text=${text};id=${id}-text`,
                style: {
                    fontSize: style.fontSize || '1.4rem',
                    color: !component.readOnly ? style.color || '#444' : '#333',
                    fontWeight: !component.readOnly ? 'initial' : 'bolder',
                    userSelect: 'none',
                    textAlign: 'left',
                    after: {
                        color: style.after.color || style.color || '#444'
                    }
                },
            }],
            controls: [...controls, {
                event: 'mouseenter',
                actions: `mountAfterStyles???${id};${id}-icon;${id}-text`
            }, {
                event: 'mouseleave',
                actions: `resetStyles??!mountOnLoad?${id};${id}-icon;${id}-text`
            }, {
                // on item click
                event: `click??!readOnly`,
                actions: `setData;setState?data=${text};state.${state}=${id}?!duplicates`,
            }]
        }
}

module.exports = {Item}