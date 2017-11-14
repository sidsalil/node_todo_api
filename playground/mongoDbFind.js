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

  dbToDoApp.collection('ToDos').find({completed: false}).toArray().then((docs) => {
    console.log('ToDos based on completed flag');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
    console.log('Unable to fetch ToDos', error);
  });

  //Following is to search for items based on _id property
  dbToDoApp.collection('ToDos').find({_id: new ObjectID('5a0a2d308b70504740a9e78e')}).toArray().then((docs) => {
    console.log('ToDos based on _id');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
    console.log('Unable to fetch ToDos', error);
  });


  //Count the number of records returned by the database
  dbToDoApp.collection('ToDos').find().count().then((count) => {
    console.log('ToDos count: ', count);
    console.log(count);
  }, (error) => {
    console.log('Unable to fetch ToDos', error);
  });

  dbToDoApp.collection('Users').find({name: 'Salil'}).toArray().then((docs) => {
    console.log('Users based on name');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
    console.log('Unable to fetch Users', error);
  });

  // dbToDoApp.close();
});
