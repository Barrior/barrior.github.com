const {randomInt, getTel} = require('../tools');

module.exports = function () {

    for (let i = 0; i < 6; i++) {
        this.ykres.data.push({
            name: '张三' + i,
            sex: 'male',
            age: randomInt(26, 21),
            tel: getTel()
        });
    }

};