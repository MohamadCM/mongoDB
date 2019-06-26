var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';


var query = {};
var queryOption = { projection: { _id: 0, firstName:1, lastName:1, userName:1  } };

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    dbo.collection('user').find(query, queryOption).sort({ firstName: 1 }).toArray(function(err, res) {
        if (err) throw err;
        db.close();
        console.log(res);
    });
});
