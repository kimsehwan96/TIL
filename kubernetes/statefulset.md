# 스테이트풀셋

스테이트풀셋은 디플로이먼트와 유사하지만, 각 파드의 독자성을 유지하는 특징이 있습니다. 이 파드들은 동일한 스펙을 사용해 생성되었지만 서로 대체/교체는 불가능합니다. 각각은 재 스케쥴링 하더라도 지속적으로 유지됩니다. 

스테이트풀셋은 아래와 같은 케이스에서 유용합니다.

안정돠고 고유한 네트워크 식별자
안정되고 지속성을 갖는 스토리지
순차적인, 정상 배포와 스케일링
순차적인, 자동 롤링 업데이트

스테이풀셋을 삭제하거나, replicas 숫자를 낮추는(스케일 다운) 작업을 하더라도, 스테이트풀셋과 연결된 볼륨은 삭제되지 않습니다. 

스테이트풀 셋의 특징으로는

Ordinal index 이름으로 파드가 생성되며 (e.g Pod-0, Pod-1, Pod-2)

0,1,2 등 순차적으로 생성되고, 파드가 재생성될 때에도 이름이 유지됩니다. 

볼륨은 volumeClaimTemplates 를 통해 동적으로 생성하게 되고, 파드의 수를 늘리면 별도의 PV가 생성되고 연결됩니다. 

만약 PVC 와 연결된 특정 파드가 죽는경우, 죽은 파드와 동일 파드를 생성하고 기존 PVC와 연결합니다. 


스테이트풀셋은 각 Pod 의 역할이 다르기 때문에 (이게 왜 그런지 다시 공부해보기) 외부에서 Deployment 처럼 서비스를 통해 들어오는 경우 로드밸런싱 되어 랜덤한 파드가 선택되는것이 아니라, 특정 파드와 직접 통신해야 하는 경우가 많음. 

따라서 Headless 서비스를 사용하는데. `spec.clusterIP`를 None 으로 지정하면 되고. 아래와 같은 고정된 DNS 를 통해 접근 가능

`[pod-name].[svc].[namespace].svc.cluster.local`

물론, 위 도메인네임과 별도로, `[pod-ip-address].[namespace].pod.cluster.local` 로도 접근은 가능하지만. 모두가 알다시피  Pod IP 는 고정되고 절대적인것이 아니므로 사용하기 어렵다. 