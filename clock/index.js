var express = require('express');
var app = express();
var path = require('path');
var public = path.join(__dirname, 'public');

app.use('/',express.static(public))

app.listen(3000,['192.168.43.215','localhost'],()=>{
    console.log("server started")
})
