const { derive } = require("./derive")
const { toArray } = require("./toArray")

const reducer = ({ VALUE, STATE, id, params: { path, object, value, key }, e }) => {

    var local = VALUE[id]
    var breakRequest
    var lastIndex = path.length - 1

    var answer = path.reduce((o, k, i) => {
                    
        // break method
        if (breakRequest) return
        
        // set Value
        if (key && i === lastIndex) return o[k] = value

        if (!o) return o

        if (k === 'data') {

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

        } else if (k === 'keys') {
            
            answer = Object.keys(o)

        } else if (k === 'values') {
            
            answer = Object.values(o)

        } else if (k === 'toLowerCase()') {
            
            answer = o.toLowerCase()

        } else if (k === 'length()') {
            
            answer = o.length
            
        } else if (k === 'flat()') {
            
            answer = Array.isArray(o) ? o.flat() : o

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
        
        // create an inner reducer
        if (Array.isArray(o) && isNaN(k) && answer === undefined) {

            var keys = path.slice(i - path.length)

            var flat = o.includes('flat()')

            // reduce every element in array
            var valueO = o.map(newO => {
                return reducer({ VALUE, STATE, id, params: { path: keys, object: newO }})
            })

            if (flat) valueO = valueO.flat()

            // create a template object
            var templateO = {}

            // slice the current key
            keys = keys.slice(0, i)

            // create an object to work for the rest keys for reduce
            keys.reduce((o, k, i) => {
                if (i === keys.length - 1) return templateO[k] = valueO
                return o[k] = {}
            }, templateO)
            if (keys.length === 0) templateO = valueO
            
            answer = templateO
        }
        
        return answer

    }, object)
    
    return answer
}

module.exports = { reducer }