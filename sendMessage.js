var userName1 = 'Mohamad';
var userName2 = 'Mohamad2';
var message = 'Sending message4';


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var query = {'userName': `${userName1}`};

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    //Checking if user's are friends or Not
    dbo.collection('user').findOne(query, function(err, res) {
        if (err) throw err;
        for(var friend of res.friends){
            if(friend === userName2){
                query = {'userName': `${userName2}`};
                var messageQuery = {$push: {userMessages: {message:`${message}`,sender: `${userName1}`}}};
                //Sending message
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db('project');
                    dbo.collection('user').updateOne(query, messageQuery, function(err, res) {
                        if (err) throw err;
                        console.log('Document updated' + res);
                        db.close();
                    });
                });

                break;
            }
        }
        db.close();
    });
});
