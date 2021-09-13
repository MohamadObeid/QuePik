const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Item = (component) => {

    component.icon = component.icon || {}
    component.chevron = component.chevron || {}
    component = toComponent(component)
    var { model, state, style, icon, text, tooltip, chevron, controls } = component

    component.borderMarker = component.borderMarker !== undefined ? component.borderMarker : true
    component.readonly = component.readonly !== undefined ? component.readonly : false

    var id = component.id || generate()

    if (model === 'featured')
        return {
            ...component,
            class: 'flex-box item',
            type: 'View',
            tooltip,
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
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                icon,
                style: {
                    width: '4rem',
                    color: style.color || '#444',
                    fontSize: '1.8rem',
                    ...(icon.style || {}),
                    after: {
                        color: style.after.color || '#ee384e',
                        ...(icon.style && icon.style.after || {})
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
                    ...(chevron.style || {}),
                    after: {
                        right: '0.8rem',
                        color: '#ee384e',
                        ...(chevron.style && chevron.style.after || {})
                    }
                }
            }],
            controls: [...controls,
            {
                actions: `mountAfterStyles?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron]?mountOnLoad?state.${state}`
            }, {
                event: `click??state.${state}=undefined||state.${state}.0!=${id}`,
                actions: [
                    `setData?data.value=value.text`,
                    `resetStyles?value.mountOnLoad::state.${state}.0=false??state.${state}`,
                    `mountAfterStyles?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron];value.mountOnLoad::state.${state}.0??state.${state}`,
                ]
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
            class: 'flex-box item',
            type: 'View',
            tooltip,
            style: {
                position: 'relative',
                justifyContent: 'flex-start',
                width: '100%',
                minHeight: '3.3rem',
                cursor: !component.readonly ? 'pointer' : 'initial',
                marginBottom: '1px',
                borderRadius: '0.5rem',
                padding: '0.9rem',
                borderBottom: !component.readonly ? 'initial' : '1px solid #eee',
                pointerEvents: 'fill',
                ...style,
                after: component.readonly ? {} : {
                    backgroundColor: '#eee',
                    ...style.after,
                },
            },
            children: [{
                icon,
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                style: {
                    display: icon ? 'flex' : 'none',
                    color: !component.readonly ? style.color || '#444' : '#333',
                    fontSize: !component.readonly ? style.fontSize || '1.4rem' : '1.6rem',
                    fontWeight: !component.readonly ? 'initial' : 'bolder',
                    marginRight: '1rem',
                    ...(icon.style || {}),
                    after: {
                        color: '#444',
                        ...(icon.style && icon.style.after || {}),
                    }
                }
            }, {
                type: `Text?text=${text};id=${id}-text`,
                style: {
                    fontSize: style.fontSize || '1.4rem',
                    color: !component.readonly ? style.color || '#444' : '#333',
                    fontWeight: !component.readonly ? 'initial' : 'bolder',
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
            }]
        }
}

module.exports = {Item}