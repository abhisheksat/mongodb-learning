Building an application in Node.js

In the node application

npm install mongodb
npm install hapi

Create an index.js file

require mongodb.MongoClient



Using the MongoClient connect to the database

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learning_mongo';
MongoClient.connect(url, function(err, db) {
    console.log("Connected successfully to server");
})


To Create APIs using Node and Mongo we use Hapi.
Follow the code committed to nodemongo_api


