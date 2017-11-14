// const MongoClient = require('mongodb').MongoClient;

//below does exactly the same as the above. This is object destructuring in Node.JS.
//If the object has a number of properties and if yuo want those properties to be
// returned to you to be used as variables you can do it the following way.
const {MongoClient, ObjectID} = require('mongodb');


//You can create ObjectIDs as per below
// var objID = new  ObjectID();
// console.log(objID);

MongoClient.connect('mongodb://localhost:27017/ToDoAppDB', (error, dbToDoApp) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB Server');

  // dbToDoApp.collection('ToDos').insertOne({
  //   text: 'Something To Do',
  //   completed: 'false'
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert a new document in ToDos Collection');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // dbToDoApp.collection('Users').insertOne({
  //   name: 'Salil Siddhaye',
  //   age: 34,
  //   location: 'Jersey City, NJ'
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert a new document in Users Collection');
  //   }
  //   // console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  dbToDoApp.close();
});
