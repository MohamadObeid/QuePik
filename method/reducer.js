const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toCode } = require("./toCode")
const { isEqual } = require("./isEqual")
const { capitalize } = require("./capitalize")

const reducer = ({ VALUE, STATE, id, params: { path, value, key, params, object }, e }) => {

    const { toValue } = require("./toValue")
    const { execute } = require("./execute")

    var local = VALUE[id], breakRequest

    if (path[1]) path = toCode({ VALUE, STATE, id, string: path.join('.'), e }).split('.')
    
    if (path[0] === 'global') {
        local = VALUE[path[1]]
        id = path[1]
        path = path.slice(1)
        path[0] = 'value'
    }
    
    if (!object) {
        
        object = path[0] === 'value' ? VALUE[id]
        : path[0] === 'state' ? STATE 
        : path[0] === 'e' ? e
        : path[0] === 'params' ? params
        : false
        
        if (!object && path[0]) {
            
            if (path[0].includes('coded')) 
            object = toValue({ VALUE, STATE, id, params: { value: STATE.codes[path[0]], params }, e })

            else if (path.join('.').includes(','))
            return object = toValue({ VALUE, STATE, id, params: { value: `[${path.join('.')}]`, params }, e })

            else if (path[0] === 'action')
            return execute({ VALUE, STATE, id, actions: path[1], params, e })
        }

        if (object) path = path.slice(1)
        else return path.join('.')
    }
    
    var lastIndex = path.length - 1
    
    var answer = path.reduce((o, k, i) => {
        if (!isNaN(k)) k = k + ''
                    
        // break method
        if (breakRequest === true || breakRequest === i) return o

        if (!o) return o
        
        // set Value

        if (k.includes('coded()')) {

            var _id = generate()
            VALUE[_id] = o
            answer = toValue({ VALUE, STATE, id: _id, e, params: { value: STATE.codes[k], params } })
            delete VALUE[_id]

        } else if (k === 'data()') {

            breakRequest = true
            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: [...local.derivations, ...path.slice(i + 1)], object: STATE[local.Data], params } })
            if (i === lastIndex) {
                local.data = answer
                delete local['data()']
            }

        } else if (k === 'Data()') {

            answer = STATE[local.Data]
            
        } else if (k === 'derive()') {

            breakRequest = true
            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: [...local.derivations, ...path.slice(i + 1)], object: o, params } })

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
                
                var id = el.id
                if (VALUE[id].component === 'Input') {

                    var _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
                    return VALUE[_id]

                } else return VALUE[id]
            })
            
        } else if (k === 'keys()') {
            
            answer = Object.keys(o)

        } else if (k === 'values()') {
            
            answer = Object.values(o)

        } else if (k === 'toLowerCase()') {
            
            answer = o.toLowerCase()

        } else if (k === 'generate()') {
            
            answer = generate()

        } else if (k === 'includes()') {
            
            answer = o.includes(value)
            
        } else if (k === 'capitalize()') {
            
            answer = capitalize(o)
            
        } else if (k === 'length()') {
            
            answer = o.length
            
        } else if (k === 'flat()') {
            
            answer = Array.isArray(o) ? o.flat() : o
            
        } else if (k === 'map()') {
            
            breakRequest = true
            answer = o.map(o => reducer({ VALUE, STATE, id, params: { path: path.slice(i + 1), object: o, value, key, params }, e }) )

        } else if (k === '1stIndex()' || k === 'firstIndex()') {
            
            if (value !== undefined && key) o[0] = value
            answer = o[0]

        } else if (k === '2ndIndex()' || k === 'secondIndex()') {
            
            if (value !== undefined && key) o[1] = value
            answer = o[1]

        } else if (k === '3rdIndex()' || k === 'thirdIndex()') {
            
            if (value !== undefined && key) o[2] = value
            answer = o[2]

        } else if (k === 'lastIndex()') {

            if (value !== undefined && key) o[o.length - 1] = value
            answer = o[o.length - 1]
            
        } else if (k === 'parseFloat()') {
            
            answer = parseFloat(o)

        } else if (k === 'parseInt()') {
            
            answer = parseInt(o)

        } else if (k === 'stringify()') {
            
            answer = JSON.stringify(o)

        } else if (k === 'parse()') {
            
            answer = JSON.parse(o)

        } else if (k === 'preventDefault()') {
            
            answer = e.preventDefault()

        } else if (k === 'value()') {

            answer = VALUE[o]

        } else if (k === 'isChildOf()') {
            
            breakRequest = true
            var el = reducer({ VALUE, STATE, id, params: { path: path.slice(i + 1), value, key, params }, e })
            answer = isEqual(el, o)

        } else if (k === 'isChildOfId()') {
            
            breakRequest = true
            var id = reducer({ VALUE, STATE, id, params: { path: path.slice(i + 1), value, key, params }, e })
            var ids = Object.keys(getDeepChildren({ VALUE, id }))
            answer = ids.find(_id => _id === o)

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
                event: `load?${key}=${value}`
            })
            
        } else if (k === 'length' && !local.length && i === 0) {
            
            answer = VALUE[local.parent].element.children.length

        } else if (i === lastIndex - 1 && path[lastIndex] === 'delete()') {
            
            breakRequest = true
            return delete o[k]

        } else if (key && i === lastIndex) {
            
            return o[k] = value

        } else if (!o[k] && key) {
            
            if (!isNaN(path[i + 1])) o[k] = []
            else o[k] = {}

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

module.exports = { reducer }