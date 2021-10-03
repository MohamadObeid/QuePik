const {getJsonFiles} = require("./getJsonFiles");
const {capitalize} = require("./capitalize");
const {toParam} = require("./toParam");
const fs = require("fs");

const getApi = (req, res) => {
  const path = req.url.split("/");
  const folder = path[2];
  const fileName = path[3];
  let params = path[4];
  if (params) params = toParam({string: params});

  if (folder === "image") {
    return res.sendFile(require("path").join(process.cwd(), folder, fileName));
  }

  const files = getJsonFiles(folder, fileName, params);
  return res.send({
    data: files,
    success: true,
    message: `${capitalize(folder)} mounted successfuly!`,
  });
};

const postApi = (req, res) => {
  const path = req.url.split("/");
  const folder = path[2];
  let file = req.body;
  const fileName = path[3] || file["file-name"];
  var fileType = "json";

  // create folder if it doesnot exist
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  if (folder === "image") {
    file = file.file;

    // data type
    const dataType = file.substring("data:".length, file.indexOf("/"));
    // file type
    var fileType = file.substring(
        file.indexOf("/") + 1,
        file.indexOf(";base64")
    );
    // Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${dataType}\/${fileType};base64,`, "gi");
    // Extract base64 data.
    const base64Data = file.replace(regex, "");

    // file path
    var filePath = `./${folder}/${fileName}.${fileType}`;
    const data = {"file-name": `api/${folder}/${fileName}.${fileType}`};

    fs.writeFileSync(filePath, base64Data, "base64");
    return res.send({
      data,
      success: true,
      message: `${capitalize(dataType)} save successfuly!`,
    });
  }

  // file path
  var filePath = `./${folder}/${fileName}.${fileType}`;

  if (file.id) {
    const files = getJsonFiles(folder, `${fileName}.${fileType}`);
    const index = files.findIndex((_file) => _file.id === file.id);
    if (index > -1) files[index] = file;
    else files.push(file);

    fs.writeFileSync(filePath, JSON.stringify(files, null, 2));
  } else fs.writeFileSync(filePath, JSON.stringify(file, null, 2));

  res.send({
    data: file,
    success: true,
    message: `${capitalize(fileName)} edited successfuly!`,
  });
};

const deleteApi = (req, res) => {
  const path = req.url.split("/");
  const folder = path[2];
  let fileName = path[3];
  let params = path[4];
  if (params) params = toParam({string: params});

  if (params.id) {
    var filePath = `./${folder}/${fileName}`;
    let data = getJsonFiles(folder, fileName) || [];
    data = data.filter((data) => !params.id.find((id) => data.id === id));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.send({
      data,
      success: true,
      message: "Data deleted successfuly!",
    });
  }

  fs.unlinkSync(filePath);

  fileName = file.name.en;
  res.send({
    data: file,
    success: true,
    message: `${fileName} deleted successfuly!`,
  });
};

module.exports = {getApi, postApi, deleteApi};
