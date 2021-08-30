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
    var { input, model, droplist, lang, readonly, style, controls, icon, placeholder, textarea } = component
    var id = component.id || generate()

    // for search inputs
    if (component.search && component.search.query) {
        component.search.query = toString(component.search)
        component.searchable = true
    }

    component.clearable = component.clearable !== undefined ? component.clearable : true
    component.removable = component.removable !== undefined ? component.removable : true
    component.duplicatable = component.duplicatable !== undefined ? component.duplicatable : true
    
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
            controls: { actions: `focus>>50::${id}-input??value.length;value.index=value.length--1` },
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
                flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
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
                type: `Input?id=${id}-input;${(component.currency || component.unit) ? `path=amount` : (component.lang || component.google) ? `path=name` : ''};filterable=${component.filterable}`,
                input,
                textarea,
                readonly,
                droplist,
                placeholder,
                'placeholder-ar': component['placeholer-ar'],
                templated: true,
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
                    ...input.style,
                },
                controls: [...controls, {
                    actions: 'resizeInput'
                }, {
                    event: `keyup??value.data;e.key=Enter;${component.duplicatable};${component.removable}`,
                    actions: `duplicate::${id}`
                }, {
                    event: `input??value.data!=free`,
                    actions: [
                        `filter::droplist?${component.filterable};droplist`,
                        `setData::${id}-language?data=ar?isArabic`,
                        `search?state=${component.search.state};${component.search.query};id=${component.search.id}?${component.searchable}`
                    ]
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
                type: `View?class=flex-box`,
                children: [{
                    type: `Text?path=currency;id=${id}-currency;droplist.items=[asset.currency.options.name];auto-style?const.${component.currency}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.5rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                    actions: `setData?data=${component.currency}?!value.data`
                }, {
                    type: `Text?path=unit;id=${id}-unit;droplist.items=[asset.unit.options.name];auto-style?const.${component.unit}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.5rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                    actions: `setData?data=${component.unit}?!value.data`
                }, {
                    type: `Text?path=lang;id=${id}-language;droplist.items=[asset.language.options.name];auto-style?const.${component.lang}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.5rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                    actions: `setData?data=${component.lang}?!value.data`,
                }, {
                    type: `Checkbox?class=align-center;path=google;id=${id}-google;style.cursor=pointer;style.margin=0 .5rem?const.${component.google}`,
                }, {
                    type: `Icon?class=align-center;icon.name=bi-x;id=${id}-x;auto-style?${component.clearable}||${component.removable}`,
                    style: {
                        fontSize: '2rem',
                        color: '#444',
                        cursor: 'pointer',
                        after: { color: 'red' }
                    },
                    controls: [{
                        event: 'click',
                        actions: [
                            `remove::${id}??${component.removable};${component.clearable ? `value.length::${id}>1;!value.data::${id}-input` : ''}`,
                            `removeData;focus>>50;setStyle::${id};setStyle?style.height=${component.style.height || '4rem'}?${component.clearable}?${id}-input`,
                        ]
                    }]
                }]
            }]
        }
    }
}

module.exports = {Input}