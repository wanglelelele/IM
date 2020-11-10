const path = require('path')
const express = require('express')
const app = express()
const openBrowsers = require('open-browsers')
if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack')
  var config = require('./webpack.dev.config')
  var compiler = webpack(config)
  // use in develope mode
  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath
    })
  )
  app.get('/', function (req, res) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, function (err, result) {
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    })
  })
} else {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}

const server = require('http').createServer(app)
const io = require('socket.io')(server)
app.use(express.static(path.join(__dirname, '../')))
io.on('connection', function(socket){
  socket.on('login', function(obj){
  })
  socket.on('message', function(data){
    console.log('message----', data)
    data.flow = 'in'
    io.emit('message',data )
  })
})
server.listen(3300, function (err) {
  if (process.env.NODE_ENV !== 'production') {
    openBrowsers('http://localhost:3300')
  }
  console.log('Listening at *:3300')
})