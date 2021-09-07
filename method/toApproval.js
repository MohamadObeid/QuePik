const { derive } = require("./derive")
const { isArabic } = require("./isArabic")
const { isEqual } = require("./isEqual")
const { generate } = require("./generate")
const { duplicates } = require("./duplicate")
const { clone } = require("./clone")
const { overflow } = require("./overflow")
const { getParam } = require("./getParam")
const { toId } = require("./toId")
const { toValue } = require("./toValue")

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

                    if (key.split('!')[0]) key = key.split('!')[0]
                    else {
                        // !key => study key without value
                        value = undefined
                        key = key.split('!')[1]
                    }
                    notEqual = true
                }

                ///////////////////// value /////////////////////
                
                if (value) value = toValue({ VALUE, STATE, id: mainId, params: { value }, e })

                ///////////////////// key /////////////////////

                // id
                if (key.includes('::')) {

                    id = key.split('::')[1]
                    key = key.split('::')[0]

                    // id
                    id = toId({ VALUE, STATE, string: id, id: local.id })[0]
                }

                var keygen = generate()
                var local = VALUE[id]
                if (!local) return approval = false

                if (key === 'false' || key === 'undefined') local[keygen] = false
                else if (key === 'true') local[keygen] = true
                else if (key.includes('.')) {
                    
                    var key0 = key.split('.')[0]
                    var key1 = key.split(`${key0}.`)[1]
                    if (key1 !== undefined) key1 = key1.split('.')

                    if (key0 === 'global') {
                        key0 = 'value'
                        local = VALUE[key1[0]]
                        key1 = key1.slice(1)
                    }

                    if (key0 === 'value' || key0 === 'state' || key0 === 'e') {

                        var object = key0 === 'value' ? clone(local) : key0 === 'e' && e
    
                        if (key0 === 'state') {
    
                            object = clone(STATE[key1[0]])
                            key1 = key1.slice(1)
    
                        }
                        
                        local[keygen] = key1.reduce((o, k, i) => {

                            if (o === undefined) return o
                            if ((k === 'key' || k === 'value') && key1[i - 1] === 'entries') return o

                            else if (k === 'data') {

                                return derive(STATE[local.Data], local.derivations)[0]

                            } else if (k === 'parent') {
                                
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

                            } else if (k === 'entries') {

                                return Object.entries(o).map(([key, value]) => {
                                    if (key1[i + 1] === 'key') return key
                                    if (key1[i + 1] === 'value') return value
                                })
                            }

                            return o[k]

                        }, object)
                    }

                    else if (key0 === 'const') {
                        
                        if (key1[0] === 'false' || key1[0] === 'undefined' || key1[0] === '') local[keygen] = false
                        else local[keygen] = key1.join('.')
                        
                    }

                } else if (key === 'isArabic') {

                    var result = isArabic(local.type === 'Input' ? local.value : (local.type === 'Text' && local.text))
                    local[keygen] = result

                } else if (key === 'duplicates') {

                    var data = getParam(`?${params}`, 'data=', false)
                    local[keygen] = duplicates({ STATE, VALUE, params: { data }, id })

                } else if (key === 'overflow') {

                    local[keygen] = overflow({ VALUE, id })[0]
                    
                } else local[keygen] = clone(local[key])

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

                    id = key.split('::')[1]
                    key = key.split('::')[0]

                    // id
                    id = toId({ VALUE, STATE, string: id, id: local.id })[0]
                }

                var local = VALUE[id]
                if (!local) return approval = false

                if (key === 'length') {

                    if (!local.element.parentElement) return approval = false
                    return approval = local.element.parentElement.children.length > value

                } else if (key.includes('.')) {

                    var key0 = key.split('.')[0]
                    var key1 = key.split(`${key0}.`)[1]
                    if (key1) key1 = key1.split('.')
                    key = generate()

                    if (key0 === 'state') {
                        local[key] = STATE[key1]
                    }

                    else if (key0 === 'value') {

                        if (key1[0] === 'data') {

                            key1 = key1.slice(1)
                            var length
                            if (key1.slice(-1)[0] === 'length') {
                                key1 = key1.slice(0, -1)
                                length = true
                            }
                            var data = derive(STATE[local.Data], [...local.derivations, ...key1])[0]
                            local[key] = data
                            if (length) local[key] = data.length

                        }
                        else if (key1[0] === 'Data') {

                            key1 = key1.slice(1)
                            var length
                            if (key1.slice(-1)[0] === 'length') {
                                key1 = key1.slice(0, -1)
                                length = true
                            }
                            var data = derive(STATE[local.Data], key1)[0]
                            local[key] = data
                            if (length) local[key] = data.length

                        }
                        else if (key1[0] === 'length') {
                            local[key] = local.length
                        }
                        else {

                            local[key] = key1.reduce((o, k, i) => {

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

                                } else if (k === 'firstChild') {

                                    var firstChild = o.element.children[0]
                                    return VALUE[firstChild.id]
                                    
                                } else if (k === 'secondChild') {

                                    var secondChild = o.element.children[1] ? o.element.children[1] : o.element.children[0]
                                    return VALUE[secondChild.id]

                                } else if (k === 'lastChild') {

                                    var lastChild = o.element.children[o.element.children.length - 1]
                                    return VALUE[lastChild.id]

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
                    }
                }

                approval = local[key] > value
            }
        } else return approval
    })

    return approval
}

module.exports = {toApproval}