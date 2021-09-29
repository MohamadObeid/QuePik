const express = require("express")
const { getApi, postApi, deleteApi } = require("./method/api")
const { createDocument } = require('./method/createDocument')

const app = express()

app.use(express.static('./browser'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))

// post
app.post('*', (req, res) => {
  
  var path = req.url.split('/')
  
  // api
  if (path[1] === 'api') return postApi(req, res)
})

// delete
app.delete('*', (req, res) => {
  
  var path = req.url.split('/')
  
  // api
  if (path[1] === 'api') return deleteApi(req, res)
})

// get
app.get('*', (req, res) => {
  
  var path = req.url.split('/')
  var page = path[1]
  
  // api
  if (page === 'api') return getApi(req, res)

  // image
  if (path[2] === 'image')
  return res.sendFile(require('path').join(process.cwd(), path[2], path[3]))

  // favicon
  if (page === 'favicon.ico') return res.status(204).send('')

  // respond
  return res.send(createDocument(page))
})

app.listen(5000, () => {
  console.log("Server Listening to Port 5000")
})