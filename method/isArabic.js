var arabic = /[\u0600-\u06FF\u0750-\u077F]/

const isArabic = (value) => {
    if (typeof value === 'string' || typeof value === 'number') return arabic.test(value)

    if (!value) return
    var { VALUE, params = {}, id } = value
    var local = VALUE[id]

    var text = params.value || (local.type === 'Input' ? local.value : (local.type === 'Text' && local.text))
    if (!text) return 
    var result = arabic.test(text)

    if (result) {
        local.element.classList.add('arabic')
        local.element.style.textAlign = 'right'
        if (local['placeholder-ar']) local.element.placeholder = local['placeholder-ar']
    } else {
        if (local.element.className.includes('arabic')) local.element.style.textAlign = 'left'
        local.element.classList.remove('arabic')
        if (local['placeholder']) local.element.placeholder = local['placeholder']
    }
    return true
}

module.exports = {isArabic}