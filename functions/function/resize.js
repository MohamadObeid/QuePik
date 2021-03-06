const resize = ({VALUE, id}) => {
  var local = VALUE[id];
  if (!local) return;

  if (local.type !== "Input") return;

  const results = dimensions({VALUE, id});

  // for width
  const width = local.style.width;
  if (width === "fit-content") {
    if (local.element) {

      if (!local.style || (local.style && !local.style.minWidth)) {
        local.element.style.width = results.width + "px";
      } else if (converter(local.style.minWidth) > results.width) {
        local.element.style.width = local.style.minWidth;
      } else local.element.style.width = results.width + "px";

      // templated
      if (local.templated) {
        var local = VALUE[VALUE[id].parent];

        if (!local.style || (local.style && !local.style.minWidth)) {
          local.element.style.width = results.width + "px";
        } else if (converter(local.style.minWidth) > results.width) {
          local.element.style.width = local.style.minWidth;
        } else local.element.style.width = results.width + "px";
      }
    } else results.width + "px";
  } else local.style.width;

  // for height
  const height = local.style.height;
  if (height === "fit-content") {
    
    if (local.element) {

      if (!local.style || (local.style && !local.style.minHeight)) {
        local.element.style.height = results.height + "px";
      } else if (converter(local.style.minHeight) > results.height) {
        local.element.style.height = local.style.minHeight;
      } else local.element.style.height = results.height + "px";

      // templated
      if (local.templated) {
        var local = VALUE[VALUE[id].parent];

        if (!local.style || (local.style && !local.style.minHeight)) {
          local.element.style.height = results.height + "px";
        } else if (converter(local.style.minHeight) > results.height) {
          local.element.style.height = local.style.minHeight;
        } else local.element.style.height = results.height + "px";
      }
    } else results.height + "px";
  } else local.style.height;
};

const dimensions = ({VALUE, id, params = {}}) => {
  const local = VALUE[id]
  if (!local) return

  let lDiv = document.createElement("div")
  document.body.appendChild(lDiv)

  const pStyle = local.style
  const pText = params.text || (local.input && local.element.value) || "A"
  const pFontSize = pStyle.fontSize
  
  if (pStyle != null) lDiv.style = pStyle

  lDiv.style.fontSize = pFontSize
  lDiv.style.position = "absolute"
  lDiv.style.left = -1000
  lDiv.style.top = -1000
  lDiv.style.padding = pStyle.padding
  lDiv.style.maxWidth = pStyle.maxWidth
  lDiv.style.maxHeight = pStyle.maxHeight
  lDiv.style.transform = pStyle.transform
  lDiv.style.display = "flex"
  lDiv.style.flexWrap = "wrap"

  if (pStyle.width === "100%") {
    lDiv.style.width = local.element.clientWidth + "px"
  }
  lDiv.style.width = (lDiv.clientWidth + 2) + "px"

  lDiv.innerHTML = pText

  const lResult = {
    width: lDiv.clientWidth,
    height: lDiv.clientHeight,
  }

  document.body.removeChild(lDiv)
  lDiv = null

  return lResult
}

const converter = (dimension) => {
  if (!dimension) return 0
  if (dimension.includes("rem")) return parseFloat(dimension) * 10
  if (dimension.includes("px")) return parseFloat(dimension)
}

module.exports = {resize, dimensions}
