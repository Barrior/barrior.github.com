
// 布尔值
let isDone: boolean = false;

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串
// 不能使用 name，因为浏览器全局对象 window 上已经存在 name 属性了
// https://github.com/Microsoft/TypeScript/issues/8107
let otherName: string = "bob";
otherName = "smith";

// 数组
// 第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组
let list: number[] = [1, 2, 3];

// 第二种方式是使用数组泛型，Array<元素类型>：
let list2: Array<number | string> = [1, 2, 3, 'Barrior'];