package main

func main() {
	// 格式: var map1 map[keytype]valuetype
	mapLit := map[string]int{"one": 1, "two": 2}
	println("mapLit[\"one\"]:", mapLit["one"])

	// 判断 key 是否存在
	value, isPresent := mapLit["myKey"]
	if isPresent {
		println("\"myKey\" is existed in mapLit.")
		println("the value of \"myKey\" is ", value)
	} else {
		println("\"myKey\" is not existed in mapLit.")
	}

	// 删除 key
	delete(mapLit, "one")
	println("mapLit[\"one\"]:", mapLit["one"])
}
