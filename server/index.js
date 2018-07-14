var { Song } = require('./db')
var restify = require('restify')
var server = restify.createServer()
var port = 3001

server.use(function (req, res, next) {
  var data = ''
  req.setEncoding('utf8')
  req.on('data', function (chunk) {
    data += chunk
  })
  req.on('end', function () {
    req.body = data
    console.log()
    next()
  })
})

server.get('/songs', (request, response) => {
  Song.findAll().then(function(songs) {
	response.send(songs)
	response.end()
  })
})
//curl localhost:3001/songs

server.post('/songs', (request, response) => {
  const body = JSON.parse(request.body)
  Song.create(body).then(song => {
    response.send(body)
    response.end()
  })
})
//curl -X POST -d '{"name": "La Macarena"}' localhost:3001/songs

server.listen(port, () => {
  console.log(`Verizon stub server running on port ${port}`)
})
