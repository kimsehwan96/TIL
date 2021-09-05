# apt

apt는 Adanvaced Packaging Tool 의 약자임.

## 새로운 릴리즈로 업데이트 하고 싶을 때?

다음과 같은 명령어를 사용한다. 

1. `apt-get -y update --allow-releaseinfo-change && apt-get upgrade -y`

혹은 

2. `sudo apt update -y && sudo apt full-upgrade -y`


## apt-get VS apt ?

둘의 차이는 크게 없다. 하지만 apt가 표준 출력에 나오는 유의미한 내용이 더 많음.

따라서 쉘 스크립트를 작성 할 때는 apt-get 을 활용하는 편이고, 개인적으로 line by line 으로 사용 할 경우 apt가 더 나을 수 있다.

개인 취향 차이다. 나는 apt-get이 편하다.


