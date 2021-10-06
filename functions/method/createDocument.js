const {createElement} = require("./createElement");
const {getJsonFiles} = require("./getJsonFiles");

const createDocument = (page) => {
  let innerHTML = "";
  let STATE = {};
  const VALUE = {};

  // get assets & views
  STATE = {
    view: getJsonFiles("view"),
    page: getJsonFiles("page"),
    codes: {},
  };

  // body
  var id = "body";
  VALUE[id] = {};
  VALUE[id].id = id;

  // root
  var id = "root";
  VALUE[id] = {};
  VALUE[id].id = id;
  VALUE[id].type = "View";
  VALUE[id].children = [];
  VALUE[id].parent = "body";

  //
  if (!STATE.page[page]) return "Hello";

  // push page views to root
  STATE.page[page].views.map(
      (view) => STATE.view[view] && VALUE[id].children.push(STATE.view[view])
  );

  // push public views to root
  STATE.page.public.views.map(
      (view) => STATE.view[view] && VALUE[id].children.push(STATE.view[view])
  );

  // create html
  innerHTML = createElement({STATE, VALUE, id});

  return `<!DOCTYPE html>
    <html lang="en" class="html">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QuePik</title>
        <link rel="stylesheet" href="index.css" />
        <link rel="stylesheet" href="rate.css" />
        <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
    </head>
    <body>
        ${innerHTML}
        <script id="VALUE" type="application/json">${JSON.stringify(VALUE)}</script>
        <script id="STATE" type="application/json">${JSON.stringify(STATE)}</script>
        <script src="index.js"></script>
    </body>
    </html>`;
};

module.exports = {createDocument};
