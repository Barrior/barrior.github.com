package main

import "fmt"

// Printf --> "Print Formatter" this function allows you to format numbers, variables and strings into the first string parameter you give it.

// Println --> "Print Line" This cannot format anything, it simply takes a string, prints it and append a newline char, '/n'.

// Print --> "Print" same thing as Println however it will NOT append a newline char

var a = 0
var b = a

func main() {
	fmt.Printf("b:%v\n", b)
	fmt.Println("b:", b)
	fmt.Print("b:", b, "\n")
	fmt.Println("b:", b)
}
