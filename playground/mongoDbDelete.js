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

  //deleteMany()
  // dbToDoApp.collection('ToDos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // }, (error) => {});

  //deleteOne() based on specific where clause
  // dbToDoApp.collection('ToDos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // }, (error) => {});

  //findOneAndDelete
  // dbToDoApp.collection('ToDos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // }, (error) => {});

  // dbToDoApp.collection('Users').deleteMany({name: 'Salil'}).then((result) => {
  //   console.log(result);
  // }, (error) => {});

  dbToDoApp.collection('Users').findOneAndDelete({_id: new ObjectID('5a0a3f4001b743235c1c6e05')}).then((result) => {
    console.log(result);
  }, (error) => {});

  // dbToDoApp.close();
});
