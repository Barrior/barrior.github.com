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


// 元组 Tuple
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
// 比如，你可以定义一对值分别为string和number类型的元组。
// Declare a tuple type
let x: [string, number];


// 枚举
// enum类型是对JavaScript标准数据类型的一个补充。
// 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
console.log(Color);

// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。
// 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
let colorName: string = Color[1];
console.log(colorName);

// 在带有多个声明的枚举中，只有一个声明可以省略第一个enum元素的初始化器。
// 应该重新初始化第一件，这里DarkRed = 3
enum Color {
    DarkRed = 3,
    DarkGreen,
    DarkBlue
}
console.log(Color);


// 任意值
let notSure: any = 4;
notSure = "maybe a string instead";


// 空值
// 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。
// 当一个函数没有返回值时，你通常会见到其返回值类型是void：
function warnUser(): void {
    alert("This is my warning message");
}
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
let unusable: void = undefined;


// 类型断言
// 两种形式是等价的。至于使用哪个大多数情况下是凭个人喜好；
// 然而，当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// 或者
let strLength2: number = (someValue as string).length;