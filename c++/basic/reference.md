# C++에서의 참조자

- C언어에서 특정 변수의 값을 바꾸는 함수를 만드려면, 해당 변수의 주소값을 변수로 받아 (함수의 인자는 포인터 변수로 선언)
- 해당 주소에 저장된 변수의 값을 바꾸는 아래와 같은 코드를 짰어야 했을 것.

```cpp
#include <iostream>

int change_val(int *val)
{
    *val = 10;

    return 0;
}

int main()
{
    int a = 5;
    std::cout << a << std::endl;
    change_val(&a);
    std::cout << a << std::endl;

    return 0;
}
```

## C++은?

- 레퍼런스(참조자)를 제공함으로, 위와 같이 코드를 작성하지 않아도 된다.
- 아래와 같이 코드를 작성하면 끝
- 어떤 변수를 가르킬때, 참조자를 정의하여서 참조자를 조작하면 된다는 것.

```cpp
#include <iostream>



int main()
{
    int a = 5;
    int &b = a;
    std::cout << a << std::endl;
    b = 10;
    std::cout << a << std::endl;

    return 0;
}
```

- 위 코드에서, b에 어떠한 조작이나 작업을 하는 경우, a에 조작을 하는 것과 완전 동일하다.

- 주의점
    - 레퍼런스 정의시, 어떤 변수에 대한 레퍼런스인지 바로 정의해주어야 함

- 레퍼런스를 사용해서 맨 위쪽 코드를 다시 짜보면

```cpp
#include <iostream>

int change_val(int &val)
{
    val = 10;

    return 0;
}

int main()
{
    int a = 5;
    std::cout << a << std::endl;
    change_val(a); //여기서, val 이라는 레퍼런스는 a가 된다.
    std::cout << a << std::endl;

    return 0;
}
```


