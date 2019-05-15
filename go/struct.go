package main

import "fmt"

// 声明一个结构（struct）
type user struct {
	name string
	age  int
}

type Acoord struct {
	ax, ay int
}

// 继承 Acoord 属性
type Bcoord struct {
	Acoord
	bx, by int
}

func main() {
	// 使用 new 函数给一个新的结构体变量分配内存
	// 它返回指向已分配内存的指针：var t *T = new(T)
	// who 通常被称做类型 user 的一个实例（instance）或对象（object）
	who := new(user)
	who.name = "Barrior"
	who.age = 26
	println("who:", who)
	println("name:", who.name)
	println("age:", who.age)

	// 混合字面量语法（composite literal syntax）&struct1{a, b, c} 是一种简写，底层仍然会调用 new ()
	// 值的顺序必须按照字段顺序来写，& 不是必须的
	who2 := &user{"Tom", 25}
	println("who2:", who2)
	println("name:", who2.name)
	println("age:", who2.age)

	b := Bcoord{Acoord{1, 1}, 2, 2}
	println(b.Acoord.ax, b.Acoord.ay)
	println(b.ax, b.ay, b.bx, b.by)
	// 用 fmt.Println 才能打印出 Acoord
	fmt.Println(b.Acoord)
}
