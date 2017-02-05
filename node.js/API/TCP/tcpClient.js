
var net = require('net');

//创建连接对象
var client = net.connect( 8080, 'localhost' );

//监听连接事件
client.on( 'connect', function () {
    console.log( 'connecting...' );
})

/*
var client = net.connect({
    port: 8080,
    host: 'localhost'
}, function () {
    client.write([
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'Host: www.baidu.com',
        'Accept: *!/!*',
        '',
        ''
    ].join('\n'));
});

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});*/
