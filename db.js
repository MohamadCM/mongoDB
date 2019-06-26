var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
  function insert(query){
    var result = null;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db('project');
      dbo.collection('user').insertOne(query, function(err, res) {
        if (err) throw err;
        console.log('Document inserted' + res);
        result = res;
        db.close();
      });
    });
    return result;
  }
  function update(query, newValue){
    var result = null;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db('project');
      dbo.collection('user').updateOne(query, newValue, function(err, res) {
        if (err) throw err;
        console.log('Document updated' + res);
        result = res;
        db.close();
      });
    });
    return result;
  }
  function find(query){
    var result = null;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db('project');
      dbo.collection('user').findOne(query, function(err, res) {
        if (err) throw err;
        console.log(res);
        result = res;
        db.close();
      });
    });
    return result;
  }
module.exports = {insert, update, find};
