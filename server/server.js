var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {ToDo} = require('./models/ToDo');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  console.log(request.body);
  var todo = new ToDo({
    text: request.body.text
  });
  todo.save().then((result) => {
    response.send(result);
  }, (error) => {
    response.status(400).send(error);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
