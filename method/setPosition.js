const setPosition = ({ VALUE, params, id }) => {
    
    var position = params.position
    var element = VALUE[id].element
    
    if (!VALUE[position.id]) return
    var list = VALUE[position.id].element
    var fin = list.getElementsByClassName('list-fin')[0]

    var top, left, bottom, distance, placement
    var height = list.offsetHeight
    var width = list.offsetWidth

    placement = list.placement || position.placement || 'right'
    distance = parseFloat(list.distance || position.distance || 10)

    if (placement === 'right') {

        left = element.getBoundingClientRect().right + distance
        top = element.getBoundingClientRect().top + element.clientHeight / 2 - height / 2

        if (fin) {
            fin.style.right = 'unset'
            fin.style.left = '-0.5rem'
            fin.style.top = 'unset'
            fin.style.bottom = 'unset'
            fin.style.borderRadius = '0 0 0 0.4rem'
        }

    }

    else if (placement === 'left') {

        left = element.getBoundingClientRect().left - distance - width
        top = element.getBoundingClientRect().top + element.clientHeight / 2 - height / 2

        if (fin) {
            fin.style.right = '-0.5rem'
            fin.style.left = 'unset'
            fin.style.top = 'unset'
            fin.style.bottom = 'unset'
            fin.style.borderRadius = '0 0.4rem 0 0'
        }
    }

    else if (placement === 'top') {

        top = element.getBoundingClientRect().top - height - distance
        left = element.getBoundingClientRect().left + (element.clientWidth / 2) - (width / 2)

        if (fin) {
            fin.style.right = 'unset'
            fin.style.left = 'unset'
            fin.style.top = 'unset'
            fin.style.bottom = '-0.5rem'
            fin.style.borderRadius = '0 0 0.4rem 0'
        }
    }

    else if (placement === 'bottom') {

        top = element.getBoundingClientRect().top + element.clientHeight + 10
        left = element.getBoundingClientRect().left + (element.clientWidth / 2) - (width / 2)

        if (fin) {
            fin.style.right = 'unset'
            fin.style.left = 'unset'
            fin.style.top = '-0.5rem'
            fin.style.bottom = 'unset'
            fin.style.borderRadius = '0 0.4rem 0 0'
        }
    }

    bottom = top + height

    if (top - 10 < 0) {

        if (fin) fin.style.top = height / 2 - 5 - 10 + top + 'px'
        top = 10

    } else if (bottom + 10 > window.innerHeight) {

        if (fin) fin.style.top = height / 2 - (fin ? 5 : 0) + 10 + bottom - window.innerHeight + 'px'
        top = window.innerHeight - 10 - height

    } else {
        if (fin) fin.style.top = 'unset'
    }

    list.style.top = top + 'px'
    list.style.left = left + 'px'
}

module.exports = {setPosition}