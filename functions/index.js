var functions = require("firebase-functions")
var express = require("express")
var device = require('express-device')

// config
require('dotenv').config()

// var { getApi, postApi, deleteApi } = require("./function/api")
var { createDocument } = require("./function/createDocument")

var app = express()

app.use(device.capture())
app.use(express.static("browser", { redirect: false }))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false, limit: "50mb" }))

app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.listen(5000, () => console.log("Server Listening to Port 5000"))

exports.app = functions.https.onRequest(app)

// post
/*app.post("*", (req, res) => {
  var path = req.url.split("/")

  if (path[1] === "api") return postApi(req, res)
})

// delete
app.delete("*", (req, res) => {
  var path = req.url.split("/")

  if (path[1] === "api") return deleteApi(req, res)
})*/

// get
app.get("*", (req, res) => {
  
  // favicon
  if (req.url === "/favicon.ico") return res.sendStatus(204)

  var cookies = req.headers.cookie || ""
  if (cookies) {
    cookies = cookies.split("authentication=")
    if (cookies[1]) cookies = cookies[1].split(";")[0]
    else cookies = ""
  }
  
  if (!cookies && (req.url === "/admin" || req.url === "/")) {

    req.url = "/"

  } if (cookies) {
    
    cookies = JSON.parse(cookies)
    if (!cookies.name || !cookies.password || cookies.token !== "RaWqA95zHRv3FwpNdndY") req.url = "/"
    else if (req.url === "/") req.url = "/admin"
  }
  
  // api
  if (req.url.split("/")[1] === "api") return res.send("Hello")// getApi(req, res)
  
  // image
  // if (page === "image") return res.sendFile(require("path").join(process.cwd(), page, path[2]))

  // respond
  return createDocument(req, res)
})