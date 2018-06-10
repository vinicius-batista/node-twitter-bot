const config = require('./config')
const Twit = require('twit')
const mongoose = require('mongoose')
const retweet = require('./src/actions/retweet')
const replyWithStream = require('./src/actions/replyWithStream')
const http = require('http')

setInterval(() => http.get('http://twin-peaks-bot-client.herokuapp.com/'), 900000)

const Twiiter = new Twit(config)

mongoose.Promise = global.Promise
mongoose
  .connect(process.env.PROD_MONGODB, { useMongoClient: true })
  .then(() => {
    retweet(Twiiter)
    replyWithStream(Twiiter)
  })
  .catch(console.log)

http
  .createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('okay')
  })
  .listen(process.env.PORT || 3000)
