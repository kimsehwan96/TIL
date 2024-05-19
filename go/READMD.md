# Go

## Installation

ARM64 맥 기준

visit : https://go.dev/doc/install

install : https://go.dev/dl/go1.20.7.darwin-arm64.pkg

`$ /usr/local/go/bin/go --version`

## 모듈

코드에서 다른 모듈에 포함된 패키지를 가져오는 경우에 코드의 자체 모듈을 통해 이런 종속성을 관리하게 되고. 이 모듈은 해당 패키지를 제공하는 모듈을 추적하는 go.mod 파일로 정의됨. go.mod 파일은 소스 코드 리포지토리를 포함하여 코드와 함께 유지 됨.

go.mod 파일을 만들고 코드에 대한 종속성 추적을 사용하려면 `go mod init` 명령어를 실행. `init` 뒤에 들어올 이름에는 모듈의 모듈 경로를 의미함.

실제 개발환경에서는 일반적으로 `github.com/mymodule` 같이 일반적으로 소스코드가 저장되는 레포지토리 위치를 지정하고. 다른 사람들이 사용 할 수 있또록 모듈을 게시하려는 경우에는 모듈 경로는 Go 도구에서 모듈을 다운로드 할 수 있는 위치여야 함 !

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
}
```

위와 같이 `math/rand` 모듈을 사용했을때. Go는 관습적으로 패키지의 이름을 `import` 경로의 마지막 요소와 동일하게 사용한다. 
그래서 아래 main 함수 내부에서 `rand.Intn` 함수를 호출 할 수 있었다. 

다만 `kube "k8s.io/client-go/kubernetes"` 와 같이 앞에 `alias` 를 붙여줄 수 있는것 같다. (이건 추후에 공부해보고 확인)

### 외부 패키지 코드 호출

```go
package main

import "fmt"

import "rsc.io/quote"

func main() {
    fmt.Println(quote.Go())
}
```

위와 같이 `rsc.io/quote` 같은 외부 모듈을 import 한 이후에.

`$ go mod tidy` 를 진행하면 종속성 관리 및 모듈 다운로드를 진행함. 이후

`$ go run .` 하면 코드 정상적으로 수행 됨

### 모듈 만들기

`$ mkdir greetings`
`$ cd greetings`
`$ go mod init example.com/greetings`

형태로 모듈 생성. 

이렇게 하면

```go
module example/hello

go 1.20
```

go.mod 파일이 위와 같이 생성

```go
package greetings

import "fmt"

func Hello(name string) string {
	message := fmt.Sprintf("Hi, %v. Welcome!", name)
	return message
}
```

위와 같이 `greetings/main.go` 파일을 생성해보자. 

`Hello` 함수는 문자열 형태의 `name` 변수를 받아 문자열을 반환하는 함수이다. 

Go 에서는 이름이 대문자로 시작하는 함수를 같은 패키지에 **없는** 함수가 호출 할 수 있다. 이것을 `exported name` 이라고 부른다. 

