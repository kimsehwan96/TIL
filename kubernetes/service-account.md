# 서비스 어카운트

쿠버네티스 클러스터에 접근은 어떻게 하는건가 ?!

`kubectl` 은 자신이 접근할 수 있는 클러스터 환경 정보를 `$HOME/.kube/config` 파일이나 `KUBECONFIG` 환경변수에 지정된 설정 파일을 참고한다. 

이 kubeconfig 는 크게 3가지 부분으로 구성된다.

- clusters: 쿠버네티스 API 서버 정보(IP 또는 도메인).
- users: 쿠버네티스 API에 접속하기위한 사용자 목록
- context: clusters 항목과 users 중에 하나씩 조합해서 만들어진다. 

여기서 사용 가능한 인증 방법은 `X.509`, 파일 기반 토큰 목록, 파일 기반 비밀번호 목록, `OIDC`토큰, 웹 훅 토큰, 프록시, 서비스 어카운트 토큰 방식이 있다.

`X.509` 방식은 쿠버네티스를 생성 할 때 자동으로 생성되는데, BASE64로 인코딩되어있고 이 인증서는 마스터노드의 `/etc/kubernetes/pki` 디렉터리 내 `ca.crt`를 루트인증서로 하여 만들어진 하위 인증서 중 하나이다. 

이게 생성 될 때 `User`와 `Group`이 지정되는데, 이 때 그룹명으로 지정된 `system:masters` 라는 값이 실제 쿠버네티스에 존재하는 `cluster-admin` 이라는 ClusterRole 과 연결되어 관리자 권한을 갖게 되는 것. 

## 서비스 어카운트

서비스어카운트 오브젝트는 네임스페이스마다 각각 정의 가능하고, 각 네임스페이스별로 `default` 서비스 어카운트가 자동으로 생성된다.

서비스 어카운트를 만들면 JWT 토큰이 자동으로 생성되면서 쿠버네티스 시크릿 오브젝트에 저장된다. 이 토큰은 쿠버네티스 API 인증에 사용 가능하다. 

서비스 어카운트도 User 개념에 포함되며 `system:serviceaccount:<namespace>:<serviceAccountName>` 로 지칭 할 수 있다.

## RBAC

쿠버네티스는 RBAC (Role Based Access Control) 을 지원한다. 

- Role : 특정 네임스페이스에 속하는 오브젝트에 대한 권한을 정의
- ClusterRole : 클러스터 전체 모든 네임스페이스에 대한 권한을 정의

Role 매니페스트파일에는 `rules` 항목에 `apiGorups` , `resources` , `verbs`를 통해 어떤 리소스에 어떤 동작을 허용할지 지정한다. 

