# DNS

DNS 는 Domain Nmae System 을 의미하며, 도메인 네임을 실제 컴퓨터의 IP 주소로 변환하는 역할을 합니다. 

예를들자면 `www.example.com` 과 같은 사람이 읽을 수 있는 이름을 `192.0.2.1`과 같은 IP 주소로 변환하며 컴퓨터가 서로 통신할 수 있도록 합니다. DNS 시스템은 도메인 네임과 IP주소간의 매핑을 관리합니다. 

## DNS 서비스 유형

### 신뢰 할 수 있는 DNS

신뢰할 수 있는 DNS 서비스는 개발자가 퍼블릭 DNS 이름을 관리하는데 사용하는 업데이트 메커니즘을 제공합니다. 애 메커니즘을 통해 DNS 시스템은 DNS 쿼리에 응답하고 도메인 이름을 IP 주소로 변환합니다. 신뢰할 수 있는 DNS 는 도메인에 대한 최종 권한이 있으며, 재귀적 DNS 서버에 IP 주소 정보가 담긴 답을 제공할 책임이 있습니다. 

### 재귀적 DNS

대개 클라이언트는 신뢰할 수 있는 DNS 서비스에 직접 쿼리를 수행하지 않습니다. 대신에 Resolver(해석기), 또는 재귀적 DNS 서비스라고 알려진 다른 유형의 DNS 서비스에 연결하는 경우가 일반적입니다. 

DNS 레코드를 소유하고 있지 않지만 사용자를 대신해서 DNS 정보를 가져올 수 있는 중간자의 역할을 합니다.

재귀적 DNS가 일정기간 캐시되거나 저장된 DNS 참조를 가지고 있는 경우, 소스 또는 IP 정보를 제공하여 DNS 쿼리에 응답을 합니다. 그렇지 않다면 해당 정보를 찾기 위해 쿼리를 하나 이상의 신뢰할 수 있는 DNS 서버에 전달합니다.

## DNS 트래픽 라우팅 프로세스

1. 사용자가 웹 브라우저를 통해 www.example.com 을 입력합니다.

2. www.example.com 에 대한 요청은 일반적으로 ISP가 관리하는 DNS 해석기로 라우팅됩니다.

3. ISP 의 DNS 해석기는 www.example.com 에 대한 요청을 DNS 루트 이름 서버에 전달합니다.

4. ISP의 DNS 해석기는 www.example.com 에 대한 요청을 .com 도메인의 TLD 이름 서버 중 하나에 다시 전달합니다. .com 도메인의 이름 서버는 example.com 도메인과 연관된 다른 네임서버를 이용하여 요청에 응답합니다.

5. ISP의 DNS 해석기는 example.com 도메인과 관련된 네임서버를 하나 선택해 www.example.com에 대한 요청을 해당 네임서버에 전달합니다.

6. example.com 과 관련된 네임서버는 example.com 호스팅 영역에서 www.example.com 레코드를 찾아서 IP 주소등 연관된 값을 받고 이 IP 주소를 DNS 해석기로 반환합니다.

7. ISP 의 DNS 해석기(Local DNS)가 마침내 사용자에게 필요한 IP 주소를 확보하게 됩니다. 해석기는 이 값을 웹브라우저로 반환합니다. DNS 해석기는 다음에 누군가가 example.com 을 탐색 할 때 좀 더 빠르게 응답 할 수 있도록 일정기간 캐싱합니다.


## DNS 레코드 종류

### A 

A 레코드는 DNS 에 저장되는 정보의 타입으로 도메인 주소와 IP 주소가 직접 매핑되는 방법입니다.

해당 도메인 주소가 가지는 IP (1:1)

AWS Route53 에서는 별칭(Alias) 라는 기능을 제공해서. A 레코드에 IP 주소가 아닌 ALB 등의 Domain 을 지정해서 트래픽을 라우팅 할 수 있다. 내부적으로 ALB 등의 IP 주소가 바뀐다고 하더라도 Route53은 이를 감지해서 DNS 쿼리에 응답합니다. 

detail : https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html

여기에 지원되는 서비스는 API Gateway, VPC, Cloudfront, ELB, Appsync, S3 bucket, 동일한 호스팅 영역에 있는 다른 Route53 레코드, Appsync 등이 있습니다. 

A 레코드는 1:1 로 설정해야하는것이 아닌, 1:n, n:1 모두 가능하다. 

### CNAME (Canonical Name Record)

CName 레코드는 도메인 주소를 다른 도메인주소로 매핑시키는 DNS 레코드 타입이다. 

CName 레코드의 장점은 IP 주소가 아닌 도메인을 바라보기 때문에, 도메인 뒤의 IP 주소가 자주 바뀐다고 하더라도 레코드를 바꿔줄 필요가 없다. 

반면, 실제 IP 주소를 얻기위해 필요한 DNS 쿼리 횟수가 더 많아서 성능저하가 일어 날 수 있다고 한다. (이 부분은 더 자세히 파악해보자)

### AAAA

A 레코드의 IPv6 버전

### MX (Mail Exchanger)

메일 서버 레코드라고하며, 해당 도메인과 연동되어있는 메일서버를 확인하는데 사용하는 레코드이다.

MX 레코드가 해당 도메인에 설정되어 있어야 해당 도메인을 이메일 주소로 사용 할 수 있다.


### NS (Name Server)

NS 레코드는 네임서버 레코드로 도메인에 대한 네임서버의 권한을 누가 관리하고 있는지 알려주는 레코드.

### PTR (Pointer)

IP 주소에 대한 도메인 주소를 확인 할 수 있는 레코드이다. A 레코드의 반대 방향의 레코드. 

IP 에 대한 질의를 도메인 네임으로 응답한다. PTR 레코드는 1개의 IP 에 1개의 도메인 네임만 가질 수 있다.

### SOA (Start of Authority)

SOA 레코드는 네임서버가 해당 도메인에 관하여 인증 데이터를 가지고 있음을 증명하는 레코드이다. 
(자세히 알아보기)

### TXT

TXT 레코드는 텍스트를 입력 할 수 있는 레코드.

### SPF (Sender Policy Framework)

### CAA

### HINFO

### ISDN



ref : https://aws.amazon.com/ko/route53/what-is-dns/