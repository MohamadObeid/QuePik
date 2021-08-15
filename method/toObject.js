const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { merge } = require("./merge")
const { clone } = require("./clone")
const { derive } = require("./derive")
const _asset = require("../asset/_asset")
//import Assets from '../Assets/Assets'

const toObject = ({ VALUE, STATE, string, e, id }) => {

    if (typeof string !== 'string' || !string) return string || {}
    var params = {}

    string.split(';').map(param => {

        var key, value, minus, plus, times, division

        if (param.includes('=')) {

            key = param.split('=')[0]
            value = param.split(`${key}=`)[1]

        } else key = param

        // operator has !
        if (key.includes('!')) {

            if (key.split('!')[0]) key = key.split('!')[0]
            else key = key.split('!')[1]
            if (!value) value = false
        }

        // id
        if (value && value.includes('>>')) {

            id = value.split('>>')[1]
            value = value.split('>>')[0]

        }

        var local = VALUE[id]
        if (!local) return

        var path = typeof value === 'string' ? value.split('.') : []
        var keys = typeof key === 'string' ? key.split('.') : []

        if (value && value.charAt(0) === '[' && value.charAt(value.length - 1) === ']') {

            var k = generate()
            value = value.slice(1, value.length - 1).split(',')

            value = merge(
                value.map(
                    val => toObject({ VALUE, STATE, string: `${k}=${val}`, id })[k]
                )
            )

            value = value.filter(value => value)

        } else {

            if (value) {
                minus = value.split('--')[1]
                plus = value.split('++')[1]
                times = value.split('**')[1]
                division = value.split('÷÷')[1] // hold Alt + 0247
            }

            if (plus) {
                value = value.split('++')[0]
                if (!isNaN(plus)) plus = parseFloat(plus)
            } else if (minus) {
                value = value.split('--')[0]
                if (!isNaN(minus)) minus = parseFloat(minus)
            } else if (times) {
                value = value.split('**')[0]
                if (!isNaN(times)) times = parseFloat(times)
            } else if (division) {
                value = value.split('÷÷')[0]
                if (!isNaN(division)) division = parseFloat(division)
            }

            /* value */
            if (typeof value === 'boolean') { }
            else if (!isNaN(value)) value = parseFloat(value)
            else if (value === undefined || value === 'generate') value = generate()
            else if (value === 'undefined') value = false
            else if (value === 'input') value = local && local.element.value
            else if (value === 'false') value = false
            else if (value === 'true') value = true
            else if (value === 'string' || value === `''`) value = ''
            else if (value === 'object' || value === '{}') value = {}
            else if (value === 'array' || value === '[]') value = []
            else if (value === '[string]') value = ['']
            else if (value.includes('%20')) value = value.split('%20').join(' ')
            else if (path.length > 1) {

                if (path[0] === 'global') {
                    
                    local = VALUE[path[1]]
                    path = path.slice(2)
                    path.unshift('value')
                }

                if (path[0] === 'e') {

                    path = path.slice(1)
                    value = path.reduce((o, k) => o[k], e)

                } else if (path[0] === 'state') {

                    value = STATE[path[1]]

                    path = path.slice(2)
                    if (path.length > 0) {
                        if (value) value = merge(
                            value.map(
                                val => derive(val, path)[0] || (local.dropList ? `${derive(val, 'title')[0]}:readOnly` : '')
                            )
                        )
                    }

                } else if (path[0] === 'value') {

                    if (path[1] === 'data') {

                        var path = path.slice(2)
                        value = derive(local.DATA, [...local.derivations, ...path])[0]

                    } else {

                        path = path.slice(1)
                        value = path.reduce((o, k, i) => {

                            if (k === 'parent') {

                                var parent = o.parent
                                if (o.type === 'Input') parent = VALUE[parent].parent
                                return VALUE[parent]

                            } else if (k === 'next' || k === 'nextSibling') {

                                var nextSibling = o.element.nextSibling
                                var id = nextSibling.id

                                return VALUE[id]

                            } else if (k === 'prev' || k === 'prevSibling') {

                                var previousSibling = o.element.previousSibling
                                var id = previousSibling.id

                                return VALUE[id]

                            } else if (k === '1stChild') {

                                var id = o.element.children[0].id
                                if (VALUE[id].component === 'Input') {
                                    id = VALUE[id].element.getElementsByTagName('INPUT')[0].id
                                }
                                
                                return VALUE[id]
                                
                            } else if (k === '2ndChild') {

                                var id = (o.element.children[1] || o.element.children[0]).id
                                if (VALUE[id].component === 'Input') {
                                    id = VALUE[id].element.getElementsByTagName('INPUT')[0].id
                                }
                                
                                return VALUE[id]

                            } else if (k === '3rdChild') {

                                var id = (o.element.children[2] || o.element.children[1] || o.element.children[0]).id
                                if (VALUE[id].component === 'Input') {
                                    id = VALUE[id].element.getElementsByTagName('INPUT')[0].id
                                }
                                
                                return VALUE[id]

                            } else if (k === 'lastChild') {

                                var id = o.element.children[o.element.children.length - 1].id
                                if (VALUE[id].component === 'Input') {
                                    id = VALUE[id].element.getElementsByTagName('INPUT')[0].id
                                }
                                
                                return VALUE[id]

                            } else if (k === 'INPUT') {

                                var inputComps = [...o.element.getElementsByTagName(k)]
                                inputComps = inputComps.map(comp => VALUE[comp.id])
                                if (inputComps.length === 0) return inputComps[0]
                                else return inputComps

                            } else if (k === 'findIdByData') {

                                var id = o.find(id => local.data === VALUE[id].text)
                                if (id) return id
                                else return id
                            }

                            return o[k]

                        }, clone(local))
                        
                    }

                } else if (path[0] === 'DATA') {

                    value = value.split('.')
                    value.shift()
                    value = merge(toArray(derive(local.DATA, value, true)[0]))

                } else if (path[0] === 'const') {
                    value = value.split('const.')[1]

                } else if (path[0] === 'asset') {

                    value = value.split('asset.')[1]
                    var file = value.split('.')[0]
                    value = value.split(`${file}.`)[1]
                    var path = value.split('.')
                    value = _asset[file]
                    value = merge(
                        value.map(
                            val => derive(val, path)[0] || `${derive(val, 'title')[0]}:readOnly`
                        )
                    )

                } else if (path[0] === 'encoded') {
                    value = STATE.encoded[path[1]]

                } else if (path[0] === 'date') {
                    if (path[1] === 'today') {
                        value = new Date()
                        if (path[2]) {
                            value = addDays(new Date(), parseInt(path[2]))
                        }
                        value = value.toJSON().slice(0, -8)
                    }

                } else if (path[0] === 'generate') {
                    if (path[1] === 'capitalize') value = generate().toUpperCase()
                    else value = generate()
                }

                else if (path[0] === 'element') {
                    if (path[1] === 'className') {

                        value = document.getElementsByClassName(path[1])[0]
                        path = path.slice(2)
                        value = path.reduce((o, k) => o[k], value)

                    } else value = path.reduce((o, k) => o[k], local)

                }

                else if (path[path.length - 1] === 'parent') {
                    var element = VALUE[path[0]]
                    if (!element) value = path[0]
                    else value = element.parent
                }

            }


            if (plus) value = value + plus
            else if (minus) value = value - minus
            else if (times) value = value * times
            else if (division) value = value / division

        }

        // remove key from VAR
        if (key.split('.')[0] === 'remove') {

            key = key.split('.').slice(1)
            key.reduce((o, k, i) => {
                if (i === key.length - 1) return delete o[k]
                return o[k]
            }, local)
        }

        // object structure
        if (keys && keys.length > 1) {
            keys.reduce((obj, key, index) => {

                if (obj[key] !== undefined) {

                    if (index === keys.length - 1) {

                        obj[key] = toArray(obj[key])
                        return obj[key].push(value)

                    }

                } else {

                    if (index === keys.length - 1) return obj[key] = value
                    else obj[key] = {}

                }

                return obj[key]
            }, params)

        } else {

            if (params[key]) {

                params[key] = toArray(params[key])
                params[key].push(value)

            } else params[key] = value
        }
    })

    return params
}

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

module.exports = {toObject}