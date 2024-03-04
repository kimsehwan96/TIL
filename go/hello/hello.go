package main

import (
	"fmt"
	"math/rand"
)

func add(x int, y int) int {
	return x + y
}

func main() {
	fmt.Println("Hello", rand.Intn(10))
	fmt.Println(add(42, 13))
}
