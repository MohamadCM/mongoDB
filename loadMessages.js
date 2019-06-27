var userName = 'Mohamad2';

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var query = {userName: `${userName}`};

var option1 = {_id:0,userName:0,
    password:0,
    firstName:0,
    lastName:0,
    studentID:0,
    entryYear:0,
    degree:0,
    friends:0,
    channels:0,
    following:0,
    channelMessages:0,
    userMessages:{$slice: -3}};

var option2 = {_id:0,userName:0,
    password:0,
    firstName:0,
    lastName:0,
    studentID:0,
    entryYear:0,
    degree:0,
    friends:0,
    channels:0,
    following:0,
    userMessages:0,
    channelMessages:{$slice: -5}};

//Getting user messages
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    dbo.collection('user').findOne(query,option1, function(err, res) {
        if (err) throw err;
        console.log('User Messages:');
        if(res !== undefined)
            console.log(res.userMessages);
        db.close();
    });
});
//Getting Channel messages
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    dbo.collection('user').findOne(query,option2, function(err, res) {
        if (err) throw err;
        console.log('Channel Messages:');
        if(res !== undefined)
            console.log(res.channelMessages);
        db.close();
    });
});
