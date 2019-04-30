package main

var a = "G"

func main() {
	var a = "mm"
	println("main called:", a)
	n()
	m()
	n()
}

func n() { println("n called:", a) }

func m() {
	a := "O"
	println("m called:", a)
}
