var http = require('http')
var server = http.createServer(handler)
server.listen(process.env.PORT || 1337)

var redis = require("redis")

var urlParse = require('url').parse;
var redisURL = process.env.REDISCLOUD_URL || 'redis://localhost:6379'; //'redis://rr-session.kkcwbo.0001.use1.cache.amazonaws.com:6379';
var redisURLObj = urlParse(redisURL);
var redisClient = redis.createClient(redisURLObj.port, redisURLObj.hostname);

if (redisURLObj.auth) {
  redisClient.auth(redisURLObj.auth.split(':')[1], function(err) {
    if (err) console.log(err);
  });
}


function handler(req, res) {
  // ping redis
  redisClient.ping(function (err, v) {
    if (err) {
      res.writeHeader(400, { 'Content-Type': 'text/plain'})
      res.end('ERROR')
      return
    }
    res.end('OK')
  })

}
