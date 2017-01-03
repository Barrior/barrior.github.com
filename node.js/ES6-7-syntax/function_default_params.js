
function info(a = {name: 'Barrior', age: 24}) {
    console.log(a);
}


info();                 // { name: 'Barrior', age: 24 }
info({});               // {}
info({name: 'jake'});   // { name: 'jake' }

// 结论：默认参数是对象时，也是跟字符串更方式一样，直接采用替换的方式，而不是拷贝的方式