let tools = {
    randomInt(max = 1, min = 0) {
        return parseInt(Math.random() * (max - min) + min);
    },
    getTel() {

        // 避免解构赋值调用函数时 this 引用错误，所以都用 tools 替代
        let tel = '1' + '34578'.split('')[tools.randomInt(5)];

        for (let i = 0; i < 10; i++) {
            tel += tools.randomInt(10);
        }

        return tel;
    }
};


module.exports = tools;