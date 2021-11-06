const setElement = ({ VALUE, id }) => {

    var local = VALUE[id]
    if (!local) return delete VALUE[id]

    // status
    local.status = "Mounting Element"
    
    local.element = document.getElementById(id)
    if (!local.element) return delete VALUE[id]

    // run starter for children
    var children = [...local.element.children]
    
    children.map(el => {
        const id = el.id
        if (!id) return
        setElement({ VALUE, id })
    })
}
    
module.exports = {setElement}