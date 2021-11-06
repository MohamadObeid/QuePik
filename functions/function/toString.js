const toString = (object) => {
  if (!object) return "";

  let string = "";
  const length = Object.entries(object).length;

  Object.entries(object).map(([key, value], index) => {
    if (Array.isArray(value)) {
      string += `${key}=[${value.join(",")}]`;
    } else if (typeof value === "object") {
      const path = toString(value).split(";");
      string = path.map(path => `${key}.${path}`).join(";");
    } else string += `${key}=${value}`;

    if (index < length - 1) string += ";";
  });

  return string || "";
};

module.exports = {toString};
