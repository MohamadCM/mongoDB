var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

var userName = 'Mohamad';
var channelName = 'ch1';
var message = 'final new Message 2';

var query = {userName: userName};

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    dbo.collection('user').findOne(query, function(err, res) {
        if (err) throw err;
        for(var channel of res.channels){
            if(channel.name === channelName){
                MongoClient.connect(url, function(err, db) {
                    var query = {userName: `${res.userName}`};
                    var index = res.channels.indexOf(channel);
                    var channelQuery = {$addToSet: {['channels.' +index + '.messages']: `${message}`}};
                    if (err) throw err;
                    var dbo = db.db('project');
                    // Inserting message in channel
                    dbo.collection('user').updateOne(query, channelQuery, function(err, res) {
                        if (err) throw err;
                        console.log('Document updated' + res);
                        db.close();
                    });
                });
                //Sending message to followers
                for(var follower of channel.followers){
                    MongoClient.connect(url, function(err, db) {
                        query = {userName: `${follower}`};
                        var messageQuery = {$addToSet: {messages: {message:`${message}`, type: 'channel',sender: `${channel.name}`}}};
                        if (err) throw err;
                        var dbo = db.db('project');
                        dbo.collection('user').updateOne(query, messageQuery, function(err, res) {
                            if (err) throw err;
                            console.log('Document updated' + res);
                            db.close();
                        });
                    });
                }

                break;
            }

        }
        db.close();
    });
});
