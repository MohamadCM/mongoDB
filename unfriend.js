var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

var userName = 'Mohamad';
var friend = 'Mohamad';

var query = {userName: `${userName}`};

var friendQuery = {$pull: {friends: {userName: `${friend}`}}};


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    dbo.collection('user').findOne(query, function(err, res) {
        if (err) throw err;
        console.log(res.friends);
        if(res.friends.includes({userName: `${friend}`}))
        {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db('project');
                dbo.collection('user').updateOne(query,friendQuery, function(err, res) {
                    if (err) throw err;
                    console.log('Document updated' + res);
                    result = res;
                    db.close();
                });
            });
            query = {userName: `${friend}`};
            friendQuery = {$push: {friends: {userName: `${userName}`}}};
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db('project');
                dbo.collection('user').updateOne(query,friendQuery, function(err, res) {
                    if (err) throw err;
                    console.log('Document updated' + res);
                    result = res;
                    db.close();
                });
            });
        }
        else
            console.log('Are not friends yet!');
        db.close();
    });
});

