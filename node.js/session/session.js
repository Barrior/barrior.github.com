/**
 http://www.hubwiz.com/class/55c2c01e3ad79a1b05dcc432
 ●什么是session？
    session是另一种记录客户状态的机制，不同的是【Cookie保存在客户端浏览器】中，而【session保存在服务器】上。
    客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。
    如果说Cookie机制是通过检查客户身上的“通行证”来确定客户身份的话，那么session机制就是通过检查服务器上的“客户明细表”来确认客户身份。
    session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

 ●两者的区别：
    cookie数据存放在客户的浏览器上，session数据放在服务器上。
    cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗 考虑到安全应当使用session。
    session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 考虑到减轻服务器性能方面，应当使用COOKIE。
    单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。
    所以建议：将登陆信息等重要信息存放为session、其他信息如果需要保留，可以放在cookie中

 ●session的本质:
    session的本质使用cookie来实现。
    原理大概是：http 带来服务端提前设置 cookie，服务端拿到标示用户身份的cookie, 再去固定地点（数据库，文件）检索出对应的用户身份。把身份赋值给本次请求的request,在程序处理中就知晓了用户的身份了。（在PHP,ASP或者其他服务端语言中都自动帮你实现了）
 */

var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({
    //必填，建议使用随机字符串
    secret: 'secret-string',
    // 过期时间(毫秒)，次数保存30天
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));

app.get('/', function( req, res ){

    console.log( req.session );

    //检查用户是否登录
    if( req.session.signin ){
        req.session.times++;
        res.end( '欢迎第'+ req.session.times +'次来到session的世界！' );
    }else{
        req.session.signin = true;
        req.session.times = 1;
        req.session.name = 'session-name';
        res.end( '欢迎第'+ req.session.times +'次来到session的世界！' );
    }

}).listen( 8080 );

app.post('/logout', function( req, res ){
    //destroy()方法：清空session
    req.session.destroy();
})

/*
 session( options )
name: 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 。
store: session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。express 生态中都有相应模块的支持。
secret: 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
cookie: 设置存放 session id 的 cookie 的相关选项，默认为 (default: { path: '/', httpOnly: true, secure: false, maxAge: null })
genid: 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包。
rolling: 每个请求都重新设置一个 cookie，默认为 false。
resave: 即使 session 没有被修改，也保存 session 值，默认为 true。
*/
