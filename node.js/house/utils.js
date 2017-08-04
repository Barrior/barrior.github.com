const utils = {
    // 修剪所有的空字符
    trimAll(string) {
        return string.replace(/[\s\b]/g, '');
    },
    // 合并多个空字符为一个空白字符
    resetBlank(string) {
        return string.replace(/[\s\b]+/g, ' ');
    }
};

module.exports = utils;