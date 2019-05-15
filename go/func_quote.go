package main

import "fmt"

func A(a int) {
	a = 10
	fmt.Println("a:", a) // 10
}

func A2(a []int) {
	a[0] = 10
	a[1] = 11
	fmt.Println("a:", a) // [10, 11]
}

// 读取地址引用变量需要加 * 号，后面变量使用也要加 * 号
func A3(a *int) {
	*a = 10
	fmt.Println("*a:", *a) // 10
}

func main() {
	a := 1
	// 普通传值，则是传递的值拷贝，不影响原值
	A(a)
	fmt.Println("a:", a) // 1

	// 如果传递的是数组或slice之类，则传递的是地址拷贝，影响原值
	a2 := []int{1, 2}
	A2(a2)
	fmt.Println("a2:", a2) // [10, 11]

	// 将基本类型通过 & 符合传递给函数，表示传递值的地址，就可以影响原值了
	a3 := 1
	A3(&a3)
	fmt.Println("a3:", a3)
}
