# CI/CD란?

Reference: https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html

지속적 통합(Continous Integration) 및 지속적 전달 혹은 배포 (Continous Delivery or Continous Deployment)를 의미한다.

CI/CD는 개발 팀이 변경된 코드, 개발된 코드를 자주, 안정적으로 전달/배포하기 위해 사용하는 일련의 운영 원칙이자 문화입니다. 

CI/CD는 DevOps 팀을 위한 모범사례이며, 애자일 방법론의 모범사례입니다. 이는 소프트웨어 개발 팀이 코드의 품질과 보안을 보장하면서 배포/전달/빌드 등의 작업보다도 비즈니스 로직과 같은 요구 사항을 개발하는데 집중 할 수 있도록 합니다.

Continous Integration 은 개발 팀이 요구사항의 구현을 위한 아주 작은 코드 변경점일지라도 그것들을 자주 버전 컨트롤 레포지토리(e.g git repo)에 그것들을 커밋하도록 하는 일련의 관행이자 코딩 철학입니다. 

Continous Delivery(Deployment)는 지속적인 통합이 완료되는 시점에서 프로덕션, 개발, 및 테스트 환경 같은 다양한 단계(stages)에서 소프트웨어를 빌드, 배포하는 자동화 된 방법입니다.

## CI/CD 파이프라인 자동화

CI/CD 툴은 소프트웨어의 전달/배포에 필요한 환경별 매개변수등을 저장하는데 도움이 됩니다. CI/CD 자동화는 웹서버나 데이터베이스등에 필요한 기타 서비스를 호출하거나(e.g aws cli or api call), 특정 서비스를 재시작 하는등의 작업을 실행 할 수 있습니다.

강력한 CI/CD 파이프라인을 갖춘 DevOps 팀은 소프트웨어의 변경점이 CI/CD 파이프라인을 통해 적용되고, 빌드 및 테스트가 완료한 경우 프로덕션 환경에 직접 배포되는 Continous Deployment(지속적 배포)구현도 가능합니다. 연속 배포는 항상 모든 도메인, 비즈니스에 최적은 아닙니다.

CI/CD 파이프라인을 구현하는 조직에는 마이크로서비스 개발, Serverless Architecture, 지속적인 테스트, IaC, 배포 컨테이너를 포함하는 다양한 모범사례가 있는 경우가 많다. 

## 지속적 통합이 협업 및 코드 품질을 개선하는 방법

지속적 통합을 실행할 때 개발자는 코드를 버전 관리 레포지토리에 자주 커밋합니다. 대부분의 팀은 최소 하루 이상 커밋을 하는등 표준이 있습니다. 큰 코드를 장기간에 걸쳐 작업 할 때 보다, 작은 코드를 자주 커밋 할 때 품질 문제나, 영향이 가는 코드등을 더 쉽게 자주 찾아 낼 수 있습니다. 게다가 작은 코드, 자주 커밋하는 환경에서는 많은 개발자들이 같은 코드를 작업 할 때 병합(merge)해야 할 가능성이 줄어듭니다. 

지속적 통합을 실행하는 개발 팀은 기능과 코드를 제어하기 위해 다양한 기술을 사용합니다.

많은 팀에서 런타임에 기능과 코드를 켜거나 끄는 매커니즘인 기능 플래그를 사용합니다. 개발중인 기능은 기능 플래그로 래핑되고 (e.g alpha feature) 프로덕션에 배포되며 사용 할 준비가 될 때 까지 해제됩니다. 최근 연구에서는 기능 플래그를 사용하는 DevOps 팀은 9배가 증가했다고 합니다.

## 자동화된 빌드

지속적 통합은 모든 유형의 소프트웨어 및 구성 요소를 패키징 할 뿐만 아니라 자동화를 통해 단위 테스트 및 다른 유형의 테스트도 실행합니다. 테스트는 개발자에게 코드 변경으로 인해 문제가 생기지 않았다는 피드백을 제공합니다. 

대부분의 CI/CD 도구를 사용하면 개발자가 필요에 따라 빌드를 시작 할 수 있으며, 버전 제어 레포지토리의 코드 커밋에 의해 트리거 되거나, 특정 브랜치(e.g master, main, dev)에 머지되거나, 아니면 정의된 일정에 따라 트리거 할 수 있습니다. 각 DevOps 팀은 팀의 규모, 일일 커밋 수, 기타 고려사항에 기반하여 가장 적합한 빌드 일정을 결정해야 합니다. 제일 좋은 것은 커밋과 빌드가 빠르게 되도록, 자주 되도록 하는것입니다.

