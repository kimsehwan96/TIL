# 레플리케이션 컨트롤러 (Pod scaling)

애플리케이션이 stateless 인 경우 수평적으로 확장 가능 (scaling)

수평적 확장은 scale-out을 의미. 여러 Pod를 여러 노드에 추가로 배치하는 것

stateless 앱은 로컬에 데이터를 저장 할 수 없음. (정확히는 file system에 임시 
저장 가능하나 재시작되는 경우 데이터가 날아감)

MySQL, PostgreSQL, MongoDB와 같이 DB 서비스나, 아니면 데이터나 상태를 저장해야 하는 앱은 stateful 앱이라고 하며. k8s에서 statefulset 으로 관리해야 함. 

stateful 앱은 보통 수직적 확장 (scale up)을 하는 편 -> 해당 파드에 할당된 vCPU, memeory 확장

쿠버네티스의 확장은 Replication Controller를 이용해 가능함. 

Replication Controller는 지정된 수의 파드 복제본이 항상 실행되도록 함

## 레플리케이션 컨트롤러와 레플리카셋, 혹은 디플로이먼트와의 차이

Replica set 의 기본 목적은 Replication controller와 동일하지만. replica set은 label selctor의 집합성 기준 을 지원한다. (Replication contoller는 일치성 기준만 지원)

집합성 기준의 레이블 셀렉터는 키, 값이 모두 일치하거나, 키만 일치하는것도 지원합니다.

```yaml
spec:
    selector:
        matchLabels:
            key: value
```

위는 일치성 기준을 의미하며. Replicat set 및 Replication Controller 모두 지원하는 기능

```yaml
spec:
    selector:
        matchExpressions:
        - key: some_key
          operator: <In | NotIn | Exists | DoesNotExist>
          values:
          - <string>
```

위는 집합성 기준을 의미하며, Replica Set 에서 지원함


### Replication Controller

```yaml
apiVersion: v1
kind: ReplicationContoller
metadata:
  name: <string>
spec:
  replicas: 2
    selector:
      app: <string>
    template:
      metadata:
        labels:
          app: <string>
      spec:
        containers:
        - name: <string>
          image: <string>
```


            