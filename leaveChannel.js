var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

var userName = 'Mohamad';
var channelName = 'ch1';
var query = {userName: `${userName}`};
var channelQuery = {$pull: {following: `${channelName}`}};

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    dbo.collection('user').updateOne(query, channelQuery, function(err, res) {
        if (err) throw err;
        console.log('Document updated' + res);
        db.close();
    });
});