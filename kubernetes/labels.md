# Labels

레이블은 객체에 연결 할 수 있는 키 값 쌍

리소스에 태그를 지정하는데 AWS의 tag 와 비슷한 기능이라고 보면 됨.

환경, 스테이지 (e.g dev / staging, prod, op)등을 파드에 지정하거나, 
어떤 부서의 Pod 인지 (e.g engineering, finance, marketing)
등으로 이용 가능하다. 

이 레이블은 특정 오브젝트의 명세에서 레이블 셀렉터등으로 지정해서 해당 오브젝트를 필터링하거나 지정하는데 사용된다. 

레이블은 고유하지 않고 여러 레이블이 하나의 객체에 연결 될 수 있다.

예를들어 특정 노드에만 특정 파드가 생성되게 하고 싶으면 노드에 tag를 (label)을 생성하고, pod의 nodeSelector를 추가한다.

위에 대한 예시

`$ kubectl label nodes node1 hardware=high-spec`
`$ kubectl label nodes node2 hardware=low-spec`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: helloworld.node
  labels:
    app: helloworld
  spec:
    containers:
    - name: demo
      image: <string>
      ports:
      - containerPort:3000
    nodeSelector:
      hardware: high-spec
```

위와 같이 Pod 명세를 작성하고 배포하면 `hardware: high-spec` 레이블이 있는 노드에만 파드가 생성됩니다.