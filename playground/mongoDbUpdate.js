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

  // dbToDoApp.collection('ToDos').findOneAndUpdate({_id: new ObjectID("5a10b82b0ecfd22a643e0029")}, {$set: {completed: true}}, {returnOriginal: false}).then((result) => {
  //   console.log(result);
  // }, (error) => {});


//below is same as above just that the input parameters for the update function call are on separate lines.
  // dbToDoApp.collection('ToDos').findOneAndUpdate(
  //   {_id: new ObjectID("5a10b82b0ecfd22a643e0029")},
  //   {$set: {completed: true}},
  //   {returnOriginal: false}
  // ).then((result) => {
  //   console.log(result);
  // }, (error) => {});

  dbToDoApp.collection('Users').findOneAndUpdate(
      {_id: new ObjectID("5a0a3f2201b743235c1c6dff")},
      {$inc: {age: 1}},
      {returnOriginal: false}
    ).then((result) => {
      console.log(result);
    }, (error) => {});

// dbToDoApp.close();
    });
