# 젠킨스에서 git clone 할때 github token 사용하기

2021년 8월 github private repo 클론 등 github operation 과정에서 보안의 이유로 github username / password 인증 방식을 막았다.

## 해결 방법

1. Jenkins Credential Manager에 github token을 secret text로 추가한다. 
    - token 권한은 repo read 정도면 충분

2. jenkins 의  credential plugin을 활용한 groovy script 작성

```groovy

pipeline {
    agent any
    tools {
        git "git"
    }
    environment {
        TOKEN = credentials('GITHUB_PAT') // name of your jenkins secrete text. 
    }
    stages {
        stage('prepare'){
            steps{
                script{
                    dir('resources') {                    
                            git branch: "${BRANCH}", url: "https://USERNAME:"+"${TOKEN}"+"@github.com/USERNAME/YOURREPO.git"
                    }
                }
            }
        }
```