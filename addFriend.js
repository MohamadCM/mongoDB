var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

var userName = 'Mohamad';
var friend = 'Mohamad2';

var query = {userName: `${userName}`};

var friendQuery = {$addToSet: {friends: `${friend}`}};


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    dbo.collection('user').findOne(query, function(err, res) {
        if (err) throw err;
        if(!res.friends.includes(`${friend}`))
            {
                console.log('Adding to friends!');
                MongoClient.connect(url, function(err, db) {
                                        if (err) throw err;
                                        var dbo = db.db('project');
                                        dbo.collection('user').updateOne(query,friendQuery, function(err, res) {
                                            if (err) throw err;
                                            console.log('Document updated' + res);
                                            db.close();
                                        });
                                    });
                                    MongoClient.connect(url, function(err, db) {
                                        query = {userName: `${friend}`};
                                        friendQuery = {$addToSet: {friends: `${userName}`}};
                                        if (err) throw err;
                                        var dbo = db.db('project');
                                        dbo.collection('user').updateOne(query,friendQuery, function(err, res) {
                                            if (err) throw err;
                                            console.log('Document updated' + res);
                                            db.close();
                                        });
                                    });
            }
        else
            console.log('Already Friends!');
        db.close();
    });
});

