var username = 'Mohamad3';
var query = {'userName': `${username}`};


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    //Checking if userName exists or not
    dbo.collection('user').findOne(query, function(err, res) {
        if (err) throw err;
        db.close();
        if(res !== null)
            console.log('Such user Exist, try another username!');
                                                    else
                                                        {
                                                                            var password = '1234';
                                                                            var firstName = 'Mohamad3';
                                                                            var lastName = 'CM3';
                                                                            var studentID = '9631018';
                                                                            var entryYear = '1396';
                                                                            var degree = 'bsc';
                                                                            query = {'userName':`${username}`, 'password': `${password}`, 'firstName':`${firstName}`, 'lastName':`${lastName}`,
                                                                                'studentID':`${studentID}`, 'enteryYear': `${entryYear}`, 'degree':`${degree}`, 'friends':[`${username}`], 'channels':[],
                                                                                following:[], channelMessages:[], userMessages:[]};
                                                                            //Registering new user
                                                                            MongoClient.connect(url, function(err, db) {
                                                                                if (err) throw err;
                                                                                var dbo = db.db('project');
                                                                                dbo.collection('user').insertOne(query, function(err, res) {
                                                                                    if (err) throw err;
                                                                                    console.log('User Registered' + res);
                                                                                    db.close();
                                                                                });
                                                                            });

                                                        }
    });
});
