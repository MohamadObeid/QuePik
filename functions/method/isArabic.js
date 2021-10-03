const arabic = /[\u0600-\u06FF\u0750-\u077F]/;

const isArabic = (value) => {
  if (typeof value === "string" || typeof value === "number") {
    return arabic.test(value);
  }

  if (!value) return;
  const {VALUE, params = {}, id} = value;
  const local = VALUE[id];
  if (local.type !== "Text" && local.type !== "Input") return;

  const text = params.value || local.element.value || local.element.innerHTML;
  if (!text) return;
  const result = arabic.test(text);

  if (result) {
    local.element.classList.add("arabic");
    local.element.style.textAlign = "right";
    if (local["placeholder-ar"]) {
      local.element.placeholder = local["placeholder-ar"];
    }
  } else {
    if (local.element.className.includes("arabic")) {
      local.element.style.textAlign = "left";
    }
    local.element.classList.remove("arabic");
    if (local["placeholder"]) local.element.placeholder = local["placeholder"];
  }
  return true;
};

module.exports = {isArabic};
