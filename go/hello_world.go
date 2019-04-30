package main

import "fmt"

func main() {
	fmt.Printf("hello world \n")

	// 声明一个变量用 :, 赋值用 =，组合为 :=
	a := 2

	// 声明一个带类型并赋值的变量
	var b string = "hello world"

	fmt.Printf("[a]: %d \n", a)
	fmt.Printf("[b]: %s \n", b)
}
