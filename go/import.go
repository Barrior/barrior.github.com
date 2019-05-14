package main

// 导入 fmt 并命名为 fmt 的变量
import "fmt"

// 导入多个包
import (
	"os"
	"time"
	// 将包用别名替代
	rt "runtime"
	// 导入自定义包
	// 1、import 关键字导入的并不是一个真正的包，而是一个文件夹的路径
	// 2、一个文件夹下不能定义2个不同的包名
	/*
	   另外： package 包名（区分大小写）
	       import 文件夹名（不区分大小写）
	*/
	"./custom_package"
)

func main() {
	// RUN_ENV=test go run import.go
	fmt.Printf("Current ENV: %s\n", os.Getenv("RUN_ENV"))
	fmt.Printf("The number of CPUs: %d\n", rt.NumCPU())
	fmt.Printf("time.Now(): %v\n", time.Now())

	println("custom_package.SayHi():", custom_package.SayHi())
	println("custom_package.SayHi2():", custom_package.SayHi2())
}