## 지속적인 테스트 및 보안 자동화

자동화된 테스트 프레임워크는 QA 엔지니어가 개발팀이 소프트웨어 빌드의 통과 또는 실패 여부를 알 수 있도록 하는 다양한 유형의 테스트를 정의, 실행 및 자동화 하는데 도움이 됩니다. 모든 스프린트가 끝날 때 개발되고 전체 애플리케이션에 대한 회귀 테스트로 집계되는 기능 테스트가 포함됩니다. 회귀 테스트(Regression Test)는 테스트 적용 범위가 있는 프로그램의 기능 영역에서 개발된 하나 이상의 테스트에서 코드 변경이 실패했는지 여부를 팀에 알려줍니다.

## 지속적 배포 파이프라인의 단계

지속적 제공은 소프트웨어를 하나 이상의 프로덕션 환경으로 푸시하는 자동화입니다. 개발팀에는 일반적으로 전달해야하는 여러 환경이 있습니다. (개발, 운영, 스테이징 환경 등)

DevOps 엔지니어는 Jenkins, CircleCI, AWS CodeBuild, Azure DevOps, Argo CD, Travis CI 등 다양한 CI/CD 도구를 사용하여 단계를 자동화하고 리포트합니다.

예를들어 Jenkins 사용자는 빌드, 테스트 및 배포 가은 다양한 단계를 설명하는 `Jenkinsfile` 에서 파이프라인을 정의합니다. 환경 변수, 옵션, 비밀 키, 인증 및 기타 파라미터는 파일에서 선언된 단계별로 참조됩니다.

아래는 그 예시입니다.

```groovy
pipeline {
    agent any

    parameters {
        string(name: 'STAGE', defaultValue: 'dev', description: 'deploying stage')
        string(name: 'BRANCH', defaultValue: 'dev', description: 'deploying branch')
        string(name: 'REGION', defaultValue: 'ap-northeast-2')

    }

    tools {
        nodejs "node14.20"
        git "git"
    }

    stages {
        stage('build'){
            steps{
                slackSend (color: '#FFFFFF', message: "${env.JOB_NAME}[${env.BUILD_NUMBER}] 빌드 시작. 빌드 URL: ${env.BUILD_URL} ")
                script{
                        sh "yarn install"
                        sh "CI=false yarn build-dev"
                    }
                }
            }
        stage('deploy'){
            steps{

                script{
                        sh "aws s3 sync ./build s3://foo.bar.baz --delete --cache-control 'no-cache, must-revalidate' --profile ${STAGE}"
                        sh "aws cloudfront create-invalidation --distribution-id fooBarBaz --paths '/*' --profile ${STAGE}"
                    }
                }
            }
        }
    post {
        success {
            slackSend (color: '#008000', message: "${env.JOB_NAME}[${env.BUILD_NUMBER}] 빌드 성공")
        }
        failure{
            slackSend (color: '#FF0000', message: "${env.JOB_NAME}[${env.BUILD_NUMBER}] 빌드 실패")
        }
    }
}
```

일반적인 지속적 배포 파이프라인에는 빌드, 테스트 및 배포 단계가 있습니다.

- 버전 제어(e.g git)레포지토리에서 코드를 가져오고 빌드를 실행합니다.

- 자동화된 보안, 품질, 규정 준수 검사를 위한 단계를 진행합니다.

- 클라우드 인프라를 구축하거나, 해체하기 위해 코드로 자동화 된 필요한 인프라 단계를 실행합니다. (e.g `Terraform`, `Serverless Framework`)

- 코드를 컴퓨팅 환경(Jenkins 호스트 / Agent, 혹은 Container 등)으로 옮깁니다.

- 환경 변수를 관리하고 전달/배포 대상에 맞게 구성합니다. (e.g 개발 환경 배포, 프로덕션 환경 배포)

- 애플리케이션 컴포넌트를 웹 서버, API, 데이터베이스 서비스 등 적절한 서비스로 푸시합니다.

- 서비스를 다시 시작하거나 새 코드를 사용하기 위한 서비스의 엔드포인트를 호출하는 등의 단계를 거칩니다. (반영)

- 테스트가 실패할 경우 롤백 환경을 실행합니다. 

- 배포, 전달 상태에 대한 로그 및 알림을 제공합니다.

- 완료되거나 실패한 배포에 대해 Slack, Jira 등 IT 서비스 관리 워크플로우, 워크스페이스 등에 경고나 정보를 보냅니다.

