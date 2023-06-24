# Composite Key

Composite Key 는 하나 이상의 필드를 deliminator 를 이요앟여 구분 지어 사용하는 방법.

NoSQL 은 보통 N 개의 서버로 구성된 클러스터로 동작하고, 데이터는 Key 를 기준으로 나눠 저장되기 때문에, 데이터를 적절한 파티션에 분산저장하기 위해서 사용하기도 하고 

해당 키의 deliminator 로 구분된 어떤 순서를 기반으로 정렬 쿼리도 가능 할 수 있음.

AWS DynamoDB 를 예를 들어보면 ,

복합 정렬 키 (Composite Sort key) 는 계층 구조의 어느 수준에서 쿼리를 할 수 있도록 데이터의 계층(일대 다)관계를 정의 할 수있도록 도와주는데, 아래와 같은 예시를 공식 홈페이지에서 설명하고 있음. 

`[country]#[region]#[state]#[county]#[city]#[neighborhood]`

정렬키는 `begins_with` , `between` , `>`, `<` 등의 연산자를 사용하는 범위 쿼리를 사용 가능하기 때문에 어떤 계층에서 데이터를 범위 쿼리 할것인지 지정해서 사용 가능함.

