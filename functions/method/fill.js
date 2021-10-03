module.exports = {
  fill: ({VALUE, STATE, id}) => {
    const local = VALUE[id];
    let ratio;

    if (local.element) {
      if (local.type !== "Image") {
        var imageEls = [...local.element.getElementsByTagName("IMG")];
        if (imageEls.length === 0) return;
      } else imageEls = [local.element];

      setTimeout(() => {
        imageEls.map((el) => {
          const local = VALUE[el.id];
          if (!local.element.src.split("/")[4]) return;

          const parentWidth = VALUE[local.parent].element.clientWidth;
          const parentHeight = VALUE[local.parent].element.clientHeight;

          var width = local.element.offsetWidth;
          var height = local.element.offsetHeight;

          if (
            (width / parentWidth <= 1 &&
              width / parentWidth > 0.99 &&
              height > parentHeight) ||
            (height / parentHeight <= 1 &&
              height / parentHeight > 0.99 &&
              width > parentWidth)
          ) {
            return;
          }

          local.element.style.maxWidth = "100%";
          local.element.style.maxHeight = "100%";

          var width = local.element.offsetWidth;
          var height = local.element.offsetHeight;

          if (width / parentWidth < 0.99) {
            local.element.style.width = parentWidth + "px";
            if (width) ratio = (parentWidth - width) / width;
            local.element.style.maxHeight = "initial";
            local.element.style.height = height + ratio * height + "px";
          } else if (height / parentHeight < 0.99) {
            local.element.style.height = parentHeight + "px";
            if (height) ratio = (parentHeight - height) / height;
            local.element.style.maxWidth = "initial";
            local.element.style.width = width + ratio * width + "px";
          }
        });
      }, 500);
    }
  },
};
