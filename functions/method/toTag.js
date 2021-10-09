const {toStyle} = require("./toStyle");
const {toArray} = require("./toArray");
const {generate} = require("./generate");
const {clone} = require("./clone");

module.exports = {
  toTag: ({STATE, VALUE, id}) => {
    const {createElement} = require("./createElement");
    const path = require("path");

    let tag;
    const local = VALUE[id];
    const style = toStyle({STATE, VALUE, id});

    // innerHTML
    const text = (local.text !== undefined && local.text.toString()) || (typeof local.data !== "object" && local.data) || ''
    let innerHTML = text
    const checked =
      local.input &&
      local.input.type === "radio" &&
      parseFloat(local.data) === parseFloat(local.input.defaultValue);

    if (local.children) {
      innerHTML = toArray(clone(local.children))
          .map((child, index) => {
            const id = child.id || generate();
            VALUE[id] = clone(child);
            VALUE[id].id = id;
            VALUE[id].index = index;
            VALUE[id].parent = local.id;

            return createElement({STATE, VALUE, id});
          })
          .join("");
    }
    
    const value =
      (local.input && local.input.value) !== undefined ?
        local.input.value :
        local.data !== undefined ?
        local.data :
        "";
    if (local.type === "Image") local.src = local.src || local.data || "";

    if (local.type === "View") {
      tag = `<div class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</div>`;
    } else if (local.type === "Image") {
      tag = `<img class='${local.class}' src='${local.src}' alt='${local.src}' id='${local.id}' style='${style}'>`;
    } else if (local.type === "Table") {
      tag = `<table class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</table>`;
    } else if (local.type === "Row") {
      tag = `<tr class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</tr>`;
    } else if (local.type === "Header") {
      tag = `<th class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</th>`;
    } else if (local.type === "Cell") {
      tag = `<td class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</td>`;
    } else if (local.type === "Label") {
      tag = `<label class='${local.class}' id='${local.id}' style='${style}' ${
        local["aria-label"] ? `aria-label="${local["aria-label"]}"` : ""
      } ${local.for ? `for="${local.for}"` : ""}>${innerHTML}</label>`;
    } else if (local.type === "Span") {
      tag = `<span class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</span>`;
    } else if (local.type === "Text") {
      if (local.label) {
        tag = `<label class='${local.class}' id='${local.id}' style='${style}' ${local["aria-label"] ? `aria-label="${local["aria-label"]}"` : ""} ${local.for ? `for="${local.for}"` : ""}>${innerHTML}</label>`;
      } else if (local.h1) {
        tag = `<h1 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h1>`;
      } else if (local.h2) {
        tag = `<h2 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h2>`;
      } else if (local.h3) {
        tag = `<h3 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h3>`;
      } else if (local.h4) {
        tag = `<h4 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h4>`;
      } else if (local.h5) {
        tag = `<h5 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h5>`;
      } else if (local.h6) {
        tag = `<h6 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h6>`;
      } else if (local.span) {
        tag = `<span class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</span>`;
      } else {
        tag = `<p class='${local.class}' id='${local.id}' style='${style}'>${text}</p>`;
      }
    } else if (local.type === "Icon") {
      tag = `<i class='material-icons${local.outlined ? "-outlined" : local.rounded ? "-round" : local.sharp ? "-sharp" : local.twoTone ? "-two-tone" : ""} ${local.class || ""} ${local.icon.name}' id='${local.id}' style='${style}'>${local.google ? local.icon.name : ""}</i>`;
    } else if (local.type === "Textarea") {
      tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ""}' ${local.readonly ? "readonly" : ""} ${local.maxlength || ""}>${local.data || local.input.value || ""}</textarea>`;
    } else if (local.type === "Input") {
      if (local.textarea) {
        tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ""}' ${local.readonly ? "readonly" : ""} ${local.maxlength || ""}>${value}</textarea>`;
      } else {
        tag = `<input class='${local.class}' id='${local.id}' style='${style}' ${local.input.name ? `name="${local.input.name}"` : ""} ${local.input.accept ? `accept="${local.input.accept}/*"` : ""} type='${local.input.type || "text"}' ${local.placeholder ? `placeholder="${local.placeholder}"` : ""} ${value !== undefined ? `value="${value}"` : ""} ${local.readonly ? "readonly" : ""} ${local.input.min ? `min="${local.input.min}"` : ""} ${local.input.max ? `max="${local.input.max}"` : ""} ${local.input.defaultValue ? `defaultValue="${local.input.defaultValue}"` : ""} ${checked ? "checked" : ""} ${local.disabled ? "disabled" : ''}/>`;
      }
    } else if (local.type === "Paragraph") {
      tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ""}'>${text}</textarea>`;
    }

    // linkable
    if (local.link) {
      var id = generate();
      tag = `<a id=${id} href=${local.link}>${tag}</a>`;
      toArray(local.controls).push({
        event: "click",
        actions: `route?route=${local.link}`,
      });
      VALUE[id] = {};
    }

    return tag;
  },
};
