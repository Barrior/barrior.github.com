var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {

    getDataFormDB(function( content ){
        res.render('info', {
            title: 'info page',
            content: content,
            siteUrl: '/'
        });
        //res.end('hello world');
    });

});

module.exports = router;

function getDataFormDB( callback ){
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'mydb'
    });

    connection.connect();

    var querySql = 'select * from user';

    connection.query( querySql, function( err, result, fields ){
        var selectResult;
        if( err ){
            selectResult = JSON.stringify( err );
        }else{
            console.log( result )
            selectResult = result;
        }
        callback( selectResult );
    });
}
