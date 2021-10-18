const functions = require("firebase-functions")
const express = require("express")

// const {getApi, postApi, deleteApi} = require("./method/api")
const {createDocument} = require("./method/createDocument")

const app = express()

app.use(express.static("browser", { redirect: false }))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false, limit: "50mb" }))

app.listen(5000, () => console.log("Server Listening to Port 5000"))

exports.app = functions.https.onRequest(app)

// post
/*app.post("*", (req, res) => {
  const path = req.url.split("/")

  if (path[1] === "api") return postApi(req, res)
})

// delete
app.delete("*", (req, res) => {
  const path = req.url.split("/")

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
  
  if (!cookies) req.url = "/"
  else {
    
    cookies = JSON.parse(cookies)

    if (!cookies.name || !cookies.password || cookies.token !== "RaWqA95zHRv3FwpNdndY") req.url = "/"
    else if (req.url === "/") req.url = "/admin"
  }
  
  // api
  // if (page === "api") return getApi(req, res)
  
  // image
  // if (page === "image") return res.sendFile(require("path").join(process.cwd(), page, path[2]))

  // respond
  return createDocument(req, res)
})