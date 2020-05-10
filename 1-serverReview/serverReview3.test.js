'use strict';

/* ------------------------------------------------------------------------------------------------

Build a simple express server. 
- Connect a '/hello' route that sends a greeting of your  choice. 
- Connect a '/aboutme' route that sends a short bio about you to the front-end. 
- Finally, connect a '/favoritefoods' route that sends an array to the front-end of your favorite foods. All other routes should respond with a status of 404.
------------------------------------------------------------------------------------------------ */

const createServer = () => {
  
  const express = require('express');
  const app = express();
  
  app.get('/hello', helloMessage);
  app.get('/aboutme', aboutMe);
  app.get('/favoritefoods', myFaveFoods);
  app.get('*', errorMessage);

  function helloMessage(req, res) {
    res.status(200).send('Hola Mundo');
  }

  function aboutMe(req, res){
    res.status(200).send('Hi this is Chuck. I am workin on becominf a Software Developer... if I am even able to do this...');
  }

  function myFaveFoods(req, res) {
    let faveFoods = ['burgers', 'pizza', 'junk food'];
    res.status(200).send(faveFoods);
  }

  function errorMessage(req, res){
    res.status(404).send('Page does not exist');
  }

  var server = app.listen(3301, function () {
    var port = server.address().port;
    console.log('Example app listening at port', port);
  });
  return server;
};


describe('Testing challenge', () => {

  const request = require('supertest');

  let server;

  beforeAll(function () {
    server = createServer();
  });

  afterAll(function () {
    server.close();
  });

  test('responds to /hello', function testHello(done) {
    request(server)
      .get('/hello')
      .expect(200, done);
  });

  test('responds to /aboutme', function testAboutMe(done) {
    request(server)
      .get('/aboutme')
      .expect(200, done);
  });

  test('responds to /favoritefoods', function testFavoriteFoods(done) {
    request(server)
      .get('/favoritefoods')
      .expect(200, done);
  });

  test('responds to /foo', function testNotFound(done) {
    request(server)
      .get('/foo')
      .expect(404, done);
  });
});
