import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // Ensure this path is correct
const { expect } = chai;

chai.use(chaiHttp);

describe('Search API', () => {
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

  it('should search for a user by name', (done) => {
    chai.request(app)
      .get('/api/search/name')
      .query({ name: 'Test' })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should search for a user by phone number', (done) => {
    chai.request(app)
      .get('/api/search/phone')
      .query({ phone: '1234567890' })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // Add more search tests as needed
});
