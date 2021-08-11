const clearIntervals = ({ VALUE, id }) => {
    var local = VALUE[id]

    local.childrenSiblings && local.childrenSiblings.map(id => {

        Object.entries(VALUE[id]).map(([key, value]) => {
            if (key.includes('-timer')) setTimeout(() => clearTimeout(value), 1000)
        })

        clearIntervals({ VALUE, id })
    })
}

module.exports = {clearIntervals}