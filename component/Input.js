const { toString } = require('../method/toString')
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Input = (component) => {

    if (component.templated) return component

    component = toComponent(component)
    var { input, model, droplist, lang, readOnly, style, controls, icon, placeholder } = component
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
            templated: true,
            style: {
                width: '100%',
                border: '0',
                padding: '0.5rem',
                color: '#444',
                backgroundColor: '#fff',
                height: '4rem',
                borderRadius: '0.25rem',
                fontSize: '1.4rem',

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
            class: 'flex-box',
            type: 'View',
            id,
            component: 'Input',
            controls: { actions: `focus::50>>${id}-input??value.length;value.index=value.length--1` },
            style: {
                display: 'inline-flex',
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
                ...icon,
                type: `Icon?icon.name=${icon.name}${icon.code ? ';icon.code=' : ''};id=${id}-icon?const.${icon.name}`,
                style: {
                    color: '#444',
                    fontSize: '1.6rem',
                    marginLeft: '1rem',
                    marginRight: '.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    ...icon.style
                }
            }, {
                class: lang === 'ar' ? 'arabic' : '',
                type: `Input?readOnly=${readOnly};input.type=${input.type || 'text'};id=${id}-input;input.value=${input.value}${(component.currency || component.unit) ? `;path=amount;data=${component.data}` : component.lang ? `;path=name;data=${component.data}` : ''};filterable=${component.filterable}`,
                droplist: droplist,
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
                },
                controls: [...controls, {
                    actions: 'resizeInput'
                }, {
                    event: `keyup??value.data;e.key=Enter;${component.duplicatable};${component.removable}`,
                    actions: `duplicate>>${id}`
                }, {
                    event: `input??value.data!=free`,
                    actions: [
                        `filter>>droplist?${component.filterable};droplist`,
                        `setData>>${id}-language?data=ar?isArabic`,
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
                type: `View?class=flex-box ${lang === 'ar' ? 'arabic' : ''}`,
                style: { padding: '0 0.5rem' },
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
                    type: `Icon?icon.name=bi-x;id=${id}-x;auto-style?${component.clearable}||${component.removable}`,
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '2rem',
                        color: '#444',
                        cursor: 'pointer',
                        after: { color: 'red' }
                    },
                    controls: [{
                        event: 'click',
                        actions: [
                            `remove>>${id}??${component.removable}${component.clearable ? `;value.length>>${id}>1;!value.data>>${id}-input` : ''}`,
                            `removeData>>${id}-input;focus::50>>${id}-input??${component.clearable}`,
                        ]
                    }]
                }]
            }]
        }
    }
}

module.exports = {Input}