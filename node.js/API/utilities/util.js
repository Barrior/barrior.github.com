const util = require('util');

const man = {name: 'Barrior'};

// util.format, 当是数字时，%d, %s 之间互换不受影响
let host = util.format('https://%s:%d/%s/%j', 'www.baidu.com', 80, 34, man);
let host2 = `https://${'www.baidu.com'}:${80}/${34}/${JSON.stringify(man)}`;

console.log(host);
console.log(host2);