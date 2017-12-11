const {SHA256} = require('crypto-js');

var message = 'I am user called sidsalil';

var messageHash = SHA256(message).toString();

console.log(`message = ${message}\nmessageHash = ${messageHash}`);

var data = {
  id: 4
};

var token = {
  data: data,
  dataHash: SHA256(JSON.stringify(data) + 'secret_salting_data').toString()
};

//man in the middle can change the data. But he will never know the secret salting data
token.data.id = 5;
token.dataHash = SHA256(JSON.stringify(token.data)).toString();


var resultHash = SHA256(JSON.stringify(token.data) + 'secret_salting_data').toString();

if (resultHash === token.dataHash) {
  console.log('Data was not changed');
}
else {
  console.log('Data was changed dont trust');
}
