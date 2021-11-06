const blur = ({VALUE, id}) => {
  const local = VALUE[id];
  if (!local) return;

  const isInput = local.type === "Input" || local.type === "Textarea";
  if (isInput) local.element.blur();
  else {
    if (local.element) {
      let childElements = local.element.getElementsByTagName("INPUT");
      if (childElements.length === 0) {
        childElements = local.element.getElementsByTagName("TEXTAREA");
      }
      if (childElements.length > 0) {
        childElements[0].blur();
      }
    }
  }
};

module.exports = {blur};
