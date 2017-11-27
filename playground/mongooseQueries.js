const mongoose = require('./../server/db/mongoose.js');
const {ToDo} = require('./../server/models/ToDo.js');

var idToFind = '5a10d98faa8b85000e7cb321';

ToDo.find({}).then((todos) => {
  console.log('All ToDos:',todos);
}, (error) => {
  console.log(error);
});


ToDo.find({
  _id: idToFind
}).then((todos) => {
  console.log('ToDos based on ID:',todos);
}, (error) => {
  console.log(error);
});

ToDo.findOne({
  _id: idToFind
}).then((todo) => {
  console.log('ToDo based on ID:',todo);
}, (error) => {
  console.log(error);
});
