const capitalize = (string) => {
  return string
      .split(" ")
      .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
      .join(" ");
};

module.exports = {capitalize};
