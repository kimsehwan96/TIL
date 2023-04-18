# Health checks

어플리케이션에서 발생하는 문제를 감지하고나 해결하기 위해서 health checks를 수행 할 수 있다.

3가지 타입의 health check probe가 있는데.

1. 컨테이너 내부에 특정 명령어를 주기적으로 실행하는 방법
2. 주기적으로 컨테이너에 접근 가능한 URL (HTTP)를 체크하는 방법
3. 2번을 TCP로
4. 2번을 gRPC로 

로드밸런서 뒤에서 프로덕션 운영중인 애플리케이션들은 대부분 health check를 가용성과 복원력을 보장하기위해 어떻게든 구현해놓아야 합니다.

여기에는 `livenessProbe`와 `readiness`가 있다.

`livenessProbe`는 컨테이너가 재시작 되어야 할 때를 알기 위해서 사용하는 프로브이며, 애플리케이션이 가동중인 상태에서 교착상태에 빠져 더 이상 아무런 작업을 할 수 없을 때에 컨테이너를 재시작되도록 할 수 있습니다.

일반적인 패턴에서 `readiness` 와 `livenessProbe`는 같은 저비용의 HTTP 엔드포인트를 사용하는데 보통 `livenessProbe` 에서는 `readinessProbe` 보다 더 높은 `failureThreshold`를 사용하는 패턴을 보입니다. 즉 `readinessProbe` 를 사용해 컨테이너를 관찰하면서, 실패하는 횟수가 특정 값을 넘어갈 경우 `livenessProbe` 의 실패로 인지하여 컨테이너를 재실행 하는 등의 패턴이 보편적입니다. 

`readinessProbe`는 컨테이너가 트래픽을 받아들일 준비가 된 시점을 파악하는데 사용됩니다. 만약 준비가 되어있지 않다면 service object의 로드밸런서에서 제거가 되어 트래픽을 받지 못합니다.

`livenessProbe`는 오류를 복구하는 강력한 방법 일 수 있지만 주의해서 사용해야합니다.

## Command 기반의 liveness

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-exec
spec:
  containers:
  - name: liveness
    image: registry.k8s.io/busybox
    args:
    - /bin/sh
    - -c
    - touch /tmp/healthy; sleep 30; rm -f /tmp/healthy; sleep 600
    livenessProbe:
      exec:
        command:
        - cat
        - /tmp/healthy
      initialDelaySeconds: 5
      periodSeconds: 5
```

command 영역의 명령어의 리턴이 0이 아닌경우 실패로 간주하게 됩니다. 위 예시에서는 컨테이너 시작 후 5초의 지연시간 이후에 `$ cat /tmp/healthy`를 수행하고. 0 가 리턴되면 정상으로, non-zero 가 리턴되면 비정상으로 간주합니다. 

위 예제에서는 처음 30초간은 `$ cat /tmp/healthy` 명령어가 0을 리턴하고, 30초 후에는 non-zero를 리턴하게 됩니다. 따라서 `livenessProbe`의 실패로 인해 컨테이너가 재실행 됩니다. 

`Container liveness failed liveness probe, will be restarted`

## HTTP 기반의 liveness

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-http
spec:
  containers:
  - name: liveness
    image: registry.k8s.io/liveness
    args:
    - /server
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
        httpHeaders:
        - name: Custom-Header
          value: Awesome
      initialDelaySeconds: 3
      periodSeconds: 3
```

위 예제에서는 최초 3초 이후에 3초마다 `livenessProbe`를 수행합니다. 8080포트에서 수신중인 서버의 `/healthz` 경로로 HTTP GET 요청을 보내며, 200보다 크거나 같고, 400보다 작은 코드는 성공으로 간주합니다.

그 외 TCP, gRPC 등으로도 위 내용을 수행 가능합니다.

https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
