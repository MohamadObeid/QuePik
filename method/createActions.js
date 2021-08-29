const _control = require('../control/_control')

const createActions = ({ VALUE, STATE, params, id }) => {
    
    const { execute } = require('./execute')
    
    if (!params.type) return
    var actions = _control[params.type]({ VALUE, STATE, params, id })

    execute({ VALUE, STATE, actions, id })
}

module.exports = {createActions}