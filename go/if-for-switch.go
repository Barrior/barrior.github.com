package main

import "fmt"

func main() {

	a := 10

	if a == 10 {
		println("\"a\" is equal to 10")
	}

	switch {
	case a < 5:
		println("[switch]: \"a\" is less than 5")
	case a >= 5:
		println("[switch]: \"a\" is not less than 5")
	}

	for i := 0; i < 5; i++ {
		println("i:", i)
	}

	// ASCII 编码的字符占用 1 个字节，既每个索引都指向不同的字符
	strEnglish := "golang"
	for i := 0; i < len(strEnglish); i++ {
		fmt.Printf("Character on position %d is: %c \n", i, strEnglish[i])
	}

	// 而非 ASCII 编码的字符（占有 2 到 4 个字节）不能单纯地使用索引来判断是否为同一个字符
	strCn := "中文"
	for i := 0; i < len(strCn); i++ {
		fmt.Printf("Character on position %d is: %c \n", i, strCn[i])
	}

	// for range 迭代结构，语法上很类似其它语言中 foreach 语句
	// 一般形式为：for index, value := range coll { }
	for i, runeVal := range strCn {
		fmt.Printf("Character on position %d is: %c \n", i, runeVal)
	}
}
