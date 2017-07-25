import test from 'ava';

function trimAll(string) {
    return string.replace(/[\s\b]/g, '');
}

test('trimAll testing', t => {
    // 字符串内含有空格符、制表符等空字符都应删除
    t.is(trimAll(' \n \r \t \v \b \f B a r r  i  o  r  \n  \r  \t  \v  \b  \f  '), 'Barrior');

    // 无空字符时，输出值应为输入值
    t.is(trimAll('Barrior'), 'Barrior');

    // 输入 new String 对象应与输入基本类型字符串结果相同
    t.is(trimAll(new String(' T o m ')), 'Tom');

    // 输入其他非字符串数据类型时，应抛出错误
    [undefined, null, 0, true, [], {}, () => {}, Symbol()].forEach(type => {
        t.throws(() => {
            trimAll(type);
        });
    });
});