# BPF Map

BPF 맵 

eBPF 맵은 eBPF프로그램 / 유저 스페이스에서 액세스 할 수 있는 데이터 구조. 
맵은 여러 eBPF 프로그램간 데이터를 공유하거나, 유저 스페이스 애플리케이션과 커널에서 실행중인 eBPF 프로그램간의 통신 하는데도 사용 가능한데, 일반적인 용도는 아래와 같다.

- 유저 스페이스에서 작성한 구성 정보를 eBPF 프로그램에서 검색 할 수 있다.
- 나중에 다른 eBPF 프로그램(혹은 동일한 프로그램을 나중에 실행 할 때) 검색 할 수 있도록 상태를 저장한다.
- eBPF 프로그램에서 만든 결과나 메트릭을 map 에 저장하고, 유저스페이스 앱이 그 결과를 사용 할 수 있다.

다양한 형태의 BPF맵은 Linux 의 uapi/linux/bpf.h 파일에 정의되어있다.

내가 테스트중인 Ubuntu 22.04 LTS 환경에서는 커널 버전이 `5.15.0-91` 이라서

```text
root@dev:/usr/src/linux-headers-5.15.0-91/include/uapi/linux# uname -a
Linux dev 5.15.0-91-generic #101-Ubuntu SMP Tue Nov 14 13:29:11 UTC 2023 aarch64 aarch64 aarch64 GNU/Linux

/usr/src/linux-headers-5.15.0-91/include/uapi/linux/bpf.h 에 정의되어있음. 
```

`$ locate {header_name}` 형태로 위치 조회 가능하니 참고!

```c
enum bpf_map_type {
	BPF_MAP_TYPE_UNSPEC,
	BPF_MAP_TYPE_HASH,
	BPF_MAP_TYPE_ARRAY,
	BPF_MAP_TYPE_PROG_ARRAY,
	BPF_MAP_TYPE_PERF_EVENT_ARRAY,
	BPF_MAP_TYPE_PERCPU_HASH,
	BPF_MAP_TYPE_PERCPU_ARRAY,
	BPF_MAP_TYPE_STACK_TRACE,
	BPF_MAP_TYPE_CGROUP_ARRAY,
	BPF_MAP_TYPE_LRU_HASH,
	BPF_MAP_TYPE_LRU_PERCPU_HASH,
	BPF_MAP_TYPE_LPM_TRIE,
	BPF_MAP_TYPE_ARRAY_OF_MAPS,
	BPF_MAP_TYPE_HASH_OF_MAPS,
	BPF_MAP_TYPE_DEVMAP,
	BPF_MAP_TYPE_SOCKMAP,
	BPF_MAP_TYPE_CPUMAP,
	BPF_MAP_TYPE_XSKMAP,
	BPF_MAP_TYPE_SOCKHASH,
	BPF_MAP_TYPE_CGROUP_STORAGE,
	BPF_MAP_TYPE_REUSEPORT_SOCKARRAY,
	BPF_MAP_TYPE_PERCPU_CGROUP_STORAGE,
	BPF_MAP_TYPE_QUEUE,
	BPF_MAP_TYPE_STACK,
	BPF_MAP_TYPE_SK_STORAGE,
	BPF_MAP_TYPE_DEVMAP_HASH,
	BPF_MAP_TYPE_STRUCT_OPS,
	BPF_MAP_TYPE_RINGBUF,
	BPF_MAP_TYPE_INODE_STORAGE,
	BPF_MAP_TYPE_TASK_STORAGE,
};
```

일반적으로 이런 맵들은 모두 Key-Value 저장소다.
일부 맵은 항상 4바이트 인덱스가 키로 사용되는 배열로 정의되고, 다른 맵은 임의의 데이터 유형을 키로 사용할 수 있는 해시 테이블이다.
(해시테이블은 파이썬에서 딕셔너리와 비슷한것이라고 보면 된다.)

이 BPF 맵들에는 특정 동작에서의 성능을 최적화하기위한 유형들이 있는데, FIFO 큐, FILO 스택, LRU 데이터 저장소, 
longest-prefix matcing, 블룸필터 등도 있다.

sockmaps, devmaps 의 경우 소켓과 네트워크 장치에 대한 정보를 들고있고, 이것들은 네트워크 관련 eBPF 프로그램에서
트래픽을 리다이렉션 하는데 사용된다.

또한 `BPF_MAP_TYPE_PROG_ARRAY`는 인덱싱된 eBPF 프로그램의 집합을 저장하고, 이것은 한 프로그램이 다른 프로그램을 호출 할 수 있는
tail call 을 구현하는데 사용된다. 또한 `BPF_MAP_TYPE_HASH_OF_MAPS`, `BPF_MAP_TYPE_ARRAY_OF_MAPS` 와 같이 맵에 대한 정보 저장을 지원하는 유형도 있다.

또한 일부 유형에는 `BPF_MAP_TYPE_PERCPU_HASH` 와 같이 `per CPU` 라는 이름을 들고 있는데. 각 CPU 코어 버전별로
다른 메모리 블록을 사용한다는 의미입니다. 여러 CPU 코어가 동일한 맵에 동시에 액세스 할 수 있는 `per CPU`가 아닌 맵 유형에서는 동시성 문제가 발생 할 수 있다.

