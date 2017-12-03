const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {ToDo} = require('./../models/ToDo.js');

const testToDos = [{
  _id: new ObjectID(),
    text: 'First test ToDo'
},
{
  _id: new ObjectID(),
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
});


describe('Get /todos/:toDoIdToFind', () => {
  it('Should return todo document based on the ID', (done) => {
    request(app).get(`/todos/${testToDos[0]._id.toHexString()}`).expect(200).expect((response) => {
      expect(response.body.todo.text).toBe(testToDos[0].text);
    })
    .end(done);
  });

  it('Should return 404 if todo not found', (done) => {
    var dummyID = new ObjectID().toHexString();
    request(app).get(`/todos/${dummyID}`).expect(404).end(done);
  });


  it('Should return 404 for invalid todo Object IDs', (done) => {
    request(app).get('/todos/1234abcd').expect(404).end(done);
  });

});

describe('DELETE /todos/:toDoIdToDelete', () => {
  it('Should remove a ToDo based on ObjectID', (done) => {
    var dummyId = testToDos[0]._id.toHexString();
    request(app).delete(`/todos/${dummyId}`).expect(200).expect((response) => {
      expect(response.body.todo._id).toBe(dummyId);
    })
    .end((error, response) => {
      if (error) {
        return done(error);
      }
      ToDo.findById(dummyId).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((error) => done(error));
    })
  });

  it('Should return 404 if ToDo not found', (done) => {
    request(app).delete('/todos/1234abcd').expect(404).end(done);
  });

  it('Should return 404 if ToDo ObjectID is invalid', (done) => {
    request(app).delete('/todos/XXX').expect(404).end(done);
  });
  
});
