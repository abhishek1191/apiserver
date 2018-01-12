var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://coffeemaker:test1234@ds141657.mlab.com:41657/coffeehouse';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    if(err){
        console.log(err);
    }
    else { console.log("Connected successfully to server"); }

    db.close();
});

