const { isArabic } = require("./isArabic")
const { isEqual } = require("./isEqual")
const { generate } = require("./generate")
const { duplicates } = require("./duplicate")
const { overflow } = require("./overflow")
const { getParam } = require("./getParam")
const { toValue } = require("./toValue")
const { reducer } = require("./reducer")
const { toPath } = require("./toPath")

const toApproval = ({ STATE, VALUE, e, string, params, id }) => {
    var mainId = id

    if (!string || typeof string !== 'string') return true
    var approval = true

    string.split(';').map(condition => {
        if (approval) {

            var local = VALUE[mainId]
            id = mainId

            // no condition
            if (condition === '') return

            var eq = condition.includes('=')
            var gt = condition.includes('>')
            if (gt) {
                var test = condition.split('::')
                gt = test.find(exp => exp.includes('>'))
            }
            var gte = condition.includes('>=')
            var lt = condition.includes('<')
            var lte = condition.includes('<=')
            var noOperator = false

            if (!eq && !gt && !gte && !lt && !lte) noOperator = true

            if ((eq && !gte && !lte) || (!eq && !gt && !gte && !lt && !lte) || noOperator) {

                var minus, plus, times, division, notEqual

                condition = condition.split('=')
                var key = condition[0]
                var value = condition[1]
                
                // ex: key1=string1=string2=string3
                if (condition[2]) {
                    condition[1] = condition[1].split('||')

                    // ex: key1=value1||key2=value2||key3=value3
                    if (condition[1].length > 1) {
                        condition[2] = condition.slice(2, condition.length).join('=')
                        approval = toApproval({ VALUE, STATE, e, string: `${condition[0]}=${condition[1][0]}`, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        key = condition[1][1]
                        value = condition.slice(2).join('=')
                        string = `${key}=${value}`
                        return approval = toApproval({ VALUE, STATE, e, string, id})
                    }

                    // ex: key=value1=value2=value3
                    else {
                        condition[2] = condition.slice(2, condition.length).join('=')
                        
                        // key!=value1!=value2!=value3
                        if (key.slice(-1) === '!') 
                        if (condition[2].slice(-1) === '!') 
                        condition[2] = condition[2].slice(0, -1)
                        
                        approval = toApproval({ VALUE, STATE, e, string: `${key}=${condition[2]}`, id })
                        if (!approval) return

                        // approval is true till now => keep going
                        if (key.slice(-1) === '!') 
                        if (value.slice(-1) === '!') 
                        value = value.slice(0, -1)
                    }
                }


                else if (value) {
                    value = value.split('||')

                    if (value.length === 1) value = value[0]

                    else if (value[1]) {

                        // ex: key1=value1||key2=value2...
                        if (value[1].includes('=')) {
                            
                            var string = `${key}=${value[0]}`
                            approval = toApproval({ VALUE, STATE, e, string, id })
                            if (approval) return

                            string = value.slice(1).join('||')
                            return approval = toApproval({ VALUE, STATE, e, string, id })
                        }

                        // ex: key=value1||value2||value3
                        value[1] = value.slice(1, value.length).join('||')
                        var string = `${key}=${value[1]}`
                        approval = toApproval({ VALUE, STATE, e, string, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        value = value[0]
                    }
                }


                if (key) {
                    key = key.split('||')

                    if (key.length === 1) key = key[0]

                    // ex. key1||key2||key3=value
                    else if (key[1]) {

                        key[1] = key.slice(1, key.length).join('||')
                        var string = `${key[1]}${value ? `=${value}` : ''}`
                        approval = toApproval({ VALUE, STATE, e, string, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        key = key[0]
                    }
                }

                // operator has !
                if (key.includes('!')) {

                    if (key.split('!')[0]) {

                        key = key.split('!')[0]
                        if (value) notEqual = true

                    } else {
                        // !key => study key without value
                        value = undefined
                        key = key.split('!')[1]
                        notEqual = true
                    }
                    
                }

                ///////////////////// value /////////////////////
                
                if (value && value !== 'undefined' && value !== 'false') 
                value = toValue({ VALUE, STATE, id: mainId, params: { value }, e })

                ///////////////////// key /////////////////////

                // id
                if (key.includes('::')) {

                    var newId = key.split('::')[1]
                    key = key.split('::')[0]

                    // id
                    id = toValue({ VALUE, STATE, id, params: { value: newId }, e })
                }

                var keygen = generate()
                var local = VALUE[id]
                if (!local) return approval = false

                // to path
                key = toPath({ VALUE, STATE, id, string: key, e })
                var path = typeof key === 'string' ? key.split('.') : []

                // const
                if (path[0] === 'const') {
                        
                    if (path[1] === 'false' || path[1] === 'undefined' || path[1] === '') local[keygen] = false
                    else local[keygen] = path.slice(1).join('.')
                    
                } else if (key === 'false' || key === 'undefined') local[keygen] = false
                else if (key === 'true') local[keygen] = true
                else if (path[1]) {

                    local[keygen] = reducer({ VALUE, STATE, id, params: { path, value }, e })

                } else if (key === 'isArabic') {

                    var isInput = local.type === 'Input' || local.type === 'Textarea'
                    var result = isArabic(isInput ? local.value : (local.type === 'Text' && local.text))
                    local[keygen] = result

                } else if (key === 'duplicates') {

                    var data = getParam(`?${params}`, 'data=', false)
                    local[keygen] = duplicates({ STATE, VALUE, params: { data }, id })

                } else if (key === 'overflow') {

                    local[keygen] = overflow({ VALUE, id })[0]
                    
                } else local[keygen] = local[key]

                if (plus) value = value + plus
                if (minus) value = value - minus
                if (times) value = value * times
                if (division) value = value / division
                
                if (!local) return approval = false
                
                if (value === undefined) approval = notEqual ? !local[keygen] : local[keygen]
                else {
                    if (value === 'undefined') value = undefined
                    if (value === 'false') value = false
                    if (value === 'true') value = true
                    approval = notEqual ? !isEqual(local[keygen], value) : isEqual(local[keygen], value)
                }

                delete local[keygen]

            } else if (gt && !gte) {

                var local = VALUE[id]
                var key = '', value = '', test = condition.split('::')

                if (test[1]) {

                    test.map(exp => {
                        if (exp.includes('>')) {

                            exp = exp.split('>')
                            key += exp[0]
                            value += exp[1]

                        }
                        else if (!value) key += exp + '::'
                        else value += '::' + exp
                    })

                } else {
                    key = condition.split('>')[0]
                    value = condition.split('>')[1]
                }

                ///////////////////// value /////////////////////
                
                value = toValue({ VALUE, STATE, id: mainId, params: { value }, e })

                ///////////////////// key /////////////////////

                // id
                if (key.includes('::')) {

                    var newId = key.split('::')[1]
                    key = key.split('::')[0]

                    // id
                    id = toValue({ VALUE, STATE, id, params: { value: newId }, e })
                }

                var local = VALUE[id]
                if (!local) return approval = false

                // to path
                key = toPath({ VALUE, STATE, id, string: key, e })
                var path = typeof key === 'string' ? key.split('.') : []

                if (path[1]) {

                    local[keygen] = reducer({ VALUE, STATE, id, params: { path, value }, e })
                }

                approval = local[keygen] > value
                delete local[keygen]
            }
        } else return approval
    })

    return approval
}

module.exports = {toApproval}