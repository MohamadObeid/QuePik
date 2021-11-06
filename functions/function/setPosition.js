const setPosition = ({ VALUE, params, id }) => {

  var position = params.position
  var leftDeviation = position.left
  var topDeviation = position.top
  var element = VALUE[id].element
  var fin = element.getElementsByClassName("fin")[0]

  if (!VALUE[position.positioner]) return
  var positioner = VALUE[position.positioner].element
  
  // set height to fit content
  element.style.height = VALUE[element.id].style.height

  var top 
  var left 
  var bottom 
  var distance 
  var placement
  var height = element.offsetHeight
  var width = element.offsetWidth

  placement = element.placement || position.placement || "right"
  distance = parseFloat(element.distance || position.distance || 10)

  if (placement === "right") {

    left = positioner.getBoundingClientRect().right + distance
    top =
      positioner.getBoundingClientRect().top +
      positioner.clientHeight / 2 -
      height / 2
      
    if (fin) {
      fin.style.right = "unset"
      fin.style.left = "-0.5rem"
      fin.style.top = "unset"
      fin.style.bottom = "unset"
      fin.style.borderRadius = "0 0 0 0.4rem"
    }

  } else if (placement === "left") {
    
    left = positioner.getBoundingClientRect().left - distance - width
    top =
      positioner.getBoundingClientRect().top +
      positioner.clientHeight / 2 -
      height / 2
      
    if (fin) {
      fin.style.right = "-0.5rem"
      fin.style.left = "unset"
      fin.style.top = "unset"
      fin.style.bottom = "unset"
      fin.style.borderRadius = "0 0.4rem 0 0"
    }

  } else if (placement === "top") {

    top = positioner.getBoundingClientRect().top - height - distance
    left =
      positioner.getBoundingClientRect().left +
      positioner.clientWidth / 2 -
      width / 2

    if (fin) {
      fin.style.right = "unset"
      fin.style.left = "unset"
      fin.style.top = "unset"
      fin.style.bottom = "-0.5rem"
      fin.style.borderRadius = "0 0 0.4rem 0"
    }

  } else if (placement === "bottom") {

    top = positioner.getBoundingClientRect().top + positioner.clientHeight + 10
    left =
      positioner.getBoundingClientRect().left +
      positioner.clientWidth / 2 -
      width / 2

    if (fin) {
      fin.style.right = "unset"
      fin.style.left = "unset"
      fin.style.top = "-0.5rem"
      fin.style.bottom = "unset"
      fin.style.borderRadius = "0 0.4rem 0 0"
    }
  }
  
  // deviation
  if (topDeviation) top = top + topDeviation
  if (leftDeviation) left = left + leftDeviation

  bottom = top + height

  if (top - 10 < 0) {

    if (fin) fin.style.top = height / 2 - 5 - 10 + top + "px"

    element.style.top = 10 + 'px'
    element.style.bottom = (10 + height) + 'px'
    
    if (20 + height >= window.innerHeight) {
      element.style.height = 'initial'
      element.style.bottom = 10 + "px"
    }

  } else if (bottom + 10 > window.innerHeight) {

    if (fin) fin.style.top = height / 2 - (fin ? 5 : 0) + 10 + bottom - window.innerHeight + "px"
    
    element.style.bottom = 10 + 'px'
    element.style.top = (window.innerHeight - 10 - height) + 'px'
    
    if (window.innerHeight - 20 - height <= 0) {
      element.style.height = 'initial'
      element.style.top = 10 + "px"
    }

  } else {

    element.style.top = top + 'px'
    element.style.bottom = bottom
  }

  element.style.left = left + "px"
  if (fin) fin.style.top = "unset"
}

module.exports = {setPosition}
