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