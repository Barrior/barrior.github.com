package main

var map1 = map[string]int{"a": 5, "b": 6}

// 常规声明一个函数，入参和出参
func Sum (a int, b int) int {
	return a + b
}

// 命名的返回值函数（named return variables）
func Sum2 (a int, b int) (result int) {
	result = a + b
	return
}

// 声明一个返回函数的函数
// 类型为 func(b int) int
func Adder (a int) func(b int) int {
	return func(b int) int {
		return a + b
	}
}

func main() {
	println("Sum(1, 2):", Sum(1, 2))
	println("Sum2(1, 2):", Sum2(1, 2))

	// 空白符（blank identifier）
	// 空白符用来匹配一些不需要的值，然后丢弃掉
	a, _, c := 1, 2, 3
	println("a:", a)
	// cannot use _ as value
	// println("_:", _)
	println("c:", c)

	println("Adder(2)(3):", Adder(2)(3))
}


