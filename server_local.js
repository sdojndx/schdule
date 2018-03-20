var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var config = require('./webpack.config.local')

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { 
	noInfo: true, 
	publicPath: config.output.publicPath 
}))
// app.use(webpackHotMiddleware(compiler))


app.get("/", function(req, res) {
  res.sendFile(__dirname + '/app/index.html')
})

app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + '/app/index.html')
})

app.get("/login.html", function(req, res) {
  res.sendFile(__dirname + '/app/login.html')
})

app.get("/app/index.js", function(req, res) {
  res.sendFile(__dirname + '/app/index.js')
})

app.get("/app/login.js", function(req, res) {
  res.sendFile(__dirname + '/app/login.js')
})


app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
