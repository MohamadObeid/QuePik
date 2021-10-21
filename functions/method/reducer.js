const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toCode } = require("./toCode")
const { isEqual } = require("./isEqual")
const { capitalize } = require("./capitalize")
const { clone } = require("./clone")
const { toNumber } = require("./toNumber")
const { toPrice } = require("./toPrice")
const { dateTimeFormater } = require('./dateTimeFormater')

const reducer = ({ VALUE, STATE, id, params: { path, value, key, params, object }, e }) => {

    const { toValue } = require("./toValue")
    const { execute } = require("./execute")

    var local = VALUE[id], breakRequest

    if (path[1]) path = toCode({ VALUE, STATE, id, string: path.join('.'), e }).split('.')
    
    if (path[0] === 'global') {
        local = VALUE[path[1]]
        id = toValue({ VALUE, STATE, id, e, params: {value: path[1], params} })
        path = path.slice(1)
        path[0] = 'value'
    }
    
    if (!object) {
        
        object = path[0] === 'value' ? VALUE[id]
        : path[0] === 'state' ? STATE 
        : path[0] === 'e' ? e
        : path[0] === 'params' ? params
        : path[0] === 'any' ? toValue({ VALUE, STATE, id, params: { value: path[1], params }, e })
        : path[0] === 'document' ? document
        : path[0] === 'window' ? window
        : path[0] === 'history' ? history
        : false
        
        if (!object && path[0]) {

            if (path[0].includes('coded'))
            object = toValue({ VALUE, STATE, id, params: { value: STATE.codes[path[0]], params }, e })

            else if (path.join('.').includes(','))
            return object = toValue({ VALUE, STATE, id, params: { value: `[${path.join('.')}]`, params }, e })

            else if (path[0] === 'action')
            return execute({ VALUE, STATE, id, actions: path[1], params, e })

            else if (path[0] === '[]') object = []

            else if (path[0] === '{}') object = {}

            else if (path[0] === '[{}]') object = [{}]

            else if (path[0].includes('()')) object = VALUE
        }

        if (path[0] === 'any') path = path.slice(1)
        if (object) path = path.slice(1)
        else return path.join('.')
    }
    
    var lastIndex = path.length - 1, opposite = false
    
    var answer = path.reduce((o, k, i) => {
        
        if (!isNaN(k)) k = k + ''
                    
        // break method
        if (breakRequest === true || breakRequest >= i) return o

        // equal()
        if (path[i + 1] === 'equal()') {
            
            breakRequest = true
            return answer = o[k] = toValue({ VALUE, STATE, id, params: { value: path.slice(i + 2).join("."), params }, e })
        }
        
        // if o is undefined ? ...
        if (k === 'else()') {
            
            breakRequest = i + 1
            var answer1 = o
            var answer2 = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            if (!answer1) answer = answer2
            else answer = answer1
            return answer
        }

        if (!o) return o
        
        // set Value

        if (k.includes('coded()')) {
            
            breakRequest = true
            var newValue = toValue({ VALUE, STATE, id, e, params: { value: STATE.codes[k], params } })
            newValue = [ ...newValue.toString().split('.'), ...path.slice(i + 1)]
            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: newValue, object: o, params } })

        } else if (k === 'data()') {

            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: local.derivations, object: STATE[local.Data], params } })
            if (i === lastIndex) {
                local.data = answer
                delete local['data()']
            }

        } else if (k === 'Data()') {

            answer = STATE[local.Data]

        } else if (k === "removeAttribute()") {

            breakRequest = i + 1
            var removed = toValue({ VALUE, STATE, id, e, params: { value: path[i+1], params } })
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

        } else if (k === 'child()') {

            breakRequest = i + 1
            var child = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params } })
            answer = o.child(child)
            
        } else if (k === 'clearTimeout()') {
            
            breakRequest = i + 1
            var clear = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            answer = clearTimeout(clear)
            
        } else if (k === 'setTimeout()') {
            
            breakRequest = i + 2
            var timer = parseInt(path[i + 2])
            var myFn = () => toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            answer = setTimeout(myFn, timer)

        } else if (k === 'delete()') {
            
            answer = o.delete()
            
        } else if (k === 'shift()') {

            answer = o.shift()

        } else if (k === 'slice()') {

            breakRequest = i + 1
            var sliced = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params } })
            answer = o.slice(sliced)

        } else if (k === 'replaceState()') {

            breakRequest = i + 1
            var replaced = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params } })
            answer = o.replaceState(null, STATE.page[STATE.host].title, replaced)

        } else if (k === 'pushState()') {

            breakRequest = i + 1
            var pushed = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params } })
            answer = o.pushState(null, STATE.page[STATE.host].title, pushed)

        } else if (k === '_param') {
            
            breakRequest = i + 1
            var param = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            answer = o + '>>' + param

        } else if (k === '_semi') {
            
            answer = o + ";"

        } else if (k === '_space') {
            
            breakRequest = i + 1
            var spaced = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            if (!path[i + 1]) spaced = ""
            answer = o + " " + spaced
            
        } else if (k === '_equal') {
            
            breakRequest = i + 1
            var added = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            if (!path[i + 1]) added = ""
            answer = o + "=" + added

        } else if (k === 'isEqual()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            answer = isEqual(o, b)
            
        } else if (k === 'greater()' || k === 'isgreater()' || k === 'isgreaterthan()' || k === 'isGreaterThan()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            answer = parseFloat(o) > parseFloat(b)
            
        } else if (k === 'less()' || k === 'isless()' || k === 'islessthan()' || k === 'isLessThan()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            answer = parseFloat(o) < parseFloat(b)
            
        } else if (k === 'isNot()') {
            
            breakRequest = i + 1
            var isNot = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            answer = !isEqual(o, isNot)
            
        } else if (k === 'abs()') {
            
            o = o.toString()

            var isPrice
            if (o.includes(',')) isPrice = true
            o = toNumber(o)

            answer = Math.abs(o)
            if (isPrice) answer = answer.toLocaleString()
            
        } else if (k === 'dividedBy()' || k === 'divide()' || k === 'divided()' || k === 'divideBy()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            
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
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            
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
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            
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
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e })
            
            o = o.toString()
            b = b.toString()
            
            var isPrice
            if (o.includes(',') || b.includes(',')) isPrice = true
            
            b = toNumber(b)
            o = toNumber(o)
            
            if (!isNaN(o) && !isNaN(b)) answer = o - b
            else answer = o.split(b)[0] - o.split(b)[1]
            if (isPrice) answer = answer.toLocaleString()

        } else if (k === 'dateTimeFormater()') {
            
            answer = dateTimeFormater({ VALUE, STATE, id, e, params: { dateTime: o, opposite } })
            opposite = false

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

        } else if (k === 'object()' || k === '{}') {
            
            answer = {}
            if (path[i + 1] === 'field()') {
                breakRequest = true
                var fields = path.slice(i + 1).join('.').split('field().').slice(1)
                fields.map(field => {
                    var f = toValue({ VALUE, STATE, id, params: { value: field.split('.')[0], params }, e })
                    var v = toValue({ VALUE, STATE, id, params: { value: field.split('.')[2], params }, e })
                    answer[f] = v
                })
            }

        } else if (k === 'push()') {
            
            breakRequest = i + 1
            var pushed = toValue({ VALUE, STATE, id, params: {value: path[i + 1], params}, e })
            o.push(pushed)
            answer = o

        } else if (k === 'pull()') {
            
            breakRequest = i + 1
            var pulled = toValue({ VALUE, STATE, id, params: {value: path[i + 1], params}, e })
            o.splice(pulled,1)
            answer = o

        } else if (k === 'keys()') {
            
            answer = Object.keys(o)
            
        } else if (k === 'key()') {
            
            answer = Object.keys(o)[0]
            
        } else if (k === 'values()') {
            
            answer = Object.values(o)

        } else if (k === 'value()') {
            
            answer = Object.values(o)[0]
            
        } else if (k === 'entries()') {
            
            answer = Object.entries(o).map(([k, v]) => ({ [k]: v }))

        } else if (k === 'toLowerCase()') {
            
            answer = o.toLowerCase()

        } else if (k === 'generate()') {
            
            answer = generate()

        } else if (k === 'includes()') {
            
            breakRequest = i + 1
            var included = toValue({ VALUE, STATE, id, e, params: { value: path[i+1], params } })
            answer = o.includes(included)
            
        } else if (k === 'capitalize()') {
            
            answer = capitalize(o)
            
        } else if (k === 'length()') {
            
            answer = o.length
            
        } else if (k === 'date()') {
            
            answer = new Date()

        } else if (k === 'toUTCString()') {
            
            if (!isNaN(o)) o = new Date(parseFloat(o))
            answer = o.toUTCString()
            
        } else if (k === 'setBeginning()') {
            
            answer = o.setHours(0,0,0,0)
            
        } else if (k === 'setEnding()') {
            
            answer = o.setHours(23,59,59,999)
            
        } else if (k === 'setTime()') {
            
            answer = new Date().setTime(o)
            
        } else if (k === 'getTime()') {
            
            answer = o.getTime()
            
        } else if (k === 'toDate()') {
            
            if (!isNaN(o)) o = new Date(parseFloat(o))
            answer = `${o.getDate()}-${o.getMonth()}-${o.getFullYear()}T${o.getHours()}:${o.getMinutes()}:${o.getSeconds()}`
            
        } else if (k === 'flat()') {
            
            answer = Array.isArray(o) ? o.flat() : o
            
        } else if (k === 'filterById()') {

            var notEqual = false
            breakRequest = i + 1

            if (path[i + 1] === '!') {
                breakRequest = i + 2
                notEqual = true
            }
            
            var newPath = notEqual ? path[i + 2] : path[i + 1]

            // get id
            var _id = reducer({ VALUE, STATE, id, params: { path: [newPath], value, key, params }, e })
            _id = toArray(_id)
            
            if (notEqual) answer = o.filter(data => _id.find(id => data.id === id) ? false : true )
            else answer = o.filter(data => _id.find(id => data.id === id))

        } else if (k === 'find()') {

            breakRequest = i + 1
            var found = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1], params} })
            answer = o.find(data => isEqual(found, data))

            // last index & value
            var index = o.findIndex(data => isEqual(found, data))
            if (index === -1) index = o.length
            if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            
        } else if (k === 'findById()') {

            breakRequest = i + 1
            // get id
            var _id = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1], params} })
            
            answer = o.find(data => data.id === _id)

            if (!answer) {
                o.push({ id : _id })
                answer = o[o.length - 1]
            }

            // last index & value
            var index = o.findIndex(data => data.id === _id)
            if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            
        } else if (k === 'findByName()') {

            breakRequest = i + 1
            // get id
            var name = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, e })
            
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
            var name = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, e })
            
            answer = o.find(data => data.name.en === name)
            
            if (!answer) {
                o.push({ name: {en: name} })
                answer = o[o.length - 1]
            }

            var index = o.findIndex(data => data.name.en === name)
            // last index & value
            if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            
        } else if (k === 'map()') {
            
            breakRequest = i + 1
            answer = o.map(o => reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], object: o, value, key, params }, e }) )

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
            
        } else if (k === 'toPrice()') {
            
            answer = o = toPrice(toNumber(o))
            
        } else if (k === 'toNumber()') {

            answer = toNumber(o)
            
        } else if (k === 'toString()') {

            answer = o + ""
            
        } else if (k === '1stIndex()' || k === 'firstIndex()') {
            
            if (value !== undefined && key) answer = o[0] = value
            answer = o[0]

        } else if (k === '2ndIndex()' || k === 'secondIndex()') {
            
            if (value !== undefined && key) answer = o[1] = value
            answer = o[1]

        } else if (k === '3rdIndex()' || k === 'thirdIndex()') {
            
            if (value !== undefined && key) answer = o[2] = value
            answer = o[2]

        } else if (k === '3rdLastIndex()' || k === '3rdlastIndex()') {

            if (value !== undefined && key) answer = o[o.length - 3] = value
            answer = o[o.length - 3]
            
        } else if (k === '2ndLastIndex()' || k === '2ndlastIndex()') {

            if (value !== undefined && key) answer = o[o.length - 2] = value
            answer = o[o.length - 2]
            
        } else if (k === 'lastIndex()') {

            if (value !== undefined && key) answer = o[o.length - 1] = value
            answer = o[o.length - 1]
            
        } else if (k === '!lastIndex()') {

            o = o.slice(0, -1)
            if (value !== undefined && key) o = value
            answer = o
            
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
            answer = o.split(path[i + 1])

        } else if (k === 'type()') {
            
            if (typeof o === 'string') answer = 'string'
            else if (typeof o === 'boolean') answer = 'boolean'
            else if (typeof o === 'object' && Array.isArray(o)) answer = 'array'
            else if (typeof o === 'object') answer = 'object'
            else if (typeof o === 'undefined') answer = 'undefined'
            
        } else if (k === 'join()') {
            
            breakRequest = i + 1
            var joiner = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1] || '', params} })
            answer = o.join(joiner)
            
        } else if (k === 'clean()') {
            
            answer = o.filter(o => o !== undefined && !Number.isNaN(o) && o !== '')
            
        } else if (k === 'preventDefault()') {
            
            answer = e.preventDefault()

        } else if (k === '()') {

            answer = VALUE[o]

        } else if (k === 'isChildOf()') {
            
            breakRequest = i + 1
            var el = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, e })
            answer = isEqual(el, o)

        } else if (k === 'isChildOfId()') {
            
            breakRequest = i + 1
            var _id = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, e })
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

        } else if (k === 'element' && local.status === 'loading') {

            breakRequest = true
            local.controls = toArray(local.controls) || []
            if (value !== undefined) return local.controls.push({
                event: `loaded?${key}=${value}`
            })
            
        } else if (k === 'length' && !local.length && i === 0) {
            
            answer = VALUE[local.parent].element.children.length

        } else if (i === lastIndex - 1 && path[lastIndex] === 'delete()') {
            
            breakRequest = i + 1
            if (Array.isArray(o)) {

                o.splice(k, 1)

            } else delete o[k]
            answer = o

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