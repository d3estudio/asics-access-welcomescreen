'use strict';

const PORT = 8080;
const express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require('url');


app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('Socket connected!');
  socket.emit('connected', {});

	socket.on('message', function (msg) {
		console.log('message: ', msg);
		socket.emit('message', msg);
	});
});

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

app.get('/post', function(req, res){
  var queryData = url.parse(req.url, true).query;
  console.log(queryData.name);
  io.emit('message', queryData.name);
  res.sendStatus(200);
});

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

