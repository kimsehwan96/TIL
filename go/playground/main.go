package main

import "fmt"

func main() {
	i, j := 42, 2701

	p := &i        // p 변수에 i 의 포인터를 생성 (&i 는 곧 주소?)
	fmt.Println(p) // 0x14000014108 와 같이 주소값

	*p = 21        // p 가 가리키는 값을 변경
	fmt.Println(i) // 21

	p = &j         // p 변수에 j 의 포인터를 생성
	*p = *p / 37   // p 가 가리키는 값을 변경
	fmt.Println(j) // 73
}
