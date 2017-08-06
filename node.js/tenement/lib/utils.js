const utils = {
    // 修剪所有的空字符
    trimAll(string) {
        return string.replace(/[\s\b]/g, '');
    },
    // 合并多个空字符为一个空白字符
    resetBlank(string) {
        return string.replace(/[\s\b]+/g, ' ');
    },
    // 休眠一段时间
    sleep(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    },
    // 限制随机值
    limitRandom(max, min) {
        return max === min ? max : (Math.random() * (max - min) + min);
    },
    // 随机选择数组里的某个值
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
};

module.exports = utils;