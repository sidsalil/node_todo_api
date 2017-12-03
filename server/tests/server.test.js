const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {ToDo} = require('./../models/ToDo.js');

const testToDos = [{
    text: 'First test ToDo'
},
{
  text: 'Second test ToDo'
}];


beforeEach((done) => {
  ToDo.remove().then(() => {
    return ToDo.insertMany(testToDos);
  }).then(() => done());
});



describe('POST /todos', () => {
  it('Should create a new ToDo', (done) => {
    var text = 'Test ToDo';
    // console.log('testToDo = ', testToDo);
    request(app).post('/todos').send({text}).expect(200).expect((response) => {
      // console.log(response.body.text);
      expect(response.body.text).toBe(text);
    })
    .end((error, response) => {
      if (error) {
        return done(error);
      }
      ToDo.find({text}).then((todos) => {
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
          expect(todos.length).toBe(testToDos.length);
          done();
        }).catch((error) => done(error));
      });
  });
});


describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app).get('/todos').expect(200).expect((response) => {
      expect(response.body.todos.length).toBe(testToDos.length);
    })
    .end(done);
  })
})
