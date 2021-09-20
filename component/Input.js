const { toComponent } = require('../method/toComponent')

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
    var { id, input, model, droplist, readonly, style, controls, icon, duplicated,
        placeholder, textarea, filterable, clearable, removable, msg,
        duplicatable, lang, unit, currency, google, key, note, edit } = component

    duplicatable = duplicatable !== undefined ? (duplicatable === false ? false : true) : false
    clearable = clearable !== undefined ? (clearable === false ? false : true) : false
    removable = removable !== undefined ? (removable === false ? false : true) : false
    if (duplicatable) removable = true

    // upload input styles
    var uploadInputStyle = input.type === 'file'
    ? {
        position: 'absolute',
        left: '0',
        top: '0',
        opacity: '0',
        cursor: 'pointer',
    } : {}
    
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
            controls,
        }
    }
    
    if (model === 'featured') {

        return {
            ...component,
            id,
            type: 'View',
            class: 'flex-box',
            // remove from comp
            controls: {},
            droplist: undefined,
            style: {
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '100%',
                minHeight: style.minHeight || '4rem',
                position: 'relative',
                backgroundColor: '#fff',
                height: 'fit-content',
                minHeight: '4rem',
                borderRadius: '0.25rem',
                transition: '0.2s',
                overflow: 'hidden',
                border: input.type === 'file' ? '1px dashed #ccc' : '0',
                ...style,
            },
            children: [{
                icon,
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                style: {
                    fontSize: '1.6rem',
                    marginLeft: '1rem',
                    marginRight: '.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    ...(icon.style || {})
                }
            }, {
                type: `Text?id=${id}-msg;msg=${msg};text=${msg}?const.${msg}`,
                style: {
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    fontSize: '1.3rem',
                    //position: 'absolute',
                    maxWidth: '95%',
                }
            }, {
                type: `Input?id=${id}-input;${unit ? `path=amount` :  currency ? `path=${currency}` : lang ? `path=${lang}` : google ? `path=name` : key ? `path=${key}` : ''}`,
                input,
                textarea,
                readonly,
                droplist,
                filterable,
                placeholder,
                duplicated,
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
                    ...uploadInputStyle,
                    ...input.style
                },
                controls: [...controls, {
                    actions: 'resize'
                }, {
                    event: `keyup??value.data;e.key=Enter;${duplicatable}`,
                    actions: `duplicate::${id}`
                }, {
                    event: `input?value.element.value=''?value.data=free`,
                }]
            }, {
                type: `View?class=flex-box;style.alignSelf=flex-start;style.minWidth=fit-content;style.height=${style.height || '4rem'}`,
                children: [{
                    type: `Icon?icon.name=bi-caret-down-fill;style.color=#444;style.fontSize=1.2rem;style.width=1rem;style.marginRight=.5rem?droplist::${id}-input`
                }, {
                    type: `Text?text=${note};style.color=#666;style.fontSize=1.3rem;style.padding=.5rem?const.${note}`
                }, {
                    type: `Text?id=${id}-key;key=${key};text=${key};droplist.items=[Enter a special key:>>readonly,${key}>>input];auto-style;duplicated=${duplicated}?const.${key}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.25rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                }, {
                    type: `Text?id=${id}-currency;currency=${currency};text=${currency};droplist.items=[Currencies>>readonly,asset.currency.options.map().name.en].flat();auto-style;duplicated=${duplicated}?const.${currency}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.25rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                }, {
                    type: `Text?path=unit;id=${id}-unit;droplist.items=[Units>>readonly,asset.unit.options.map().name.en].flat();auto-style?const.${unit}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.25rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                    actions: `setData?data.value=${unit}?!value.data`
                }, {
                    type: `Text?id=${id}-language;lang=${lang};text=${lang};droplist.items=[Languages>>readonly,state.asset.language.options.map().name.en].flat();droplist.lang;auto-style;duplicated=${duplicated}?const.${lang}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.25rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    }
                }, {
                    type: `Checkbox?id=${id}-google;class=align-center;path=google;style.cursor=pointer;style.margin=0 .25rem?const.${google}`,
                    controls: [{
                        event: `change;load?value.element.style.display::${id}-more=none<<!e.target.checked;value.element.style.display::${id}-more=flex<<e.target.checked`
                    }]
                }, {
                    type: `Icon?id=${id}-more;icon.name=more_vert;google;outlined;path=type;style.width=1.5rem;style.display=none;style.color=#666;style.cursor=pointer;style.fontSize=2rem;state.google-items=[Icon type>>readonly,outlined,rounded,sharp,twoTone];droplist.items=[Enter google icon type>>readonly,state.google-items];auto-style?const.${google}`,
                }, {
                    type: `Icon?class=align-center;icon.name=bi-x;id=${id}-x;auto-style?${clearable}||${removable}`,
                    style: {
                        fontSize: '2rem',
                        padding: '.25rem',
                        color: '#444',
                        cursor: 'pointer',
                        after: { color: 'red' }
                    },
                    controls: [{
                        event: 'click',
                        actions: [
                            // remove element
                            `remove::${id}??${removable};${clearable ? `value.length::${id}>1;!value.data::${id}-input` : ''}`,
                            // clear data
                            `removeData;focus>>50??${clearable}?${id}-input`,
                            // for key
                            `focus::${id}-input?value.element.value::${id}-input='';value.element.innerHTML::${edit}-key=value.key::${edit}-key;value.path::${edit}-input=value.key::${edit}-key;value.derivations::${edit}-input=[value.derivations::${edit},value.key::${edit}-key];state[value.Data][value.derivations::${edit}-input]=value.element.value::${edit}-input?const.${edit}`
                        ]
                    }]
                }]
            }]
        }
    }
}

module.exports = {Input}