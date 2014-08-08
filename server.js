var geoip = require('geoip-lite');
var express = require("express");
var bodyParser = require('body-parser')

var app = express();
var token = process.env.TOKEN || "dev";

app.use(bodyParser.urlencoded());

app.put("/convert", function(req, res) {
  if(req.query.token != token) {
    return res.status(403).end();
  }

  var result = {}
  var ips = req.body.ips.split(",");
  ips.forEach(function(ip) {
    result[ip] = geoip.lookup(ip);
  });

  res.status(200).json(result);
});

var port = Number(process.env.PORT || 5000);
app.listen(port);
