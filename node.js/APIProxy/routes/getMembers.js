const {randomInt, getTel} = require('../tools');

module.exports = function () {

    this.ykres.data = {
        members: [
            {
                name: '<h3>Barrior</h3>',
                age: randomInt(24, 22),
                tel: getTel()
            },
            {
                name: 'Alice',
                age: randomInt(23, 21)
            }
        ]
    };

    this.body = this.ykres;

    console.log('in get members');

    // 响应头得放在响应数据之后，koa的执行问题！？
    this.set({
        'Etag': 520,
        'Last-Modified': 1314
    });

};