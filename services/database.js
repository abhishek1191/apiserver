var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://coffeemaker:test1234@ds141657.mlab.com:41657/coffeehouse';
const dbName = 'coffeehouse';
// Use connect method to connect to the server

MongoClient.connect(url, function(err, client) {
    if(err){
        console.log(err);
    }
    else { console.log("Connected successfully to server"); }

    client.close();
});

function findById(id, cb){
    MongoClient.connect(url, function(err, client) {
        if(err){
            console.log(err);
        }
        else {
            // Get the documents collection
            const db = client.db(dbName);
            const collection = db.collection('users');
            // Find some documents
            collection.find({id:id}).toArray(function(err, docs) {
                console.log("Found the following records");
                console.log(docs);
                if(cb) {
                    cb(docs);
                }
            });
        }
        client.close();
    });
}

function findByName(name, cb){
    MongoClient.connect(url, function(err, client) {
        if(err){
            console.log(err);
        }
        else {
            // Get the documents collection
            const db = client.db(dbName);
            const collection = db.collection('users');
            // Find some documents
            collection.find({name}).toArray(function(err, docs) {
                console.log("Found the following records");
                console.log(docs);
                if(cb) {
                    cb(docs);
                }
            });
        }
        client.close();
    });
}

module.exports = findByName;