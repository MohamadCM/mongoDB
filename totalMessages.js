var userName1 = 'Mohamad';
var userName2 = 'Mohamad2';

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('project');
    //Counting messages user1 send to user2
    dbo.collection('user').aggregate([
        {$match:{userName:`${userName2}`}},
        {
            $project: {
                userName: 1,
                totalMessages: { $cond: { if: { $isArray: "$userMessages" },
                        then: { $size: {$filter: {input:"$userMessages", as:'item',
                                    cond:{$eq:['$$item.sender',`${userName1}`]}}} }, else: "NA"} }
            }
        }
    ], function(err, res) {
        if (err) throw err;
        console.log(res);
        db.close();
    });
});
