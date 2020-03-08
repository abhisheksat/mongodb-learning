var MongoClient = require('mongodb').MongoClient;
var Hapi = require('hapi');

var url = 'mongodb://localhost:27017/learning_mongo';

// var server = new Hapi.Server();
// server.connection({
//     port:8080
// });

//  The version changes in Hapi requires to initialize server as below
const server = new Hapi.Server({  
    host: 'localhost',
    port: 8080
  })

server.route([

    //  Get Tours List
    {
        //  Return a specific tour with help of an input parameters  
        method: 'GET',
        path: '/api/tours',

        //  This formats the JSON when viewing in Chrome
        config: {json: {space:2}},
        handler: function(request, h) {
            
            //  Populate this object with incoming request parameter
            //  Pass in this to the MongoDB find query
            var findObject = {};
            for (var key in request.query) {
                findObject[key] = request.query[key];
            }

            //  Searching MongoDB with a parameter
            return collection.find(findObject).toArray();
        }

        //  Code to return all tours
        /*
        method: 'GET',
        path: '/api/tours',
        handler: function(request, h) {
            return collection.find().toArray();
        }
        */
    },
    
    //  Add New Tour
    {
        method: 'POST',
        path: '/api/tours',
        config: {json: {space:2}},
        handler: function(request, h) {
            collection.insertOne(request.payload);
            return request.payload;
        }
    },

    //  Get a Single Tour by tourName
    {
        method: 'GET',
        path: '/api/tours/{name}',
        config: {json: {space:2}},
        handler: function(request, h) {
            return collection.findOne({"tourName":request.params.name});
        }
    },

    //  Update a single tour
    {
        method: 'PUT',
        path: '/api/tours/{name}',
        handler: function(request, h) {

            //  Replace the tour with given request payload
            if (request.query.replace == "true") {
                request.payload.tourName = request.params.name;
                collection.replaceOne({"tourName":request.params.name}, request.payload);
                return collection.findOne({"tourName":request.params.name});
            } else {
                //  Add to tour details
                collection.updateOne({tourName: request.params.name}, {$set: request.payload});
                return collection.findOne({"tourName": request.params.name});
            }
        }
    },

    //  Delete a single tour
    {
        method: 'DELETE',
        path: '/api/tours/{name}',
        handler: function(request, h) {
            collection.deleteOne({tourName: request.params.name})
            return h.response().code(204);
        }
    },

    //  Home page
    {
        method: 'GET',
        path: '/',
        handler: function(request, h) {
            var data = "Hello World from Hapi / Mongo Example";
            return h.response(data).code(200);
        }
    }
])

//  Connection to MongoDB
MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to the server");
    var myLearningMongoDB = db.db('learning_mongo');
    collection = myLearningMongoDB.collection('tours');
    server.start(function(err) {
        console.log('Hapi is listening to http://localhost:8080');
    });
});