# 컨테이너

## 가상머신과 컨테이너의 차이

### 가상머신

물리 장비인 서버 위에 Host OS (Linux, etc..)가 설치되어있고. 게스트 운영체제를 관리하는데 필요한 Hypervisor 가 있습니다. 이 하이퍼바이저를 사용해서 하나의 호스트 운영체제에서 여러 게스트 운영체제를 가질 수 있습니다. 

![](https://www.docker.com/wp-content/uploads/2021/11/container-vm-whatcontainer_2.png.webp) from: https://www.docker.com/resources/what-container/

모든 게스트 OS 별 작업공간은 분리되어있으며, 자체 바이너리, 자체 라이브러리가 있고 응용 프로그램을 실행 할 수 있으며 매우 무겁습니다. 부팅하는데 시간이 꽤나 걸리기도 합니다.

가상머신은 하나의 서버를 여러 서버로 전환하는 물리적 하드웨어의 추상화입니다. 각 가상머신에는 수십 GB를 차지하는 운영 체제, 애플리케이션, 필수적인 바이너리와 라이브러리등이 필요합니다. 부팅속도도 느리고 일반적으로 수십GB 크기의 volume을 차지합니다.

### 컨테이너

물리 장비인 서버 위에 Host OS가 있고, HosT OS에 도커와 같은 컨테이너 엔진이 설치됩니다. 이 호스트 운영체제는 여러개의 컨테이너를 가질 수 있습니다.

![](https://www.docker.com/wp-content/uploads/2021/11/docker-containerized-appliction-blue-border_2.png.webp)
from : https://www.docker.com/resources/what-container/

컨테이너는 코드와 종속성을 함께 패키징하는 앱 계층의 추상화입니다. 여러 컨테이너가 동일한 시스템에서 실행 될 수 있으며 각각 사용자 공간(user space)에서 격리된 프로세스로 실행되는 다른 컨테이너와 OS kernel 을 공유 할 수 있습니다. Virtual Machine 보다 저장공간을 적게 차지합니다.

