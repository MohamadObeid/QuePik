module.exports = {
  toNumber: (string) => {
    if (parseFloat(string) && !isNaN(string.charAt(0))) {
      if (!isNaN(string.split(",").join(""))) {
        // is Price
        string = parseFloat(string.split(",").join(""));
      }
    }

    return string;
  },
};
