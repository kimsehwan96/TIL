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
