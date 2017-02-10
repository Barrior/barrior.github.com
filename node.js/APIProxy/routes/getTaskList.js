const {randomInt, getTel} = require('../tools');

module.exports = function () {

    for (let i = 0; i < 4; i++) {
        this.ykres.data.push({
            agency: randomInt(400),
            beeCount: randomInt(500),
            salerCount: randomInt(30),
            teamCount: randomInt(10),
            managerCount: randomInt(10),
            finish: randomInt(1000),
            inProgress: randomInt(600),
            notStart: randomInt(100)
        });
    }

};