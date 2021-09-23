# C++ 에서의 클래스

```cpp
#include <iostream>

class Date {
    int year_;
    int month_;
    int day_;

public:
    void ShowDate();

    Date() //디폴트 생성자.
        : year_(2021), month_(3), day_(21) {};
    
    Date(int year, int month, int day)
        : year_(year), month_(month), day_(day) {};
};

void Date::ShowDate() {
  std::cout << "오늘은 " << year_ << " 년 " << month_ << " 월 " << day_
            << " 일 입니다 " << std::endl;
}

int main() {
  Date day = Date();
  Date day2(2012, 10, 31);

  day.ShowDate();
  day2.ShowDate();

  return 0;
}