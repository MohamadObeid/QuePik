var {getJsonFiles} = require("./getJsonFiles");
var {capitalize} = require("./capitalize");
var {toParam} = require("./toParam");
var fs = require("fs");

var getApi = (req, res) => {
  var path = req.url.split("/");
  var folder = path[2];
  var fileName = path[3];
  var params = path[4];
  if (params) params = toParam({string: params});

  if (folder === "image") {
    return res.sendFile(require("path").join(process.cwd(), folder, fileName));
  }

  var files = getJsonFiles(folder, fileName, params);
  return res.send({
    data: files,
    success: true,
    message: `${capitalize(folder)} mounted successfuly!`,
  });
};

var postApi = (req, res) => {
  var file = req.body;
  var path = req.url.split("/");
  var folder = path[2];
  var fileName = path[3]
  var fileType = "json";

  // create folder if it doesnot exist
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  if (folder === "image") {
    file = file.file;

    // get data type
    var dataType = file.substring("data:".length, file.indexOf("/"));
    // get file type
    var fileType = file.substring(
        file.indexOf("/") + 1,
        file.indexOf(";base64")
    );
    // get file name
    var fileName = file['file-name']
    // Forming regex to extract base64 data of file.
    var regex = new RegExp(`^data:${dataType}\/${fileType};base64,`, "gi");
    // Extract base64 data.
    var base64Data = file.replace(regex, "");
    // file path
    var filePath = `/${folder}/${fileName}.${fileType}`;
    var data = {"url": filePath};

    fs.writeFileSync(filePath, base64Data, "base64");
    return res.send({
      data,
      success: true,
      message: `${capitalize(dataType)} saved successfuly!`,
    });
  }

  // file path
  var filePath = `./${folder}/${fileName}.${fileType}`;

  if (file.id) {
    var files = getJsonFiles(folder, `${fileName}.${fileType}`);
    var index = files.findIndex((_file) => _file.id === file.id);
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

var deleteApi = (req, res) => {
  var path = req.url.split("/");
  var folder = path[2];
  var fileName = path[3];
  var params = path[4];
  if (params) params = toParam({string: params});

  if (params.id) {
    var filePath = `./${folder}/${fileName}`;
    var data = getJsonFiles(folder, fileName) || [];
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
