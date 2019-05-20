package main

import "fmt"

type user struct {
	name string
	age  int
}

// 定义方法的一般格式如下：
// func (recv receiver_type) methodName(parameter_list) (return_value_list) { ... }
// func (_ receiver_type) methodName(parameter_list) (return_value_list) { ... }
// recv 就像是面向对象语言中的 this
func (u *user) ShowName() string {
	return u.name
}

func (u *user) ShowPlusAge(number int) int {
	return u.age + number
}

func main() {
	person := user{"Barrior", 26}
	fmt.Println("the name is:", person.ShowName())
	fmt.Println("the age is:", person.ShowPlusAge(-10))
}
