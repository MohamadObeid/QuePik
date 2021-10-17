module.exports = {
  fill: ({ VALUE, STATE, id }) => {
    const local = VALUE[id]

    if (local.element) {
      if (local.type !== "Image") {

        var imageEls = [...local.element.getElementsByTagName("IMG")]
        if (imageEls.length === 0) return

      } else imageEls = [local.element]

      const myFn = (el) => {
        
        const local = VALUE[el.id]
        console.log("fill", el);
        const parentWidth = VALUE[local.parent].element.clientWidth
        const parentHeight = VALUE[local.parent].element.clientHeight

        var width = local.element.offsetWidth
        var height = local.element.offsetHeight

        if (
          (width / parentWidth <= 1 && width / parentWidth >= 0.99) ||
          (height / parentHeight <= 1 && height / parentHeight >= 0.99)
        ) return

        var ratio = (height / parentHeight) > (width / parentWidth)
        
        if (ratio) {

          local.element.style.width = parentWidth + 'px'
          local.element.style.height = (height * parentWidth / width) + 'px'
        
        }  else {
          
          local.element.style.height = parentHeight + 'px'
          local.element.style.width = (width * parentHeight / height) + 'px'

        }
      }

      imageEls.map(el => el.onload = myFn(el))
    }
  }
}
