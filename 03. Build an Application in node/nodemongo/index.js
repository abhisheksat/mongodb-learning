var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learning_mongo';

//  Get the database reference to fetch the required collection
var findDocuments = function(db, callback) {

    var collection = db.collection('tours');
    collection.find({"tourPackage":"Snowboard Cali"}).toArray(function(err, docs) {
        console.log(docs);
        callback;
    });

    /*
    var collection = db.collection('tours');
    collection.find().toArray(function(err, docs) {
        console.log(docs);
        callback;
    });
    */
}

MongoClient.connect(url, function(err, db) {

    console.log("Connected successfully to server");
    
    //  Get the database from the server and pass as reference
    const myLearningMongoDB = db.db('learning_mongo');

    findDocuments(myLearningMongoDB, function() {
        db.close();
    });

});