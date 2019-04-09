interface Person {
    name: string;
    age: number;
}

// 声明一个对象，数据结构与 Person 保持一致
const man: Person = {
    name: 'Barrior',
    age: 24
};

console.log(man, man.name);

// 定义一个除了给定属性以外，还可以带有任意数量的其它属性
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
