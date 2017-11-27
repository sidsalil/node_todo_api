const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {ToDo} = require('./../models/ToDo.js');

beforeEach((done) => {
  ToDo.remove().then(() => {
    done()
  })
});



describe('POST /todos', () => {
  it('Should create a new ToDo', (done) => {
    var text = 'Test ToDo';
    // console.log('testToDo = ', testToDo);
    request(app).post('/todos').send({text}).expect(200).expect((response) => {
      console.log(response.body.text);
      expect(response.body.text).toBe(text);
    })
    .end((error, response) => {
      if (error) {
        return done(error);
      }
      ToDo.find().then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text)
        done()
      }).catch((exception) => {
        done(exception);
      });
    });
  });

  it('should not create todo with invalid text data for a ToDo', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((error, result) => {
        if(error){
          return done(error);
        }
        ToDo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((error) => done(error));
      });
  });
});
