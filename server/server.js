var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {ToDo} = require('./models/ToDo');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  var todo = new ToDo({
    text: request.body.text
  });
  console.log('todo object to be saved from server.js = ', todo, 'request.body.text = ', request.body.text);
  todo.save().then((result) => {
    response.send(result);
  }, (error) => {
    response.status(400).send(error);
  });
});

app.get('/todos', (request, response) => {
  ToDo.find().then((todos) => {
    response.send({todos});
  }, (error) => {
    response.status(400).send(error);
  });
});

app.listen(3000, () => {
  console.log('server.js Started on port 3000');
});

module.exports = {app}
