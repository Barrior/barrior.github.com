const path = require('path');

// 用 path 处理路径系列问题，可以较方便的得到处理好兼容的返回值
// 因为 windows 和 POSIX 有很多不一样的地方，比如路径分隔符，定界符等


// path.delimiter 定界符，也是处理不同系统的
console.log(process.env.PATH.split(path.delimiter));
console.log(process.env.path === process.env.PATH);
console.log(process.env.PATH);


// 连接路径，仅仅返回输入的路径值
const join = path.join('foo', 'bar', 'baz/../anonymous', 'name', '..');
console.log('join: ', join);          // Returns: '/foo/bar/anonymous'


// 根据当前目录的路径，再连接输入的路径，返回带磁盘符的路径
// 如果输入的是根路径，则直接返回输入的路径，如：path.resolve('/foo/bar', '../baz');
// 得到：e:\foo\baz
const resolve = path.resolve('../foo/bar', './baz');
console.log('resolve: ', resolve);          // return 'e:\barrior.github.com\node.js\foo\bar\baz' on windows


// 使正常化，去掉路径中的 .. 或 . 或 多余的 /
const normalize = path.normalize('/foo/bar//baz/anonymous/name/..');
console.log('normalize: ', normalize);      // Returns: '/foo/bar/baz/anonymous'