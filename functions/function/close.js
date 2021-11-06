const close = ({VALUE, id}) => {
  const local = VALUE[id];
  clearTimeout(local["note-timer"]);
  local.element.style.transform = "translateY(-200%)";
};

module.exports = {close};
