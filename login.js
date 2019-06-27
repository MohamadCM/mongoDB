var username = 'Mohamad3';
var password = '1234';


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

var query = {'userName': `${username}`, 'password': `${password}`};

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    dbo.collection('user').findOne(query, function(err, res) {
        if (err) throw err;
        if(res === null)
            console.log('Wrong info, cannot login');
        else
            console.log('Successful login')
        db.close();
    });
});
