# C++ template

## 템플릿이란

- 인자로 타입(형, 클래스)를 받아서, 해당하는 형에 맞는 코드를 찍어내는 방법

- STL의 벡터 등이 이에 포함됨

```cpp
#include <iostream>
#include <string>

template <typename T> // <class T> 도 가능함.

class Vector{
    T* data; // 타입(형) 을 인자로서 받는다. 해당하는 형에 따른 인스턴스 변수 & 포인터 변수 data 
    int capacity;
    int length;

public:
    Vector(int n = 1)
        : data(new T[n]), capacity(n), length(0) {};
        // 해당하는 타입에 맞는 메모리 공간 동적 할당.

    void push_back(T s){
        if (capacity <= length)
        {
            T* temp = new T[capacity * 2];
            for (int i = 0; i < length; i++)
            {
                temp[i] = data[i];
            }
            delete[] data;
            data =  temp;
            capacity *= 2;
        }

        data[length] = s;
        length++;
    }

    T operator[](int i) { return data[i]; } //포인터 연산자 구현(오버로딩 ?!)

    void remove(int x){
        for (int i = x + 1; i < length; i ++)
        {
            data[i - 1] = data[i];
        }
        length--;
    }

    int size() { return length; }

    ~Vector(){ //소멸자 구현
        if (data)
        {
            delete[] data; //동적 할당된 메모리 공간 제거 (heap 영역)
            // cpp의 경우 따로 garbage collector가 없으므로, 사용자가 동적 할당한 공간을 직접 제거해 주어야 함
        }
    }
};


int main() {
    Vector<int> int_vec;

    int_vec.push_back(3);
    int_vec.push_back(2);

    std::cout << int_vec[0] << std::endl;
    std::cout << int_vec[1] << std::endl;

    Vector<std::string> str_vec;
    str_vec.push_back("hello");
    str_vec.push_back("world");

    std::cout << str_vec[0] << std::endl;
    std::cout << str_vec[1] << std::endl;

    return 0;
}
```