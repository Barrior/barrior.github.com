package main

const a = 10

func main() {
	println(a == 10)

	// 位运算 “&” 与运算符 “&&” 相同，只是返回 1 或 0
	println(1 & 1)

	// 按位异或，相同的值返回 0
	println(10 ^ 10)
	// 不同的值返回 1
	println(10 ^ 11)
}
