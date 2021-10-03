const play = ({VALUE, id}) => {
  const local = VALUE[id];
  const myFn = () => {
    local.element.style.transform = "translateY(-200%)";
  };

  local["note-timer"] = setTimeout(myFn, 5000);
};

module.exports = {play};
