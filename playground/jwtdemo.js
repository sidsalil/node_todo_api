const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, 'secret_salting_data');

console.log(`token = ${token}`);
