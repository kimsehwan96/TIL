# 볼륨

쿠버네티스의 볼륨을 사용하면 컨테이너 외부에 데이터를 저장 할 수  있음.

근본적으로 컨테이너가 멈추면, 컨테이너에 있는 데이터는 모두 사라짐. 이것은 컨테이너 기술이 `overlay fs`, `union mount` 를 사용하기때문임. 

컨테이너는 이미지의 레이어들 + 기록 가능한 레이어가 합쳐져서 만들어진 가상 파일 시스템을 사용하게 되는데. 컨테이너 내부에 저장하는 데이터는 이 기록 가능한 레이어에 저장되고있고. 이에 따라서 컨테이너가 종료되는 경우 이 데이터는 모두 유실되게 됨. 

퍼시스턴트 볼륨을 사용하면 컨테이너가 멈추더라도 데이터가 존재 할 수 있도록 볼륨을 컨테이너에 attach 할 수 있습니다.

새로운 컨테이너가 연결되더라도 이 볼륨의 데이터를 사용해 이전의 상태를 그대로 사용 할 수 있게 됩니다. 

파드는 노드에 존재하는 로컬볼륨에 연결되어서 데이터를 저장 할 수도 있고, 노드 외부에 존재하는 클라우드 공급자가 제공하는 볼륨에 연결해서 데이터를 저장 할 수 있다. (e.g AWS EBS Storage)

쿠버네티스 클러스터 외부의 스토리즈를 볼륨 플러그인을 사용하여 사용 가능하다.

이렇게 하면 노드가 유실되더라도. EBS Storage 같은 외부의 별도 스토리지에 상태가 저장되어있기 때문에, 새로운 노드에서 컨테이너(파드)를 실행하더라도 이전 상태를 사용 할 수 있음.

## Persistent Volume (PV)

PV는 관리자가 프로비저닝하거나, Storage Class를 사용해서 프로비저닝한 클러스터의 스토리지이다. PV도 클러스터 리소스의 일종이며. PV는 파드와 별개의 라이프사이클을 가진다.

## Persistent volume Claim (PVC)

PV는 클러스터의 리소스인반면, PVC는 해당 리소스에 대한 요청이며, 리소스에 대한 클레임 검사 역할을 한다. PVC를 명시하면 쿠버네티스는 적정한 크기와 접근 모드의 PV를 찾고. PVC에 PV를 할당한다.


## PV, PVC 라이프사이클

프로비저닝 -> 바인딩 -> 사용 중 -> 반환

프로비저닝에는 정적 프로비저닝, 동적 프로비저닝이있다.

정적 프로비저닝은, 

클러스터 관리자가 스토리지 기술을 명시하여 PV를 사전에 만드는 방식이다. PVC의 Storage Class를 지정하지 않으면 정적으로 만든 PV를 사용 가능하다. 보통 온프레미스 환경에서 사용.

PV를 먼저 생성하며, 개발자는 정적으로 생성된 PV를 사용하겠다는 PVC를 생성한다.


동적 프로비저닝은 PVC에서 PV가 아닌, Storage Class를 참조하면 프로비저너가 알아서 PV를 프로비저닝 해준다. 


스테이트풀 셋에서는 volumeClaimTemplates 속성이 있는데. 이것을 통해 PV를 갖도록 지정 할 수 있음.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: hello
spec:
  replicas: 3
  serviceName: hello
  selector:
    matchLabels:
      app: hello
  template:
    metadata:
      labels:
        app: hello
    spec:
      containers:
      - name: hello-world
        image: v
        volumeMounts:
        - name: my-volume
          mountPath: /hello
  volumeClaimTemplates:
  - metadata:
      name: my-volume
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: gp3
      resources:
        requests:
          storage: 100Gi
```


ref : https://velog.io/@hoonki/%EC%BF%A0%EB%B2%84%EB%84%A4%ED%8B%B0%EC%8A%A4k8s-Persistent-Storage%EB%9E%80#:~:text=%EC%A3%BC%EC%9A%94%20%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8-,Persistent%20Volume(PV),%ED%81%B4%EB%9F%AC%EC%8A%A4%ED%84%B0%20%EB%A6%AC%EC%86%8C%EC%8A%A4%EC%9D%98%20%EC%9D%BC%EC%A2%85%EC%9D%B4%EB%8B%A4.