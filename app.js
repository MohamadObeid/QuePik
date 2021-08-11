const express = require("express")
const _page = require('./page/_page')
const {createDocument} = require('./method/createDocument')

const app = express()

app.use(express.static('./browser'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('*', (req, res) => {
  
  var path = req.url.split('/')
  var page = path[1]

  // home page
  if (!page) page = 'home'
  
  // respond
  if (_page[page]) res.send(createDocument(_page[page]))
  else if (page === 'favicon.ico') res.status(204).send('')
})

app.listen(5000, () => {
  console.log("Server Listening to Port 5000")
})