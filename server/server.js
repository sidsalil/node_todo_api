var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {ToDo} = require('./models/ToDo');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  // console.log('server.js request.body', request.body);
  var todo = new ToDo({
    text: request.body.text
  });
  // console.log('todo object to be saved from server.js = ', todo);
  todo.save().then((result) => {
    // console.log('request.body.text = ', request.body.text, 'result = ', result);
    response.send(result);
  }, (error) => {
    // console.log(error);
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

app.get('/todos/:toDoIdToFind', (request, response) => {
  var toDoIdToFind = request.params.toDoIdToFind;
  if (!ObjectID.isValid(toDoIdToFind)) {
    return response.status(404).send('ToDo ID is not valid');
  }
  ToDo.findById(toDoIdToFind).then((todo) => {
    if (!todo) {
      return response.status(404).send('ToDo not found');
    }
    response.status(200).send({todo});
  }).catch((error) => {
    response.status(400).send(error);
  });
});

app.delete('/todos/:toDoIdToDelete', (request, response) => {
  var toDoIdToDelete = request.params.toDoIdToDelete;
  if (!ObjectID.isValid(toDoIdToDelete)) {
    return response.status(404).send('ToDo ID is not valid');
  }
  ToDo.findByIdAndRemove(toDoIdToDelete).then((todo) => {
    if (!todo) {
      return response.status(404).send('ToDo not found');
    }
    response.status(200).send({todo});
  }).catch((error) => {
    response.status(400).send(error);
  });
});

app.listen(3000, () => {
  console.log('server.js Started on port 3000');
});

module.exports = {app}
