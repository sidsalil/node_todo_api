var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {ToDo} = require('./models/ToDo');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  var todo = new ToDo({
    text: request.body.text
  });
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


app.post('/users', (request, response) => {
  var body = _.pick(request.body, ['email', 'password']);
  var user = new User(body);
  console.log(user);
  user.save().then((user) => {
    // response.send(user);
    return user.generateAuthToken();
  }).then((token) => {
      response.header('x-auth', token).send(user);
  }).catch((error) => {
    response.status(400).send(error);
  });
});


app.listen(3000, () => {
  console.log('server.js Started on port 3000');
});

module.exports = {app}
