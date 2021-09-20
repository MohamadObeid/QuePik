const { derive } = require("./derive")
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { capitalize } = require("./capitalize")
const { toCode } = require("./toCode")

const reducer = ({ VALUE, STATE, id, params: { path, value, key, params, object }, e }) => {
    const { toValue } = require("./toValue")
    const { execute } = require("./execute")

    var local = VALUE[id], breakRequest

    if (path[1]) path = toCode({ VALUE, STATE, id, string: path.join('.'), e }).split('.')
    
    if (!object) {
        
        object = path[0] === 'value' ? VALUE[id]
        : path[0] === 'state' ? STATE 
        : path[0] === 'e' ? e
        : path[0] === 'params' ? params
        : false
        
        if (!object) {
            
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
                    
        // break method
        if (breakRequest === true || breakRequest === i) return o

        if (!o) return o
        
        // set Value
        if (key && i === lastIndex) return o[k] = value

        else if (k.includes('coded-')) {

            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: STATE.codes[k].split('.'), object: o, params } })

        } else if (k === 'data') {

            answer = derive(STATE[local.Data], local.derivations)[0]

        } else if (k === 'parent') {

            var parent = o.parent
            if (o.templated) parent = VALUE[parent].parent
            answer = VALUE[parent]

        } else if (k === 'next' || k === 'nextSibling') {

            var element = o.templated ? VALUE[o.parent].element : o.element
            var nextSibling = element.nextSibling
            var _id = nextSibling.id
            answer = VALUE[_id]

        } else if (k === 'prev' || k === 'prevSibling') {

            var element = o.templated ? VALUE[o.parent].element : o.element
            var previousSibling = element.previousSibling
            var _id = previousSibling.id
            answer = VALUE[_id]

        } else if (k === '1stChild') {
            
            var _id = o.element.children[0].id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]
            
        } else if (k === '2ndChild') {
            
            var _id = (o.element.children[1] || o.element.children[0]).id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === '3rdChild') {

            var _id = (o.element.children[2] || o.element.children[1] || o.element.children[0]).id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === 'lastChild') {

            var _id = o.element.children[o.element.children.length - 1].id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === 'INPUT') {

            var inputComps = [...o.element.getElementsByTagName(k)]
            inputComps = inputComps.map(comp => VALUE[comp.id])
            if (inputComps.length === 0) answer = inputComps[0]
            else answer = inputComps

        } else if (k === 'findIdByData') {

            answer = o.find(id => local.data === VALUE[id].text)

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
            
            answer = o[0]

        } else if (k === '2ndIndex()' || k === 'secondIndex()') {
            
            answer = o[1]

        } else if (k === '3rdIndex()' || k === 'thirdIndex()') {
            
            answer = o[2]

        } else if (k === 'lastIndex()') {
            
            answer = o[o.length - 1]

        } else if (k === 'value()') {
            
            answer = VALUE[o]

        } else if (k === 'length' && !local.length && i === 0) {
            
            answer = VALUE[local.parent].element.children.length

        } else if (k === 'element' && !o[k]) {

            breakRequest = true
            local.controls = toArray(local.controls) || []
            return local.controls.push({
                event: `load?${key}=JSON.parse(${JSON.stringify(value)})`
            })
            
        } else if (i === lastIndex - 1 && path[lastIndex] === 'delete') {
            
            breakRequest = true
            return delete o[k]

        } else if (!o[k] && key) {
                
            if (!isNaN(path[i + 1])) o[k] = []
            else o[k] = {}

        } else answer = o[k]
        
        return answer

    }, object)
    
    return answer
}

module.exports = { reducer }