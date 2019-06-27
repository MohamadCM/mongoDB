var channelName = 'ch1';
var userName = 'Mohamad2';


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var query = {userName: `${userName}`};
var channelQuery = {$addToSet: {following: `${channelName}`}};


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var flag = false;
    var dbo = db.db('project');
    //getting all available channels
    dbo.collection('user').find({}).toArray(function(err, res) {
        if (err) throw err;
        for (var user of res){
            if(user.channels !== undefined){
                for(var channel of user.channels){

                    if(channel.name === channelName){
                        //Adding channel to user's list
                        MongoClient.connect(url, function(err, db) {
                            if (err) throw err;
                            var dbo = db.db('project');
                            dbo.collection('user').updateOne(query, channelQuery, function(err, res) {
                                if (err) throw err;
                                console.log('Document updated' + res);
                                db.close();
                            });
                        });
                        //Adding user to channel's list
                        MongoClient.connect(url, function(err, db) {
                            var query = {userName: `${user.userName}`};
                            var index = user.channels.indexOf(channel);
                            var channelQuery = {$addToSet: {['channels.' +index + '.followers']: `${userName}`}};
                            if (err) throw err;
                            var dbo = db.db('project');
                            dbo.collection('user').updateOne(query, channelQuery, function(err, res) {
                                if (err) throw err;
                                console.log('Document updated' + res);
                                db.close();
                            });
                        });

                        flag = true;
                        break;
                    }
                }
            }
            if(flag)
                break;
        }
        db.close();
    });
});
