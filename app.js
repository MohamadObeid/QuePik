const express = require("express")
const _page = require('./page/_page')
const { getApi, postApi, deleteApi } = require("./method/api")
const { createDocument } = require('./method/createDocument')

const app = express()

app.use(express.static('./browser'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

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
  if (path[1] === 'api') return getApi(req, res)

  // home page
  if (!page) page = 'home'
  
  // respond
  if (_page[page]) res.send(createDocument(_page[page]))

  // favicon
  else if (page === 'favicon.ico') res.status(204).send('')
})

app.listen(5000, () => {
  console.log("Server Listening to Port 5000")
})