const expect = require('expect');
const request = require('supertest');

const app = require('./../server.js');
const ToDo = require('./../models/ToDo.js');

// beforeEach((done) => {
//   ToDo.remove().then(() => {
//     done()
//   })
// });



describe('POST /todos', () => {
  it('Should create a new ToDo', (done) => {
    var testToDo = 'Test ToDo Text';
    request(app).post('/todos').send(testToDo).expect(200).expect((response) => {
      expect(response.body.text).toBe(testToDo);
    })
    .end((error, response) => {
      if (error) {
        return done(error);
      }
      ToDo.find().then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(testToDo)
        done()
      }).catch((exception) => {
        done(exception);
      });
    });
  });
});
