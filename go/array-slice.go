package main

import (
	"fmt"
	"strconv"
)

// 字符串转数字
func stringToNumber() {
	val, err := strconv.Atoi("1")
	println("val is:", val)
	println("err is:", err)
	println(1 > val)
}

func main() {
	stringToNumber()

	var arr1 [5]int
	println("arr1 length is:", len(arr1))
	for i := 0; i < len(arr1); i++ {
		fmt.Printf("arr1[%d]: %d \n", i, arr1[i])
	}

	// 声明一个数组并赋值
	var arr2 = []int{18, 20, 15, 22, 16}
	println("arr2 length is:", len(arr2))
	for i, val := range arr2 {
		fmt.Printf("arr2[%v]: %v \n", i, val)
	}

	// 切片是一个[长度可变的数组]
	// 声明切片的格式是： var identifier []type
	var slice1 [5]int
	println("slice1 length is:", len(slice1))
	for i := 0; i < len(slice1); i++ {
		fmt.Printf("slice1[%d]: %d \n", i, slice1[i])
	}

	slice2 := []int{1, 2}
	println("slice2 length is:", len(slice2))
	println("cap(slice2) is:", cap(slice2))
}
