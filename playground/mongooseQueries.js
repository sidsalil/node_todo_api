const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {ToDo} = require('./../server/models/ToDo.js');
const {User} = require('./../server/models/User.js');

var toDoIdToFind = '5a2417899eb1170439a0f70c';
var userIDToFind = '5a10d1677f4cc6180c60a782';

// ToDo.find({}).then((todos) => {
//   console.log('find(): All ToDos:\n',todos,'\n');
// }, (error) => {
//   console.log(error);
// });
//
//
// ToDo.find({
//   completed: false
// }).then((todos) => {
//   console.log('find(): All ToDos where completed = false:\n',todos,'\n');
// }, (error) => {
//   console.log(error);
// });
//
// ToDo.findOne({
//   completed: false
// }).then((todo) => {
//   console.log('findOne(): First ToDo where completed = false status:\n',todo,'\n');
// }, (error) => {
//   console.log(error);
// });

// if (!ObjectID.isValid(toDoIdToFind)) {
//   return console.log('toDoIdToFind = ', toDoIdToFind,' is not valid');
// }
//
//
// ToDo.findById(toDoIdToFind).then((todo) => {
//   if (!todo) {
//     return console.log('ID not found');
//   }
//   console.log('findById(): ToDo based on ID:\n',todo,'\n');
// }).catch((error) => {
//   console.log(error);
// });

if (!ObjectID.isValid(userIDToFind)) {
  return console.log('userIDToFind = ', userIDToFind,' is not valid');
}

User.findById(userIDToFind).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User By Id = \n', user);
}, (error) => {
  console.log(error);
});
