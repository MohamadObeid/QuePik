const _controls = require('../controls/_controls')

const createActions = ({ VALUE, STATE, params, id }) => {
    
    const { execute } = require('./execute')
    
    if (!params.type) return
    var actions = _controls[params.type]({ VALUE, STATE, params, id })

    execute({ VALUE, STATE, actions, id })
}

module.exports = {createActions}