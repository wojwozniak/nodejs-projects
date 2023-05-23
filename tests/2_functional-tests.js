const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const { assert } = chai;
const URL = '/api/convert';

suite('Functional tests', () => {
  test('convert 10L', (done) => {
    chai
      .request(server)
      .get(URL)
      .query({ input: '10L' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  test('return invalid unit error (32g)', (done) => {
    chai
      .request(server)
      .get(URL)
      .query({ input: '32g' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  test('return invalid number error (3/7.2/4kg)', (done) => {
    chai
      .request(server)
      .get(URL)
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  test('return both errors (3/7.2/4kilomegagram)', (done) => {
    chai
      .request(server)
      .get(URL)
      .query({ input: '3/7.2/4kilomegagram' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  test('make it work for no number (kg)', (done) => {
    chai
      .request(server)
      .get(URL)
      .query({ input: 'kg' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.approximately(res.body.returnNum, 2.20462, 0.1);
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });
});

after(function() {
  chai.request(server)
    .get('/')
});