// 解构赋值，属性重命名
const obj = {a: 'hello', b: 2};
let {a, b}: {a: string, b: number} = obj;

// 默认值
// 现在，即使 b 为 undefined
// keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let {a, b = 1001} = wholeObject;
}