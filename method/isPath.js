module.exports = {
    isPath: ({ VALUE, STATE, id, e, params: { path } }) => {
        path = path.split('.')

        if (path.length === 1 || path.length === 0) return false
        else if (/\d/.test(path[0]) 
            || /\s/.test(path[0]) 
            || path[1] && (path[1].includes('rem') || path[1].includes('px'))
        ) return false
        return true
    }
}