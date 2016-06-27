
var mongodb = require('mongodb');
var server = new mongodb.Server( 'localhost', 27017 );
var db = new mongodb.Db( '2099@gift', server, {safe: true} );

//数据库连接
db.open(function( err, db ){
    if( err ){
        return console.log( '数据库连接错误', err );
    }
    //连接集合里的某个文档
    db.createCollection( 'article', {safe: true}, function ( err, collection ) {
        if( err ){
            return console.log( '文档连接错误', err );
        }
        //插入数据
        collection.insert({
           title: 'NodeMongoDB'
        });
        //更新数据
        collection.update({
            title: 'NodeMongoDB'
        },{
            $set: {
                info: 'Hello node mongodb'
            }
        },{
            //默认false，只更新找到的第一条记录
            multi: true,
        },function( err, result ){});
        //删除所有记录
        //collection.remove();
        //删除特定记录
        //collection.remove({title:'NodeMongoDB'},function( err, result ){});
        //条件查询数据
        collection.find().toArray(function( err, docs ){
            console.log( docs )
        });
        //查询一条记录
        collection.findOne(function( err, doc ){
            console.log( doc )
        });
        //删除文档集合
        //db.dropCollection('myCollection',{safe:true},function(err,result){});
    });
    //关闭数据库
    /*db.close(function( err ){
        !err && console.log( '数据库关闭成功' )
    });*/
});