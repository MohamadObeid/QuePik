const { derive } = require("./derive")

const reducer = ({ VALUE, STATE, id, params: { path, object } }) => {
    var local = VALUE[id]

    var answer = path.reduce((o, k, i) => {
        
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

        } else if (k === 'length' && !local.length && i === 0) {
            
            answer = VALUE[local.parent].element.children.length

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