# DNS
(AWS EKS 환경 기준으로 작성)
service 오브젝트는 기본적으로 `serviceName.namespace.svc.cluster.local` 과 같은 DNS로 다른 파드, 다른 서비스에서 접근이 가능하다. 어떻게 가능한걸까?


`$ kubectl run -i --tty busybox --image=busybox --restrart=Never -- sh` 을 통해 아무 노드에서 busybox 파드를 임시로 띄우고 쉘을 접근해보자.

여기서 `$ cat /etc/resolve.conf` 를 조회해보면 

```
search default.svc.cluster.local svc.cluster.local cluster.local ap-northeast-2.compute.internal
nameserver 172.20.0.10
options ndots:5
```

여기서 nameserver 172.20.0.10 이 나왔다. 

현재 나의 테스트 환경에서 service 오브젝트들은 `172.20.0.0/16` 대역에서 생기고 있고. 그 중 `kube-dns` 라는 서비스가 `172.20.0.10`으로 떠있다. 

```
$ kubectl get service -n kube-system                                           5s 00:00:44
NAME             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                        AGE
kube-dns         ClusterIP   172.20.0.10      <none>        53/UDP,53/TCP                  199d
```

위 서비스를 describe 해보면

```
kubectl describe svc kube-dns -n kube-system                                    00:04:15
Name:              kube-dns
Namespace:         kube-system
Labels:            eks.amazonaws.com/component=kube-dns
                   k8s-app=kube-dns
                   kubernetes.io/cluster-service=true
                   kubernetes.io/name=CoreDNS
Annotations:       prometheus.io/port: 9153
                   prometheus.io/scrape: true
Selector:          k8s-app=kube-dns
Type:              ClusterIP
IP Family Policy:  SingleStack
IP Families:       IPv4
IP:                172.20.0.10
IPs:               172.20.0.10
Port:              dns  53/UDP
TargetPort:        53/UDP
Endpoints:         10.0.4.242:53,10.0.5.121:53
Port:              dns-tcp  53/TCP
TargetPort:        53/TCP
Endpoints:         10.0.4.242:53,10.0.5.121:53
```

10.0.4.242, 10.0.5.121이 나온다. 어떤 파드인지 찾아보니,,,

```
coredns-67fd69fcfd-24tct              1/1     Running     0          13d     10.0.5.121

coredns-67fd69fcfd-jdlhr              1/1     Running     0          13d     10.0.4.242
```

coredns였다.

kube-dns 서비스 객체와 연결된 coredns 파드가 실제로 {serviceName}.{namespace}.svc.cluster.local 을 service 객체의 ip address로 resolve 해주는 역할을 하는것이다. 