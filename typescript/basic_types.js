// 布尔值
var isDone = false;
// 数字
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
// 字符串
// 不能使用 name，因为浏览器全局对象 window 上已经存在 name 属性了
// https://github.com/Microsoft/TypeScript/issues/8107
var otherName = "bob";
otherName = "smith";
// 数组
// 第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组
var list = [1, 2, 3];
// 第二种方式是使用数组泛型，Array<元素类型>：
var list2 = [1, 2, 3, 'Barrior'];
