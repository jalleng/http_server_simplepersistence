'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
require(__dirname + '/../server');

describe('basic server', function() {
    it('should respond to a request', function(done) {
        chai.request('localhost:3000')
            .get('/names')
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.status).to.eql(200);
                expect(res.text).to.eql('this is the name directory');
                done();
            });
    });
});

describe('basic server', function() {
    it('should respond to a request', function(done) {
        chai.request('localhost:3000')
            .get('/')
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.status).to.eql(404);
                expect(res.text).to.eql('Not Found');
                done();
            });
    });
});

describe('basic server', function() {
    it('should respond to a request', function(done) {
        chai.request('localhost:3000')
            .post('/names')
            .send({msg: 'Goodbye Cruel World!'})
            .then(function(err, res) {
                expect(err).to.eql(null);
                expect(res.status).to.eql(200);
                expect(res.text).to.eql('saved name');
            });
        done();
    });
});
