import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // Ensure this path is correct
const { expect } = chai;

chai.use(chaiHttp);

describe('Contacts API', () => {
  let token;

  before((done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send({
        phone: '1234567890',
        password: 'password',
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should mark a number as spam', (done) => {
    chai.request(app)
      .post('/api/contacts/mark-spam')
      .set('Authorization', `Bearer ${token}`)
      .send({ phone: '0987654321' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Number marked as spam');
        done();
      });
  });

  // Add more contacts tests as needed
});
