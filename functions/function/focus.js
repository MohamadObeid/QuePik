const focus = ({VALUE, id}) => {
  const local = VALUE[id];
  if (!local) return;

  const isInput = local.type === "Input" || local.type === "Textarea";
  if (isInput) local.element.focus();
  else {
    if (local.element) {
      let childElements = local.element.getElementsByTagName("INPUT");
      if (childElements.length === 0) {
        childElements = local.element.getElementsByTagName("TEXTAREA");
      }
      if (childElements.length > 0) {
        childElements[0].focus();
      }
    }
  }

  // focus to the end of input
  const value = local.element.value;
  local.element.value = "";
  local.element.value = value;
};

module.exports = {focus};
