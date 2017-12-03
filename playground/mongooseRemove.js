const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {ToDo} = require('./../server/models/ToDo.js');
const {User} = require('./../server/models/User.js');

// ToDo.remove({}).then((result) => {
//   console.log('All ToDo documents removed: ', result);
// });
//
// ToDo.findOneAndRemove();

// ToDo.findByIdAndRemove('5a243042e0aff957832af9b6').then((todo) => {
//   console.log('findByIdAndRemove(): ToDo By ID (5a243042e0aff957832af9b6) removed: ', todo);
// });

ToDo.findOneAndRemove({completed:false}).then((todo) => {
  console.log('findOneAndRemove(): First ToDo removed where completed = false: ', todo);
});
