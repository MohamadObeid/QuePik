const setPosition = ({VALUE, params, id}) => {
  const position = params.position;
  const element = VALUE[id].element;

  if (!VALUE[position.id]) return;
  const list = VALUE[position.id].element;
  const fin = list.getElementsByClassName("list-fin")[0];

  // set height to fit content
  list.style.height = VALUE[list.id].style.height

  let top; let left; let bottom; let distance; let placement;
  const height = list.offsetHeight;
  const width = list.offsetWidth;

  placement = list.placement || position.placement || "right";
  distance = parseFloat(list.distance || position.distance || 10);

  if (placement === "right") {
    left = element.getBoundingClientRect().right + distance;
    top =
      element.getBoundingClientRect().top +
      element.clientHeight / 2 -
      height / 2;

    if (fin) {
      fin.style.right = "unset";
      fin.style.left = "-0.5rem";
      fin.style.top = "unset";
      fin.style.bottom = "unset";
      fin.style.borderRadius = "0 0 0 0.4rem";
    }
  } else if (placement === "left") {
    left = element.getBoundingClientRect().left - distance - width;
    top =
      element.getBoundingClientRect().top +
      element.clientHeight / 2 -
      height / 2;

    if (fin) {
      fin.style.right = "-0.5rem";
      fin.style.left = "unset";
      fin.style.top = "unset";
      fin.style.bottom = "unset";
      fin.style.borderRadius = "0 0.4rem 0 0";
    }
  } else if (placement === "top") {
    top = element.getBoundingClientRect().top - height - distance;
    left =
      element.getBoundingClientRect().left +
      element.clientWidth / 2 -
      width / 2;

    if (fin) {
      fin.style.right = "unset";
      fin.style.left = "unset";
      fin.style.top = "unset";
      fin.style.bottom = "-0.5rem";
      fin.style.borderRadius = "0 0 0.4rem 0";
    }
  } else if (placement === "bottom") {
    top = element.getBoundingClientRect().top + element.clientHeight + 10;
    left =
      element.getBoundingClientRect().left +
      element.clientWidth / 2 -
      width / 2;

    if (fin) {
      fin.style.right = "unset";
      fin.style.left = "unset";
      fin.style.top = "-0.5rem";
      fin.style.bottom = "unset";
      fin.style.borderRadius = "0 0.4rem 0 0";
    }
  }

  bottom = top + height;

  if (top - 10 < 0) {

    if (fin) fin.style.top = height / 2 - 5 - 10 + top + "px";

    list.style.top = 10 + 'px'
    list.style.bottom = (10 + height) + 'px'
    
    if (20 + height >= window.innerHeight) {
      list.style.height = 'initial'
      list.style.bottom = 10 + "px";
    }

  } else if (bottom + 10 > window.innerHeight) {

    if (fin) fin.style.top = height / 2 - (fin ? 5 : 0) + 10 + bottom - window.innerHeight + "px";
    
    list.style.bottom = 10 + 'px'
    list.style.top = (window.innerHeight - 10 - height) + 'px'
    
    if (window.innerHeight - 20 - height <= 0) {
      list.style.height = 'initial'
      list.style.top = 10 + "px";
    }

  } else {
    list.style.top = top + 'px'
    list.style.bottom = bottom
  }

  list.style.left = left + "px";
  if (fin) fin.style.top = "unset";
};

module.exports = {setPosition};
