package main

// 导入 fmt 并命名为 fmt 的变量
import "fmt"

// 导入多个包
import (
	"os"
	"time"
	// 将包用别名替代
	rt "runtime"
)

func main() {
	// RUN_ENV=test go run import.go
	fmt.Printf("Current ENV: %s\n", os.Getenv("RUN_ENV"))
	fmt.Printf("The number of CPUs: %d\n", rt.NumCPU())
	fmt.Printf("time.Now(): %v\n", time.Now())
}
