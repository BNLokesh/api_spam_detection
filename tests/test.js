const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Adjust this based on your project structure
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Endpoint Tests', () => {
  it('should return status 200 for GET /api/search/name with query parameter', (done) => {
    chai.request(app)
      .get('/api/search/name?name=John') // Replace with your actual API endpoint to test
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
