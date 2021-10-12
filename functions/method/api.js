const { toParam } = require("./toParam")
const { keys } = require("./keys")
const { toFirebaseOperator } = require("./toFirebaseOperator")
//const db = require("./firebase")

// const { getJsonFiles } = require("./getJsonFiles")
// const fs = require("fs")

var getApi = async (req, res) => {
  // api/collection/params?conditions
  
  var path = req.url.split("/")
  var collection = path[2]
  var params = path[3]
  if (params) params = toParam({ string: params })
  else params = {}

  var ref = db.collection(collection)

  // search fields
  if (params.fields)
    Object.entries(params.fields).map(([key, value]) => {

      var operator = keys(value)[0]
      ref = ref.where(key, toFirebaseOperator(operator), value[operator])
    })


  if (params.orderBy) ref = ref.orderBy(params.orderBy)
  if (params.limit) ref = ref.limit(params.limit)

  if (params.startAt) ref = ref.startAt(params.startAt)
  if (params.startAfter) ref = ref.startAfter(params.startAfter)

  if (params.endAt) ref = ref.endAt(params.endAt)
  if (params.endBefore) ref = ref.endAt(params.endBefore)

  // retrieve data
  var data = []
  ref.get()
  .then(query => {

    query.forEach(doc => data.push(doc.data()))

    return res.send({
      data,
      success: true,
      message: `Data mounted successfuly!`,
    })
  })
  .catch(error => {

    return res.send({
      data,
      success: false,
      message: `No data exists!`,
    })
  })
}

var postApi = async (req, res) => {
  // api/collection/params?conditions

  var file = req.body
  var path = req.url.split("/")
  var collection = path[2]
  var params = path[3]
  if (params) params = toParam({ string: params })

  var ref = db.collection(collection)

  await ref.doc(file.id).set(file)

  res.send({
    data: file,
    success: true,
    message: `Data saved successfuly!`,
  })
}

var deleteApi = async (req, res) => {
  // api/collection/params?conditions

  var path = req.url.split("/")
  var collection = path[2]
  var params = path[3]
  if (params) params = toParam({ string: params })
  else params = {}

  var ref = db.collection(collection)
  
  ref.doc(params.id).delete()
  .then(() => {
    return res.send({
      success: true,
      message: `Document removed successfuly!`,
    })
  })
  
  .catch(error => {

    return res.send({
      data,
      success: false,
      message: `Data could'nt be deleted!`,
    })
  })
}

/*
var getApi = (req, res) => {
  // api/folder/collection/params?conditions
  var path = req.url.split("/");
  var folder = path[2];
  var collection = path[3];
  var params = path[4];
  if (params) params = toParam({string: params});

  if (folder === "image")
  return res.sendFile(require("path").join(process.cwd(), folder, collection));

  var files = getJsonFiles(folder, collection, params);
  return res.send({
    data: files,
    success: true,
    message: `Data mounted successfuly!`,
  });
};

var postApi = (req, res) => {
  // api/folder/collection/params?conditions
  var file = req.body;
  var path = req.url.split("/");
  var folder = path[2];
  var collection = path[3]
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
    var collection = file['file-name']
    // Forming regex to extract base64 data of file.
    var regex = new RegExp(`^data:${dataType}\/${fileType};base64,`, "gi");
    // Extract base64 data.
    var base64Data = file.replace(regex, "");
    // file path
    var filePath = `/${folder}/${collection}.${fileType}`;
    var data = {"url": filePath};

    fs.writeFileSync(filePath, base64Data, "base64");
    return res.send({
      data,
      success: true,
      message: `File saved successfuly!`,
    });
  }

  // file path
  var filePath = `./${folder}/${collection}.${fileType}`;

  if (file.id) {
    var files = getJsonFiles(folder, `${collection}.${fileType}`);
    var index = files.findIndex((_file) => _file.id === file.id);
    if (index > -1) files[index] = file;
    else files.push(file);

    fs.writeFileSync(filePath, JSON.stringify(files, null, 2));
  } else fs.writeFileSync(filePath, JSON.stringify(file, null, 2));

  res.send({
    data: file,
    success: true,
    message: `Data edited successfuly!`,
  });
};

var deleteApi = (req, res) => {
  // api/folder/collection/params?conditions

  var path = req.url.split("/");
  var folder = path[2];
  var collection = path[3];
  var params = path[4];
  if (params) params = toParam({string: params});

  if (params.id) {
    var filePath = `./${folder}/${collection}`;
    var data = getJsonFiles(folder, collection) || [];
    data = data.filter((data) => !params.id.find((id) => data.id === id));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.send({
      data,
      success: true,
      message: "Data deleted successfuly!",
    });
  }

  fs.unlinkSync(filePath);

  res.send({
    data: file,
    success: true,
    message: `Data deleted successfuly!`,
  });
};
*/

module.exports = {getApi, postApi, deleteApi};

/*
Query operators:
  1. < less than
  2. <= less than or equal to
  3. == equal to
  4. > greater than
  5. >= greater than or equal to
  6. != not equal to
  7. array-contains (search an array by multiple choices)
  8. array-contains-any (search an array by multiple !choices)
  9. in (search a string by multiple choices)
  10. not-in (search a string by multiple !choices)

reference: https://firebase.google.com/docs/firestore/query-data/queries
*/

/*
Pagination: ref.orderBy('createdAt').startAfter(x).limit(x)
*/