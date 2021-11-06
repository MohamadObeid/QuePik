const { toComponent } = require('../function/toComponent')

module.exports = (component) => {

    if (component.templated) return component

    component.hover = component.hover || {}
    component.style = component.style || {}
    component.hover.style = component.hover.style || {}
    component.style.after = component.style.after || {}

    // icon
    component.icon = component.icon || {}
    component.icon.style = component.icon.style || {}
    component.icon.hover = component.icon.hover || {}
    component.icon.hover.style = component.icon.hover.style || {}
    component.icon.style.after = component.icon.style.after || {}
    
    // input
    component.input = component.input || {}
    component.input.hover = component.input.hover || {}
    component.input.type = component.input.type || 'text'
    component.input.style = component.input.style || {}
    component.input.hover.style = component.input.hover.style || {}
    component.input.style.after = component.input.style.after || {}
    
    component = toComponent(component)

    var { id, input, model, droplist, readonly, style, controls, icon, duplicated, duration,
        placeholder, textarea, filterable, clearable, removable, msg, day, disabled,
        duplicatable, lang, unit, currency, google, key, note, edit, minlength , children
    } = component

    if (duplicatable && typeof duplicatable !== "object") duplicatable = {}
    if (clearable && typeof clearable !== "object") clearable = {}

    readonly = readonly ? true : false
    removable = removable !== undefined ? (removable === false ? false : true) : false

    if (duplicatable) removable = true
    if (minlength === undefined) minlength = 1
    
    // upload input styles
    var uploadInputStyle = input.type === 'file'
    ? {
        position: 'absolute',
        left: '0',
        top: '0',
        opacity: '0',
        cursor: 'pointer',
    } : {}
    
    var path = `${unit ? `path=amount` :  currency ? `path=${currency}` : duration ? `path=${duration}` : day ? `path=${day}` : lang ? `path=${lang}` : google ? `path=name` : key ? `path=${key}` : ''}`
    
    if (model === 'classic') {
        return {
            ...component,
            touchableOpacity: true,
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
            }
        }
    }
    
    if (model === 'featured') {

        return {
            ...component,
            type: 'View',
            class: 'flex-box',
            touchableOpacity: true,
            // remove from comp
            controls: {},
            droplist: undefined,
            style: {
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '100%',
                minHeight: '4rem',
                position: 'relative',
                backgroundColor: '#fff',
                height: 'fit-content',
                borderRadius: '0.25rem',
                transition: '0.2s',
                overflow: 'hidden',
                border: input.type === 'file' ? '1px dashed #ccc' : '0',
                ...style,
            },
            children: [...children, {
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                ...icon,
                hover: {
                    ...icon.hover,
                    style: {
                        ...icon.style.after,
                        ...icon.hover.style
                    }
                },
                style: {
                    fontSize: '1.6rem',
                    marginLeft: '1rem',
                    marginRight: '.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    ...icon.style
                }
            }, {
                type: `Text?id=${id}-msg;msg=${msg};text=${msg}?const.${msg}`,
                style: {
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    fontSize: '1.3rem',
                    maxWidth: '95%',
                }
            }, {
                type: `Input?id=${id}-input;${path}`,
                input,
                currency, 
                day,
                unit,
                key,
                lang,
                google,
                duration,
                textarea,
                readonly,
                droplist,
                filterable,
                placeholder,
                duplicated,
                disabled,
                templated: true,
                'placeholder-ar': component['placeholer-ar'],
                hover: {
                    ...input.hover,
                    style: {
                        backgroundColor: style.after.backgroundColor,
                        color: style.after.color || '#444',
                        ...input.style.after,
                        ...input.hover.style
                    }
                },
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
                    event: `keyup??value.data();e.key=Enter;const.${duplicatable}`,
                    actions: `duplicate::${id}?${duplicatable && duplicatable.path ? `duplicate.path=${duplicatable.path}` : ''}`
                }, {
                    event: `input?value.element.value=''?value.data()=free`,
                }]
            }, {
                type: `View?class=flex-box;style.alignSelf=flex-start;style.minWidth=fit-content;style.height=${style.height || '4rem'}`,
                children: [{
                    type: `Icon?icon.name=bi-caret-down-fill;style.color=#444;style.fontSize=1.2rem;style.width=1rem;style.marginRight=.5rem?droplist::${id}-input`
                }, {
                    type: `Icon?class=pointer;icon.name=bi-files;style.color=#444;style.fontSize=1.2rem;style.width=1rem;style.marginRight=.5rem;hoverable;style.after.color=#116dff?const.${duplicatable}`,
                    controls: {
                        event: `click??value.data()::${id}-input;const.${duplicatable}`,
                        actions: `duplicate::${id}?${duplicatable && duplicatable.path ? `duplicate.path=${duplicatable.path}` : "" }`
                    }
                }, {
                    type: `Text?text=${note};style.color=#666;style.fontSize=1.3rem;style.padding=.5rem?const.${note}`
                }, {
                    type: `Text?id=${id}-key;key=${key};text=${key};droplist.items<<!${readonly}=const.[any.Enter a special key:._param.readonly,any.${key}._param.input];hoverable;duplicated=${duplicated}?const.${key}`,
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
                    type: `Text?id=${id}-currency;currency=${currency};text=${currency};droplist.items<<!${readonly}=const.[any.Currencies._param.readonly,state.asset.findByName().Currency.options.map().name].flat();hoverable;duplicated=${duplicated}?const.${currency}`,
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
                    type: `Text?path=unit;id=${id}-unit;droplist.items<<!${readonly}=const.[any.Units._param.readonly,state.asset.findByName().Unit.options.map().name].flat();hoverable?const.${unit}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.25rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                    actions: `setData?data.value=${unit}?!value.data()`
                }, {
                    type: `Text?id=${id}-day;day=${day || 'day'};text=${day};droplist.items<<!${readonly}=const.[any.Days of Week._param.readonly,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday];droplist.day;hoverable;duplicated=${duplicated}?const.${day}`,
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
                    type: `Text?id=${id}-duration;duration=${duration || 'hr'};text=${duration};droplist.items<<!${readonly}=[sec,min,hr,day,week,month,3month,year];droplist.duration;hoverable;duplicated=${duplicated}?const.${duration}`,
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
                    type: `Text?id=${id}-language;lang=${lang};text=${lang};droplist.items<<!${readonly}=const.[any.Languages._param.readonly,state.asset.findByName().Language.options.map().name].flat();droplist.lang;hoverable;duplicated=${duplicated}?const.${lang}`,
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
                        event: `change;loaded?value.element.style.display::${id}-more=none<<!e.target.checked;value.element.style.display::${id}-more=flex<<e.target.checked`
                    }]
                }, {
                    type: `Icon?id=${id}-more;icon.name=bi-three-dots-vertical;path=type;style.width=1.5rem;style.display=none;style.color=#666;style.cursor=pointer;style.fontSize=2rem;state.google-items=[any.Icon type._param.readonly,outlined,rounded,sharp,twoTone];droplist.items=const.[any.Enter google icon type._param.readonly,state.google-items];hoverable?const.${google}`,
                }, {
                    type: `Icon?class=align-center;icon.name=bi-x;id=${id}-x;hoverable?const.${clearable}||${removable}`,
                    style: {
                        fontSize: '2rem',
                        color: '#444',
                        cursor: 'pointer',
                        after: { color: 'red' }
                    },
                    controls: [{
                        event: 'click',
                        actions: [
                            // remove element
                            `remove::${id}??${removable};value.length::${id}>${minlength};${clearable ? `!value.data()::${id}-input` : ''}`,
                            // clear data
                            `clearData;focus;resize?${clearable && clearable.path ? `clear.path=${clearable.path}` : ''}?const.${clearable}?${id}-input`,
                            // for key
                            `focus::${id}-input?value.element.value::${id}-input='';value.element.innerHTML::${edit}-key=value.key::${edit}-key;value.path::${edit}-input=value.key::${edit}-key;value.derivations::${edit}-input=[value.derivations::${edit},value.key::${edit}-key];value.Data().[value.derivations::${edit}-input]=value.element.value::${edit}-input?const.${edit}`
                        ]
                    }]
                }]
            }]
        }
    }
}