/**
 * Created by Heart on 2016/3/3.
 */

var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://127.4.39.2:27017/chat';

//var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + dbName;
//mongodb://user:password@host:port/db_name

//连接数据库
mongoClient.connect( url, function ( err, db ) {
    if( !err ){
        //连接文档集合
        var collection = db.collection( 'user' );
        /*collection.insert([{
            username: '机器人-Cico',
            avatarNum: 14,
            id: 0
        },{
            username: '机器人-蒙奇·D·路飞',
            avatarNum: 18,
            id: 1
        }]);*/
        //查询语句
        collection.find().toArray(function( err, result ){
            //输出数据
            console.log( result );
            //关闭数据库连接
            db.close();
        });
    }else{
        console.log( err );
    }
})