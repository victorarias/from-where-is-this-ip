var geoip = require('geoip-lite');
var express = require("express");
var app = express();
var token = process.env.TOKEN || "dev";

app.get("/convert", function(req, res) {
  if(req.query.token != token) {
    return res.status(403).end();
  }

  var result = {}
  var ips = req.query.ips.split(",");
  ips.forEach(function(ip) {
    result[ip] = geoip.lookup(ip);
  });

  res.status(200).json(result);
});

var port = Number(process.env.PORT || 5000);
app.listen(port);
