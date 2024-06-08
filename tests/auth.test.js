import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // Adjust based on your project structure

const { expect } = chai;

chai.use(chaiHttp);

describe('Auth API', () => {
  let token;

  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        phone: '1234567890',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'User registered successfully');
        done();
      });
  });

  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send({
        phone: '1234567890',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });

  // Add more authentication tests as needed
});
