'use strict';
const serverless = require("serverless-http");
const http=require('http');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const morgan=require("morgan");
const app = express();
const router=require("./router");

const connectToDatabase = require('./db');
const migration=require('./service/MigrationHelper');
require('dotenv').config({ path: './variables.env' });

app.use(cors());
app.use(morgan('combined'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type:'*/*'}));
// parse application/json
app.use(bodyParser.json());

const [initAdmin]=migration();
initAdmin();

router(app);

//return;
//server setup
const port=process.env.PORT || 3090;
const server=http.createServer(app);
server.listen(port);

return;

module.exports.index=serverless(app);

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
    .then(() => {
      Note.find()
        .then(notes => callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify(notes)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }))
    });
 };

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
    .then(() => {
      Note.create(JSON.parse(event.body))
        .then(note => callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify(note)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the note.'
        }));
    });
 };

module.exports.hello = async event => {
  connectToDatabase();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.myFunc2 = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'output function 2',
        input: event,
      },
      null,
      2
    ),
  };
};

