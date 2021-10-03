const overflow = ({VALUE, params, id}) => {
  const local = VALUE[id];

  const width = local.element.clientWidth;
  const height = local.element.clientHeight;
  let text;

  if (local.type === "Input" || local.type === "Textarea") {
    text = local.element.value;
  } else if (
    local.type === "Text" ||
    local.type === "Label" ||
    local.type === "Header"
  ) {
    text = local.element.innerHTML;
  } else if (local.type === "UploadInput") text = local.element.value;

  // create a test div
  let lDiv = document.createElement("div");

  document.body.appendChild(lDiv);

  const pStyle = local.element.style;
  const pText = local.data || local.input.value || "";
  const pFontSize = pStyle.fontSize;

  if (pStyle != null) {
    lDiv.style = pStyle;
  }

  lDiv.style.fontSize = pFontSize;
  lDiv.style.position = "absolute";
  lDiv.style.left = -1000;
  lDiv.style.top = -1000;
  lDiv.style.padding = pStyle.padding;

  lDiv.innerHTML = pText;

  const lResult = {
    width: lDiv.clientWidth,
    height: lDiv.clientHeight,
  };

  document.body.removeChild(lDiv);
  lDiv = null;

  let overflowX; let overflowY;
  if (width < lResult.width) overflowX = true;
  if (height < lResult.height) overflowY = true;

  return [overflowX, overflowY];
};

module.exports = {overflow};
