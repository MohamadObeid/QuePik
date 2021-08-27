const express = require("express")
const fs = require('fs')
const _page = require('./page/_page')
const {createDocument} = require('./method/createDocument')

const app = express()

app.use(express.static('./browser'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// asset //

app.post('/api/asset', (req, res) => {

  var file = req.body
  var fileName = file['file-name']
  var filePath = `./asset/${fileName}.json`

  fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1)
  
  if (fileName === 'Currency' || fileName === 'Language' || fileName === 'Unit')
  return res.send({ success: false, message: `${fileName} file can't be edited!` })

  fs.writeFileSync(filePath, JSON.stringify(file, null, 2))

  res.send({ data: file, success: true, message: `${fileName} edited successfuly!` })
})

app.delete('/api/asset', (req, res) => {

  var file = req.body
  var fileName = file['file-name']
  var filePath = `./asset/${fileName}.json`

  fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1)

  if (fileName === 'Currency' || fileName === 'Language' || fileName === 'Unit') 
  return res.send({ success: false, message: `${fileName} file can't be deleted!` })

  fs.unlinkSync(filePath)

  res.send({ data: file, success: true, message: `${fileName} deleted successfuly!` })
})

// end: asset //

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