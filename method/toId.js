const { clone } = require("./clone");
const { toValue } = require("./toValue");

const toId = ({ VALUE, STATE, id, string, e }) => {
    if (typeof string === 'object') return string
    if (string) string = clone(string.split(';').map(newId => toValue({ VALUE, STATE, id, params: { value: newId }, e }) ).flat())
    else string = [id]
    
    return string
}

module.exports = {toId}