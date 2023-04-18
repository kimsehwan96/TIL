# Deployments

레플리카셋은 Replication Controller 의 다음 버전임.

레플리카셋은 레플리케이션 컨트롤러와 다르게 집합성 기준의 레이블 셀렉터를 지원함

Deploymentes에는 레플리카셋이 사용됨.

Deployments object를 사용하면 애플리케이션의 상태를 정의 할 수 있음. 레플리케이션 컨트롤러나 레플리카셋보다 Deployments object가 앱을 배포하는데 더 적합함. 업데이트나, 롤백같은 부분에 있어서 더 사용하기 쉬움

## Deployments로 할 수 있는 것

Deployment 생성 (앱 배포)
Deployment 업데이트 (앱을 새 버전으로 배포)
Rolling 업데이트 (e.g 파드 1개로 된 앱을 롤링업데이트 하는 경우, 새로운 버전의 파드를 생성하고 기존 파드를 제거하면서 zero downtime 을 가능하도록 함)
