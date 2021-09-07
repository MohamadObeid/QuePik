const { toString } = require('../method/toString')
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Input = (component) => {

    if (component.templated) return component

    // icon
    component.icon = component.icon || {}

    // input
    component.input = component.input || { type: 'text'}
    component.input.type = component.input.type || 'text'
    component.input.value = component.input.value || ''
    component.input.style = component.input.style || {}

    component = toComponent(component)
    var { id, input, model, droplist, readonly, style, controls, icon, 
        placeholder, textarea, filterable, clearable, removable, 
        duplicatable, lang, unit, currency, google, key } = component

    clearable = clearable !== undefined ? clearable : true
    removable = removable !== undefined ? removable : true
    duplicatable = duplicatable !== undefined ? duplicatable : true
    
    if (model === 'classic') {
        return {
            ...component,
            style: {
                width: '100%',
                border: '0',
                padding: '0.5rem',
                color: '#444',
                backgroundColor: '#fff',
                height: '4rem',
                borderRadius: '0.25rem',
                fontSize: '1.4rem',
                ...input.style,
                ...style,
            },
            controls: [...controls,
            {
                event: 'mouseenter??overflow',
                actions: 'showTooltip?tooltip=value.data;placement=top?value.data',
            }, {
                event: 'mouseleave',
                actions: 'hideTooltip',
            }]
        }
    }
    
    if (model === 'featured') {

        return {
            ...component,
            id,
            type: 'View',
            class: 'flex-box',
            droplist: undefined,
            style: {
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '100%',
                position: 'relative',
                backgroundColor: '#fff',
                height: '4rem',
                borderRadius: '0.25rem',
                border: '0',
                ...style,
            },
            children: [{
                icon,
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                style: {
                    color: '#444',
                    fontSize: '1.6rem',
                    marginLeft: '1rem',
                    marginRight: '.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    ...(icon.style || {})
                }
            }, {
                type: `Input?id=${id}-input;${unit ? `path=amount` :  currency ? `path=${currency}` : lang ? `path=${lang}` : google ? `path=name` : key ? `path=${key}` : ''}`,
                input,
                textarea,
                readonly,
                droplist,
                filterable,
                placeholder,
                templated: true,
                'placeholder-ar': component['placeholer-ar'],
                style: {
                    width: '100%',
                    height: '100%',
                    borderRadius: style.borderRadius || '0.25rem',
                    backgroundColor: style.backgroundColor || '#fff',
                    fontSize: style.fontSize || '1.4rem',
                    minWidth: style.minWidth || 'initial',
                    border: '0',
                    padding: '0.5rem',
                    color: '#444',
                    transition: 'width 0.2s',
                    outline: 'none',
                    ...input.style
                },
                controls: [...controls, {
                    actions: 'resizeInput'
                }, {
                    event: `keyup??value.data;e.key=Enter;${duplicatable};${removable}`,
                    actions: `duplicate::${id}??!value.key::${id}||value.key::${id}!=value.path`
                }, {
                    event: `input??value.data=free`,
                    actions: `setValue?value.element.value=''`
                }, {
                    event: 'mouseenter??overflow',
                    actions: 'showTooltip?tooltip=value.data;placement=top?value.data',
                }, {
                    event: 'mouseleave',
                    actions: 'hideTooltip',
                }]
            }, {
                type: `View?class=flex-box;style.alignSelf=flex-start;style.height=${style.height || '4rem'}`,
                children: [{
                    type: `Icon?icon.name=bi-caret-down-fill;style.color=#444;style.fontSize=1.2rem;style.width=.5rem;style.marginRight=.5rem?const.${droplist}::${id}-input`
                }, {
                    type: `Text?id=${id}-key;key=${key};text=${key};droplist.items=[Enter a special key:>>readonly,${key}>>input];auto-style?const.${key}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.5rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                }, {
                    type: `Text?id=${id}-currency;currency=${currency};text=${currency};droplist.items=[Currencies>>readonly,asset.currency.options.name.en.flat()];auto-style?const.${currency}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.5rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                }, {
                    type: `Text?path=unit;id=${id}-unit;droplist.items=[Units>>readonly,asset.unit.options.name.en.flat()];auto-style?const.${unit}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.5rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                    actions: `setData?data.value=${unit}?!value.data`
                }, {
                    type: `Text?id=${id}-language;lang=${lang};text=${lang};droplist.items=[Languages>>readonly,state.asset.language.options.name.en.flat()];droplist.lang;auto-style?const.${lang}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.5rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    }
                }, {
                    type: `Checkbox?id=${id}-google;class=align-center;path=google;style.cursor=pointer;style.margin=0 .5rem?const.${google}`,
                    controls: [{
                        event: `change;load?value.element.style.display::${id}-more=none<<!e.target.checked;value.element.style.display::${id}-more=flex<<e.target.checked;state[value.Data][value.derivations::${id}].type.delete<<!e.target.checked`
                    }]
                }, {
                    type: `Icon?id=${id}-more;icon.name=more_vert;google;outlined;path=type;style.width=1.5rem;style.display=none;style.color=#666;style.cursor=pointer;style.fontSize=2rem;droplist.items=[Enter google icon type>>readonly,[Icon type>>readonly,outlined,rounded,sharp,twoTone]];auto-style?const.${google}`,
                }, {
                    type: `Icon?class=align-center;icon.name=bi-x;id=${id}-x;auto-style?${clearable}||${removable}`,
                    style: {
                        fontSize: '2rem',
                        color: '#444',
                        cursor: 'pointer',
                        after: { color: 'red' }
                    },
                    controls: [{
                        event: 'click',
                        actions: [
                            `remove::${id}??${removable};${clearable ? `value.length::${id}>1;!value.data::${id}-input` : ''}`,
                            `removeData;focus>>50??${clearable}?${id}-input`,
                            `?value.element.innerHTML::${id}-key=value.key::${id}-key;value.path::${id}-input=value.key::${id}-key;value.derivations::${id}-input=[value.derivations::${id},value.key::${id}-key]?value.key::${id}`
                        ]
                    }]
                }]
            }]
        }
    }
}

module.exports = {Input}