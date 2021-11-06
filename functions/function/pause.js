const pause = ({VALUE, id}) => {
  const local = VALUE[id];
  clearTimeout(local["note-timer"]);
};

module.exports = {pause};
