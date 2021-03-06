const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toCode } = require("./toCode")
const { decode } = require("./decode")
const { isEqual } = require("./isEqual")
const { capitalize } = require("./capitalize")
const { clone } = require("./clone")
const { toNumber } = require("./toNumber")
const { toPrice } = require("./toPrice")
const { getDateTime } = require('./getDateTime')
const { getDaysInMonth } = require("./getDaysInMonth")

const reducer = ({ VALUE, STATE, id, params: { path, value, key, params, object }, _, e }) => {

    const { toValue } = require("./toValue")
    const { execute } = require("./execute")

    var local = VALUE[id], breakRequest

    // []
    if (path[0] === '[]') {
        object = []
        path = path.slice(1)
    }

    if (path[1]) path = toCode({ VALUE, STATE, id, string: path.join('.'), e }).split('.')
    if (path[1]) path = decode({ VALUE, STATE, id, string: path.join('.'), e }).split('.')
    
    if (path[0] === 'global') {

        local = VALUE[path[1]]
        id = toValue({ VALUE, STATE, id, e, params: {value: path[1], params}, _ })
        path = path.slice(1)
        path[0] = 'value'
    }

    if (path && (path.includes("equal()") || path.includes("equals()"))) {
        
        var index = path.findIndex(k => k && (k.includes("equal()") || k.includes("equals()")))
        if (index !== -1 && index === path.length - 2) {
            
            key = true
            if (path[index][0] === "_")
            _ = reducer({ VALUE, STATE, id, params: { path: path.slice(0, index).join("."), params, object }, _, e })

            value = toValue({ VALUE, STATE, id, _, e, params: { value: path[index + 1], params } })
            path = path.slice(0, index)
        }
    }
    
    if (!object) {
        
        object = path[0] === 'value' ? VALUE[id]
        : path[0] === 'state' ? STATE 
        : path[0] === 'e' ? e
        : path[0] === 'undefined' ? undefined
        : path[0] === 'false' ? false
        : path[0] === 'true' ? true
        : path[0] === '_' ? _
        : path[0] === 'params' ? params
        : path[0] === 'any' ? toValue({ VALUE, STATE, id, params: { value: path[1], params }, _, e })
        : path[0] === 'document' ? document
        : path[0] === 'window' ? window
        : path[0] === 'history' ? history
        : false
        
        if (!object && path[0]) {
            
            if (path[0] === 'desktop()') return STATE.device.type === 'desktop'
            if (path[0] === 'tablet()') return STATE.device.type === 'tablet'
            if (path[0] === 'mobile()' || path[0] === 'phone()') return STATE.device.type === 'phone'

            if (path[0].includes('coded()'))
            object = toValue({ VALUE, STATE, id, params: { value: STATE.codes[path[0]], params }, _, e })

            else if (path.join('.').includes(','))
            return object = toValue({ VALUE, STATE, id, params: { value: `[${path.join('.')}]`, params }, _, e })

            else if (path[0] === 'action') {
                var actions = toValue({ VALUE, STATE, id, params: { value: `any.${path.slice(1).join('.')}`, params }, _, e })
                return execute({ VALUE, STATE, id, actions, params, e })
            }
            
            else if (path[0] === '[]') object = []
            else if (path[0] === '{}') object = {}
            else if (path[0] === '[{}]') object = [{}]
            else if (path[0].includes('()')) object = VALUE
        }

        if (path[0] === 'any') path = path.slice(1)
        if (object) path = path.slice(1)
        else if (path[0] && path[0].includes('coded()')) return
        else return path.join('.')
    }
    
    var lastIndex = path.length - 1
    
    var answer = path.reduce((o, k, i) => {
        
        // fake lastIndex
        if (lastIndex !== path.length - 1) {
            if (key === true) key = false
            lastIndex = path.length - 1
        }

        if (!isNaN(k)) k = k + ''
                    
        // break
        if (breakRequest === true || breakRequest >= i) return o

        // equal
        if (path[i + 1] && (path[i + 1].includes("equal()") || path[i + 1].includes("equals()"))) {
        
            key = true
            lastIndex = i
            breakRequest = i + 2
            if (path[i + 1][0] === "_")
            _ = reducer({ VALUE, STATE, id, params: { path: [k], params, object: o }, _, e })
            value = toValue({ VALUE, STATE, id, _, e, params: { value: path[i + 2], params } })
        }
        
        if (k === 'else()') {
            
            breakRequest = i + 1
            var answer1 = o
            var answer2 = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            if (!answer1) answer = answer2
            else answer = answer1
            return answer
        }
        
        // notExist
        if (k === 'notexist()' || k === 'notExist()' || k === 'not()' && (!path[i + 1] || (path[i + 1].includes("()") && !path[i + 1].includes("coded()")))) 
        return answer = !o ? true : false

        if (o === undefined) return o

        if (path[i + 1] === 'delete()' || path[i + 1] === 'del()') {
            
            breakRequest = i + 1
            var el = toValue({ VALUE, STATE, id, e, _, params: { value: k, params } })
            if (Array.isArray(o)) o.splice(k, 1)
            else delete o[el]
            
        } else if (k === "if()") {
            
            breakRequest = i + 1
            var approved = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            if (!approved) answer = false
            else answer = o

        } else if (k === "_") {

            answer = _

        } else if (k.includes('coded()')) {
            
            breakRequest = true
            var newValue = toValue({ VALUE, STATE, id, e, params: { value: STATE.codes[k], params }, _ })
            newValue = [ ...(newValue.toString().split('.')), ...path.slice(i + 1)]
            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: newValue, object: o, params }, _ })

        } else if (k === 'data()') {

            breakRequest = true
            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: [...local.derivations, ...path.slice(i+1)], object: STATE[local.Data], params }, _ })
            delete local['data()']

        } else if (k === 'Data()') {

            answer = STATE[local.Data]

        } else if (k === "removeAttribute()") {

            breakRequest = i + 1
            var removed = toValue({ VALUE, STATE, id, e, params: { value: path[i+1], params }, _ })
            answer = o.removeAttribute(removed)

        } else if (k === 'parent()') {

            var parent = o.parent
            if (o.templated) parent = VALUE[parent].parent
            answer = VALUE[parent]

        } else if (k === 'next()' || k === 'nextSibling()') {

            var element = o.templated ? VALUE[o.parent].element : o.element
            var nextSibling = element.nextSibling
            var _id = nextSibling.id
            answer = VALUE[_id]

        } else if (k === 'prev()' || k === 'prevSibling()') {

            var element = o.templated ? VALUE[o.parent].element : o.element
            var previousSibling = element.previousSibling
            var _id = previousSibling.id
            answer = VALUE[_id]

        } else if (k === '1stChild()') {
            
            var _id = o.element.children[0].id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            answer = VALUE[_id]
            
        } else if (k === '2ndChild()') {
            
            var _id = (o.element.children[1] || o.element.children[0]).id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === '3rdChild()') {

            var _id = (o.element.children[2] || o.element.children[1] || o.element.children[0]).id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === '3rdlastChild()') {

            var _id = o.element.children[o.element.children.length - 3].id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === '2ndlastChild()') {

            var _id = o.element.children[o.element.children.length - 2].id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === 'lastChild()') {

            var _id = o.element.children[o.element.children.length - 1].id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === 'children()') {
            
            answer = [...o.element.children].map(el => {
                
                var _id = el.id
                if (VALUE[_id].component === 'Input') {

                    var _id0 = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
                    return VALUE[_id0]

                } else return VALUE[_id]
            })
            
        } else if (k === '!') {

            opposite = true
            answer = o

        } else if (k === 'toInteger()') {

            answer = Math.round(toNumber(o))

        } else if (k === 'device()') {

            answer = State.device.type

        } else if (k === 'mobile()' || k === 'phone()') {

            answer = State.device.type === 'phone'

        } else if (k === 'desktop()') {

            answer = State.device.type === 'desktop'

        } else if (k === 'tablet()') {

            answer = State.device.type === 'tablet'

        } else if (k === 'child()') {

            breakRequest = i + 1
            var child = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params }, _ })
            answer = o.child(child)
            
        } else if (k === 'clearTimeout()') {
            
            answer = clearTimeout(o)
            
        } else if (k === 'setTimeout()') {
            
            breakRequest = i + 2
            var timer = parseInt(path[i + 2])
            var myFn = () => toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = setTimeout(myFn, timer)

        } else if (k === 'shift()') {

            answer = o.shift()

        } else if (k === 'slice()') {

            breakRequest = i + 1
            var sliced = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params }, _ })
            answer = o.slice(sliced)

        } else if (k === 'replaceState()') {

            breakRequest = i + 1
            var replaced = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params }, _ })
            answer = o.replaceState(null, STATE.page[STATE.host].title, replaced)

        } else if (k === 'pushState()') {

            breakRequest = i + 1
            var pushed = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params }, _ })
            answer = o.pushState(null, STATE.page[STATE.host].title, pushed)

        } else if (k === '_param') {
            
            breakRequest = i + 1
            var param = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = o + '>>' + param

        } else if (k === '_array' || k === '[]') {
            
            answer = []

        } else if (k === '_string' || k === "''") {
            
            answer = ''

        } else if (k === '_object' || k === '{}') {
            
            answer = {}

        } else if (k === '_semi') {
            
            if (path[i + 1] === 'add()') answer = o + ";"
            else {
                breakRequest = i + 1
                var _semi = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
                if (!path[i + 1]) _semi = ""
                answer = o + ";" + _semi
            }

        } else if (k === '_quest') {
            
            if (path[i + 1] === 'add()') answer = o + "?"
            else {
                breakRequest = i + 1
                var _quest = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
                if (!path[i + 1]) _quest = ""
                answer = o + "?" + _quest
            }

        } else if (k === '_dot') {

            if (path[i + 1] === 'add()') answer = o + "."
            else {
                breakRequest = i + 1
                var _dot = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
                if (!path[i + 1]) _dot = ""
                answer = o + "." + _dot
            }

        } else if (k === '_space') {

            if (path[i + 1] === 'add()') answer = o + " "
            else {
                breakRequest = i + 1
                var _space = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
                if (!path[i + 1]) _space = ""
                answer = o + " " + _space
            }
            
        } else if (k === '_equal') {
            
            if (path[i + 1] === 'add()') answer = o + "="
            else {
                breakRequest = i + 1
                var _equal = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
                if (!path[i + 1]) _equal = ""
                answer = o + "=" + _equal
            }
            
        } else if (k === 'then()') {

            breakRequest = i + 1
            answer = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            
        } else if (k === 'and()' || k === '&&') {
            
            if (!o) {
                breakRequest = true
                answer = o
            } else {
                breakRequest = i + 1
                answer = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            }
            
        } else if (k === 'or()' || k === '||') {
            
            if (o) {
                breakRequest = true
                answer = o
            } else {
                breakRequest = i + 1
                answer = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            }
            
        } else if (k === 'isEqual()' || k === 'is()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = isEqual(o, b)
            
        } else if (k === 'greater()' || k === 'isgreater()' || k === 'isgreaterthan()' || k === 'isGreaterThan()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = parseFloat(o) > parseFloat(b)

        } else if (k === 'less()' || k === 'isless()' || k === 'islessthan()' || k === 'isLessThan()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = parseFloat(o) < parseFloat(b)
            
        } else if (k === 'isNot()' || k === 'isNotEqual()' || k === 'not()' || k === 'isnt()') {
            
            breakRequest = i + 1
            var isNot = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = !isEqual(o, isNot)
            
        } else if (k === 'true()' || k === "istrue()" || k === "isTrue()") {

            answer = o === true

        } else if (k === 'false()' || k === "isfalse()" || k === "isFalse()") {

            answer = o === false

        } else if (k === 'undefined()' || k === "isundefined()" || k === "isUndefined()") {

            answer = o === undefined

        } else if (k === 'abs()') {
            
            o = o.toString()

            var isPrice
            if (o.includes(',')) isPrice = true
            o = toNumber(o)

            answer = Math.abs(o)
            if (isPrice) answer = answer.toLocaleString()
            
        } else if (k === 'dividedBy()' || k === 'divide()' || k === 'divided()' || k === 'divideBy()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            
            o = o.toString()
            b = b.toString()

            var isPrice
            if (o.includes(',') || b.includes(',')) isPrice = true

            b = toNumber(b)
            o = toNumber(o)

            answer = o / b
            if (isPrice) answer = answer.toLocaleString()
            
        } else if (k === 'times()' || k === 'multiplyBy()' || k === 'multiply()' || k === 'mult()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            
            o = o.toString()
            b = b.toString()
            
            var isPrice
            if (o.includes(',') || b.includes(',')) isPrice = true
            
            b = toNumber(b)
            o = toNumber(o)

            answer = o * b
            if (isPrice) answer = answer.toLocaleString()
            
        } else if (k === 'add()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            
            o = o.toString()
            b = b.toString()
            var space = o.slice(-1) === ' ' || b.slice(-1) === ' '
            
            var isPrice
            if (o.includes(',') || b.includes(',')) isPrice = true
            
            b = toNumber(b)
            o = toNumber(o)

            answer = space ? o + ' ' + b : o + b
            if (isPrice) answer = answer.toLocaleString()
            
        } else if (k === 'subs()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e, _ })
            
            o = o.toString()
            b = b.toString()
            
            var isPrice
            if (o.includes(',') || b.includes(',')) isPrice = true
            
            b = toNumber(b)
            o = toNumber(o)
            
            if (!isNaN(o) && !isNaN(b)) answer = o - b
            else answer = o.split(b)[0] - o.split(b)[1]
            if (isPrice) answer = answer.toLocaleString()

        } else if (k === 'sum()') {
            
            answer = o.reduce((o, k) => o + k, 0)

        } else if (k === 'toArray()') {
            
            answer = toArray(o)

        } else if (k === 'json') {
            
            answer = o + '.json'

        } else if (k === 'exists()') {
            
            answer = o !== undefined ? true : false

        } else if (k === 'clone()') {
            
            answer = clone(o)

        } else if (k === 'array()' || k === '[]') {
            
            answer = []

        } else if (k === 'field()') {
            
            breakRequest = true
            var fields = path.slice(i).join('.').split('field().').slice(1)
            fields.map(field => {
                var f = toValue({ VALUE, STATE, id, params: { value: field.split('.')[0], params }, _, e })
                var v = toValue({ VALUE, STATE, id, params: { value: field.split('.')[2], params }, _, e })
                o[f] = v
            })
            answer = o
            
        } else if (k === 'object()' || k === '{}') {
            
            answer = {}
            if (path[i + 1] === 'field()') {
                breakRequest = true
                var fields = path.slice(i + 1).join('.').split('field().').slice(1)
                fields.map(field => {
                    var f = toValue({ VALUE, STATE, id, params: { value: field.split('.')[0], params }, _, e })
                    var v = toValue({ VALUE, STATE, id, params: { value: field.split('.')[2], params }, _, e })
                    answer[f] = v
                })
            }
            
        } else if (k === 'push()') {
            
            breakRequest = i + 1
            var pushed = toValue({ VALUE, STATE, id, params: {value: path[i + 1], params},_ ,e })
            o.push(pushed)
            answer = o

        } else if (k === 'pull()') {
            
            breakRequest = i + 1
            var pulled = toValue({ VALUE, STATE, id, params: {value: path[i + 1], params},_ ,e }) || o.length - 1
            o.splice(pulled,1)
            answer = o

        } else if (k === 'keys()') {
            
            answer = Object.keys(o)
            
        } else if (k === 'key()') {
            
            if (i === lastIndex && value !== undefined && key) answer = Object.keys(o)[0] = value
            else answer = Object.keys(o)[0]
            
        } else if (k === 'values()') {
            
            answer = Object.values(o)

        } else if (k === 'value()') {
            
            if (i === lastIndex && value !== undefined && key) answer = o[Object.keys(o)[0]] = value
            else answer = Object.values(o)[0]
            
        } else if (k === 'entries()') {
            
            answer = Object.entries(o).map(([k, v]) => ({ [k]: v }))

        } else if (k === 'toLowerCase()') {
            
            answer = o.toLowerCase()

        } else if (k === 'generate()') {
            
            answer = generate()

        } else if (k === 'includes()') {
            
            breakRequest = i + 1
            var included = toValue({ VALUE, STATE, id, e, params: { value: path[i+1], params }, _ })
            answer = o.includes(included)
            
        } else if (k === 'capitalize()') {
            
            answer = capitalize(o)
            
        } else if (k === 'length()') {
            
            answer = o.length
            
        } else if (k === 'today()') {
            
            answer = new Date()

        } else if (k === 'date()' || k === 'toDate()') {

            if (!isNaN(o)) o = parseInt(o)
            answer = new Date(o)

        } else if (k === 'toUTCString()') {
            
            if (!isNaN(o) && (parseFloat(o) + '').length === 13) o = new Date(parseFloat(o))
            answer = o.toUTCString()
            
        } else if (k === 'setTime()') {
            
            answer = new Date().setTime(o)
            
        } else if (k === 'getTime()') {
            
            answer = o.getTime()
            
        } else if (k === 'getDateTime()') {
            
            answer = getDateTime(o)

        } else if (k === 'getDaysInMonth()') {
            
            answer = getDaysInMonth(o)

        } else if (k === 'getDayBeginning()' || k === 'getDayStart()') {
            
            answer = o.setHours(0,0,0,0)
            
        } else if (k === 'getDayEnd()' || k === 'getDayEnding()') {
            
            answer = o.setHours(23,59,59,999)
            
        } else if (k === 'getNextMonth()' || k === 'get1MonthLater()') {
            
            var month = o.getMonth() + 1 > 11 ? 1 : o.getMonth() + 1
            var year = (month === 1 ? o.getYear() + 1 : o.getYear()) + 1900
            answer = new Date(o.setYear(year)).setMonth(month, o.getDays())

        } else if (k === 'get2ndNextMonth()' || k === 'get2MonthLater()') {
            
            var month = o.getMonth() + 1 > 11 ? 1 : o.getMonth() + 1
            var year = (month === 1 ? o.getYear() + 1 : o.getYear()) + 1900
            month = month + 1 > 11 ? 1 : month + 1
            year = month === 1 ? year + 1 : year
            answer = new Date(o.setYear(year)).setMonth(month, o.getDays())

        } else if (k === 'get3rdNextMonth()' || k === 'get3MonthLater()') {
            
            var month = o.getMonth() + 1 > 11 ? 1 : o.getMonth() + 1
            var year = (month === 1 ? o.getYear() + 1 : o.getYear()) + 1900
            month = month + 1 > 11 ? 1 : month + 1
            year = month === 1 ? year + 1 : year
            month = month + 1 > 11 ? 1 : month + 1
            year = month === 1 ? year + 1 : year
            answer = new Date(o.setYear(year)).setMonth(month, o.getDays())

        } else if (k === 'getPrevMonth()' || k === 'get1MonthEarlier') {
            
            var month = o.getMonth() - 1 < 0 ? 11 : o.getMonth() - 1
            var year = (month === 11 ? o.getYear() - 1 : o.getYear()) + 1900
            answer = new Date(o.setYear(year)).setMonth(month, o.getDays())

        } else if (k === 'get2ndPrevMonth()' || k === 'get2MonthEarlier') {
            
            var month = o.getMonth() - 1 < 0 ? 11 : o.getMonth() - 1
            var year = (month === 11 ? o.getYear() - 1 : o.getYear()) + 1900
            month = month - 1 < 0 ? 11 : month - 1
            year = month === 11 ? year - 1 : year
            answer = new Date(o.setYear(year)).setMonth(month, o.getDays())

        } else if (k === 'get3rdPrevMonth()' || k === 'get3MonthEarlier') {
            
            var month = o.getMonth() - 1 < 0 ? 11 : o.getMonth() - 1
            var year = (month === 11 ? o.getYear() - 1 : o.getYear()) + 1900
            month = month - 1 < 0 ? 11 : month - 1
            year = month === 11 ? year - 1 : year
            month = month - 1 < 0 ? 11 : month - 1
            year = month === 11 ? year - 1 : year
            answer = new Date(o.setYear(year)).setMonth(month, o.getDays())

        } else if (k === 'getMonthBeginning()' || k === 'getMonthStart()') {
            
            answer = new Date(o.setMonth(o.getMonth(), 1)).setHours(0,0,0,0)

        } else if (k === 'getMonthEnding()' || k === 'getMonthEnd()') {
            
            answer = new Date(o.setMonth(o.getMonth(), getDaysInMonth(o))).setHours(23,59,59,999)

        } else if (k === 'getNextMonthBeginning()' || k === 'getNextMonthStart()') {
            
            var month = o.getMonth() + 1 > 11 ? 1 : o.getMonth() + 1
            var year = (month === 1 ? o.getYear() + 1 : o.getYear()) + 1900
            answer = new Date(new Date(o.setYear(year)).setMonth(month, 1)).setHours(0,0,0,0)
            
        } else if (k === 'getNextMonthEnding()' || k === 'getNextMonthEnd()') {
            
            var month = o.getMonth() + 1 > 11 ? 1 : o.getMonth() + 1
            var year = (month === 1 ? o.getYear() + 1 : o.getYear()) + 1900
            answer = new Date(new Date(o.setYear(year)).setMonth(month, getDaysInMonth(o))).setHours(23,59,59,999)

        } else if (k === 'get2ndNextMonthBeginning()' || k === 'get2ndNextMonthStart()') {
            
            var month = o.getMonth() + 1 > 11 ? 1 : o.getMonth() + 1
            var year = (month === 1 ? o.getYear() + 1 : o.getYear()) + 1900
            month = month + 1 > 11 ? 1 : month + 1
            year = month === 1 ? year + 1 : year
            answer = new Date(new Date(o.setYear(year)).setMonth(month, 1)).setHours(0,0,0,0)

        } else if (k === 'get2ndNextMonthEnding()' || k === 'get2ndNextMonthEnd()') {
            
            var month = o.getMonth() + 1 > 11 ? 1 : o.getMonth() + 1
            var year = (month === 1 ? o.getYear() + 1 : o.getYear()) + 1900
            month = month + 1 > 11 ? 1 : month + 1
            year = month === 1 ? year + 1 : year
            answer = new Date(new Date(o.setYear(year)).setMonth(month, getDaysInMonth(o))).setHours(23,59,59,999)

        } else if (k === 'getPrevMonthBeginning()' || k === 'getPrevMonthStart()') {
            
            var month = o.getMonth() - 1 < 0 ? 11 : o.getMonth() - 1
            var year = (month === 11 ? o.getYear() - 1 : o.getYear()) + 1900
            answer = new Date(new Date(o.setYear(year)).setMonth(month, 1)).setHours(0,0,0,0)

        } else if (k === 'getPrevMonthEnding()' || k === 'getPrevMonthEnd()') {
            
            var month = o.getMonth() - 1 < 0 ? 11 : o.getMonth() - 1
            var year = (month === 11 ? o.getYear() - 1 : o.getYear()) + 1900
            answer = new Date(new Date(o.setYear(year)).setMonth(month, getDaysInMonth(o))).setHours(23,59,59,999)

        } else if (k === 'get2ndPrevMonthBeginning()' || k === 'get2ndPrevMonthStart()') {
            
            var month = o.getMonth() - 1 < 0 ? 11 : o.getMonth() - 1
            var year = (month === 11 ? o.getYear() - 1 : o.getYear()) + 1900
            month = month - 1 < 0 ? 11 : month - 1
            year = month === 11 ? year - 1 : year
            answer = new Date(new Date(o.setYear(year)).setMonth(month, 1)).setHours(0,0,0,0)

        } else if (k === 'get2ndPrevMonthEnding()' || k === 'get2ndPrevMonthEnd()') {
            
            var month = o.getMonth() - 1 < 0 ? 11 : o.getMonth() - 1
            var year = (month === 11 ? o.getYear() - 1 : o.getYear()) + 1900
            month = month - 1 < 0 ? 11 : month - 1
            year = month === 11 ? year - 1 : year
            answer = new Date(new Date(o.setYear(year)).setMonth(month, getDaysInMonth(o))).setHours(23,59,59,999)

        } else if (k === 'getYearBeginning()' || k === 'getYearStart()') {
            
            answer = new Date(o.setMonth(0, 1)).setHours(0,0,0,0)

        } else if (k === 'getYearEnding()' || k === 'getYearEnd()') {
            
            answer = new Date(o.setMonth(0, getDaysInMonth(o))).setHours(23,59,59,999)

        } else if (k === 'exist()' || k === 'exists()') {
            
            answer = o !== undefined ? true : false
            
        } else if (k === 'flat()') {
            
            answer = Array.isArray(o) ? o.flat() : o
            
        } else if (k.includes('filter()')) {
            
            breakRequest = i + 1
            if (k[0] === "_") {
                answer = o.filter(o => toValue({ VALUE, STATE, id, e,  _: _ ? [_, o] : o, params: { value: path[i + 1], params } }))
            } else {
                var cond = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1], params}, _ })
                if (!cond) answer = o.filter(o => o !== undefined)
                else answer = o.filter(o => o === cond)
            }
            
        } else if (k.includes('filterById()')) {

            breakRequest = i + 1
            if (k[0] === "_") {
                answer = o.filter(o => toValue({ VALUE, STATE, id, e, _: _ ? [_, o] : o, params: { value: path[i + 1], params } }))
            } else {
                var _id = toArray(toValue({ VALUE, STATE, id, e, _, params: {value: path[i + 1], params} }))
                answer = o.filter(o => _id.includes(o.id))
            }

        } else if (k.includes('find()')) {

            breakRequest = i + 1
            if (k[0] === "_") {
                answer = o.find(o => toValue({ VALUE, STATE, id, e,  _: _ ? [_, o] : o, params: { value: path[i + 1], params } }))
            } else {
                var found = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1], params} , _})
                answer = o.find(data => isEqual(found, data))
            }

            // last index & value
            var index = o.findIndex(data => isEqual(found, data))
            if (index === -1) index = o.length
            if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            
        } else if (k.includes('findIndex()')) {

            breakRequest = i + 1
            if (k[0] === "_") {
                answer = o.findIndex(o => toValue({ VALUE, STATE, id, e,  _: _ ? [_, o] : o, params: { value: path[i + 1], params } }))
            } else {
                var found = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1], params} , _})
                answer = o.findIndex(data => isEqual(found, data))
            }
            
        } else if (k === 'findById()') {

            breakRequest = i + 1
            // get id
            var _id = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params } , _})
            answer = o.find(data => data.id === _id)

            // last index & value
            if (answer) {
                var index = o.findIndex(data => data.id === _id)
                if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            }
            
        } else if (k === 'findByName()') {

            breakRequest = i + 1
            // get id
            var name = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, _, e })
            
            answer = o.find(data => data.name === name)
            
            if (!answer) {
                o.push({ name })
                answer = o[o.length - 1]
            }

            var index = o.findIndex(data => data.name === name)
            // last index & value
            if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            
        } else if (k === 'findByNameEn()') {

            breakRequest = i + 1
            // get id
            var name = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, _, e })
            
            answer = o.find(data => data.name.en === name)
            
            if (!answer) {
                o.push({ name: {en: name} })
                answer = o[o.length - 1]
            }

            var index = o.findIndex(data => data.name.en === name)
            // last index & value
            if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            
        } else if (k.includes('map()')) {
            
            breakRequest = i + 1
            if (k[0] === "_") {
                answer = o.map(o => reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, _: _ ? [_, o] : o, e }) )
            } else answer = o.map(o => reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], object: o, value, key, params }, _, e }) )

        } else if (k === 'index()') {
            
            var element = VALUE[o.parent].element
            if (!element) answer = o.mapIndex
            else { 
                var children = [...element.children]
                var index = children.findIndex(child => child.id === o.id)
                if (index > -1) answer = index
                else answer = 0
            }
            
        } else if (k === 'getDeepChildrenId()') {

            answer = getDeepChildrenId({ VALUE, id: o.id })
            
        } else if (k === 'action()') {
            
            answer = execute({ VALUE, STATE, id, actions: path[i - 1], params, e })
            
        } else if (k === 'toPrice()' || k === 'price()') {
            
            answer = o = toPrice(toNumber(o))
            
        } else if (k === 'toNumber()' || k === 'number()' || k === 'num()') {

            answer = toNumber(o)
            
        } else if (k === 'toString()' || k === 'string()' || k === 'str()') {
            
            answer = o + ""
            
        } else if (k === '1stIndex()' || k === 'firstIndex()' || k === "1stElement()" || k === "1stEl()") {
            
            if (value !== undefined && key) answer = o[0] = value
            answer = o[0]
            
        } else if (k === '2ndIndex()' || k === 'secondIndex()' || k === "2ndElement()" || k === "2ndEl()") {
            
            if (value !== undefined && key) answer = o[1] = value
            answer = o[1]

        } else if (k === '3rdIndex()' || k === 'thirdIndex()' || k === "3rdElement()" || k === "3rdEl()") {
            
            if (value !== undefined && key) answer = o[2] = value
            answer = o[2]

        } else if (k === '3rdLastIndex()' || k === '3rdlastIndex()' || k === "3rdLastElement()" || k === "3rdLastEl()") {

            if (value !== undefined && key) answer = o[o.length - 3] = value
            answer = o[o.length - 3]
            
        } else if (k === '2ndLastIndex()' || k === '2ndlastIndex()' || k === "2ndLastElement()" || k === "2ndLastEl()") {

            if (value !== undefined && key) answer = o[o.length - 2] = value
            answer = o[o.length - 2]
            
        } else if (k === 'lastIndex()' || k === "lastElement()" || k === "lastEl()") {

            if (value !== undefined && key) answer = o[o.length - 1] = value
            answer = o[o.length - 1]
            
        } else if (k === 'parseFloat()') {
            
            answer = parseFloat(o)

        } else if (k === 'parseInt()') {
            
            answer = parseInt(o)

        } else if (k === 'stringify()') {
            
            answer = JSON.stringify(o)

        } else if (k === 'parse()') {
            
            answer = JSON.parse(o)

        } else if (k === 'split()') {
            
            breakRequest = i + 1
            var splited = toValue({ VALUE, STATE, id, e, _, params: { value: path[i + 1], params } })
            answer = o.split(splited)

        } else if (k === 'type()') {
            
            if (typeof o === 'string') answer = 'string'
            else if (typeof o === 'boolean') answer = 'boolean'
            else if (typeof o === 'object' && Array.isArray(o)) answer = 'array'
            else if (typeof o === 'object') answer = 'object'
            else if (typeof o === 'undefined') answer = 'undefined'
            
        } else if (k === 'join()') {
            
            breakRequest = i + 1
            var joiner = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1] || '', params} , _})
            answer = o.join(joiner)
            
        } else if (k === 'clean()') {
            
            answer = o.filter(o => o !== undefined && !Number.isNaN(o) && o !== '')
            
        } else if (k === 'preventDefault()') {
            
            answer = o.preventDefault()

        } else if (k === '()') {

            answer = VALUE[o]

        } else if (k === 'isChildOf()') {
            
            breakRequest = i + 1
            var el = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, _, e })
            answer = isEqual(el, o)

        } else if (k === 'isChildOfId()') {
            
            breakRequest = i + 1
            var _id = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, _, e })
            var _ids = Object.keys(getDeepChildren({ VALUE, id: _id }))
            answer = _ids.find(_id => _id === o)

        } else if (k === 'allChildren()') { // all values of local element and children elements in object formula
            
            answer = getDeepChildren({ VALUE, id })

        } else if (k === 'addClass()') {
            
            breakRequest = true
            answer = o.classList.add(path.slice(i + 1).join('.'))

        } else if (k === 'removeClass()') {
            
            breakRequest = true
            answer = o.classList.remove(path.slice(i + 1).join('.'))

        } else if (k === 'element' && local && local.status === 'loading') {

            breakRequest = true
            local.controls = toArray(local.controls) || []
            if (value !== undefined) return local.controls.push({
                event: `loaded?${key}=${value}`
            })
            
        } else if (k === 'length' && !local.length && i === 0) {
            
            answer = VALUE[local.parent].element.children.length

        } else if (key && value !== undefined && i === lastIndex) {
            
            answer = o[k] = value

        } else if (key && o[k] === undefined && i !== lastIndex) {

            if (!isNaN(path[i + 1])) answer = o[k] = []
            else answer = o[k] = {}

        } else answer = o[k]
        
        return answer

    }, object)
    
    return answer
}

const getDeepChildren = ({ VALUE, id }) => {
    var all = { [id]: VALUE[id] }
    if (!VALUE[id]) return {}
    
    if ([...VALUE[id].element.children].length > 0) 
        ([...VALUE[id].element.children]).map(el => {

            if ([...VALUE[el.id].element.children].length > 0) 
                all = { ...all, ...getDeepChildren({ VALUE, id }) }

            else all[el.id] = VALUE[el.id]
        })
    return all
}

const getDeepChildrenId = ({ VALUE, id }) => {
    var all = [id]
    if (!VALUE[id]) return []
    
    if ([...VALUE[id].element.children].length > 0) 
        ([...VALUE[id].element.children]).map(el => {

            if ([...VALUE[el.id].element.children].length > 0) 
                all.push(...getDeepChildren({ VALUE, id }))

            else all.push(el.id)
        })
    return all
}

module.exports = { reducer, getDeepChildren, getDeepChildrenId }