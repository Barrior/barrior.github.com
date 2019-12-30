package main

import "fmt"

// 接口定义了一组方法
type Namer interface {
    Method1(param_list) return_type
    Method2(param_list) return_type
}

type Shaper interface {
    Area() float32
}

func main() {
	Shaper
}