지속적 배포를 사용하여 프로덕션으로 전달하는 팀은 어플리케이션의 가동 중지 시간을 최소화 하고 다양한 배포 위험을 관리하기 위해 각 버전별 트래픽을 조절하는 Canary 배포 등을 구성 할 수도 있습니다. 이러한 배포 전략에는 Blue-Green, Canary, Rolling 등이 있습니다.

## Kubernetes 및 Serverless 아키텍처를 사용한 CI/CD

클라우드 환경에서 CI/CD 파이프라인을 운영하는 많은 팀들은 Docker와 같은 컨테이너 런타임이나, Kubernetes 와 같은 컨테이너 오케스트레이션 시스템을 사용합니다. 컨테이너를 사용하면 표준화되고 이식성 높은 방식으로 애플리케이션을 패키징하고 전달 할수 있습니다. 또한 다양한 워크로드가 있는 환경을 쉽게 확장하거나 해체할 수 있습니다. 

컨테이너, 코드형 인프라(IaC) 및 CI/CD 파이프라인을 함께 사용하는 방법에는 여러가지가 있습니다. 

또 다른 옵션은 서버리스 아키텍처를 사용하여 소프트웨어를 배포하고 확장하는 것입니다. 예를들어 AWS에서 서버리스 애플리케이션은 AWS Lambda Function 으로 실행되며, 배포는 플러그인을 사용해서 Jenkins CI/CD 파이프라인에 통합 될 수 있습니다. 

예를들어 아래와 같은 serverless.yml (serverless framework 용)

```yaml
service: my-service

provider:
  name: aws
  runtime: python3.7
  stage: ${opt:stage, self:custom.defaultStage}
  stackName: ${self:service}-${self:provider.stage}
  resourcesStackName: resource-stack
  profile: your-aws-profile
  versionFunctions: true

package:
  individually: true

custom:
  defaultStage: dev
  pythonRequirements:
    dockerizePip: true

plugins:
  - serverless-python-requirements
  - serverless-aws-alias
functions:
  hello:
    module: hello
    handler: main.handler
    name: hello-lambda
```

위와 같은 serverless.yaml 파일은 hello 라는 디렉터리를 aws lambda 로 패키징하며. hello 패키지 내 main.py 코드의 handler 라는 함수를 lambda 의 handler 로 등록하는 IaC 코드입니다. 위를 배포하기 위한 jenkinsfile은 아래와 같은것입니다.

```groovy
pipeline {
    agent any

    parameters {
        string(name: 'STAGE', defaultValue: 'dev', description: 'deploying stage')
        string(name: 'BRANCH', defaultValue: 'dev', description: 'deploying branch')
        string(name: 'REGION', defaultValue: 'ap-northeast-2', description: 'deploying region')
    }

    tools {
        nodejs "node14"
        git "git"
    }

    stages {
		stage('deploy'){
            steps{
                slackSend (color: '#FFFFFF', message: "${env.JOB_NAME}[${env.BUILD_NUMBER}] 빌드 시작. 빌드 URL: ${env.BUILD_URL} ")
                script{
                    dir("deploy") {
                        sh "sls deploy --stage ${STAGE} --region ${REGION}"    
					}
				}
			}
		}
    }
    post {
        success {
            slackSend (color: '#008000', message: "${env.JOB_NAME}[${env.BUILD_NUMBER}] 빌드 성공")
        }
        failure{
            slackSend (color: '#FF0000', message: "${env.JOB_NAME}[${env.BUILD_NUMBER}] 빌드 실패")
        }
    }
}
```

단순히 serverless 명령어를 쓰는 jenkins 파일이지만, 필요에 따라 분기처리, 패키지 업데이트, 자동화된 테스트 진행 등을 추가 할 수 있습니다. 위는 간단한 에시입니다.

## 결론

지속적 통합은 소프트웨어의 변경점이 지속적으로 버전 제어 레포지토리에 커밋될 때 자동화된 테스트를 진행하거나, 빌드를 하고, 테스트에서 실패하면 개발자에게 경고하는 그러한 일련의 과정이며. 지속적인 제공은 애플리케이션, 소프트웨어, 서비스등을 지속적으로 런타임 인프라에 제공하거나, 사용자에게 배포하는 그러한 과정입니다.

CI/CD 파이프라인은 소프트웨어를 자주 개선하고, 신뢰 할 수 있는 전달 프로세스를 구축하고 싶은 기업을 위한 표준 관행입니다. 일단 배치되고 잘 동작하면 소프트웨어 팀은 통합,전달,배포가 아닌 소프트웨어 개발에 더 집중 할 수 있습니다.