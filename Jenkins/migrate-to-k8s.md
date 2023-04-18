# Jenkins 를 K8s 환경으로 옮기기

## 설치

Jenkins 설치는 helmChart를 이용해서 설치하였습니다. 이 때 설치는 `helm` cli를 사용하는것이 아닌, `kustomize`를 이용하는것으로 결정하였습니다. (회사 정책..)

`kustomize`로 `helmChart` 설치하는것은 어렵지 않고 아래와 같이 `yaml` 파일을 만들어 주면 됩니다.

```yaml
namespace: foo

resources:
  - ./jenkins-namespace.yaml
  - ./jenkins-pvc.yaml
  - ./service-account.yaml
  - ./jenkins-gateway.yaml
  - ./docker-registry.yaml
  - ./jenkins-secret.yaml
  - ./jenkins-jobs.yaml
  - ./aws-secret.yaml

helmCharts:
  - name: jenkins
    includeCRDs: true
    repo: https://charts.jenkins.io
    releaseName: jenkins
    namespace: jenkins
    version: 4.3.5
    valuesInline:
      controller:
        resources:
          requests:
            cpu: 100m
            memory: 8192Mi
          limits:
            cpu: 2000m
            memory: 16384Mi
```

더 내용이 길지만 그것은 아래에 더 적도록 하고. 위와 같이 `kustomization.yaml` 파일 내에 `helmCharts` 를 생성하고 `name`, `repo`, `releaseName`, `namespace`, `version`, `valuesInline` 혹은 `valuesInFile` 등을 설정하면 됩니다.

ref : https://cloud.google.com/anthos-config-management/docs/how-to/use-repo-kustomize-helm?hl=ko#helm_chart_fields

## 제약사항(?), 구현해야 했던 것들

우선 기존 CI/CD 파이프라인을 이전하기 위해서 jenkins 내에서 docker가 접근이 가능했어야 합니다. 
docker를 쓰는 파이프라인이 있었는데. 좀 자세히 설명하자면

`serverless` 프레임워크라고 terraform과 비슷한 IaC 프레임워크(AWS를 많이 타게팅 한)를 통해 python 런타임을 쓰는 AWS Lambda를 빌드/배포하는 파이프라인이 있어서 `serverless-python-requirements`라는 플러그인을 사용했는데, 여기서 docker를 이용해서 코드를 lambda 환경과 동일한 컨테이너 영역에 넣고 `pip install -r requirements.txt` 를 진행하고 `zip`파일을 만들어 AWS S3에 업로드 & AWS Lambda 생성(업데이트) 하는 부분이 있었습니다. 

여기서 docker를 사용하기때문에 jenkins 또한 docker에 접근이 가능했어야 했고. 현재 EKS 환경에 container runtime으로 containerd 를 사용중이라서 골머리를 앓던 중.

jenkins에 docker in docker / docker out of docker 중 하나의 접근법을 취해 jenkins가 docker를 사용가능하도록 했어야 했고. 이 때 docker out of docker는 jenkins 파드가 위치한 노드머신의 docker socket을 공유해서 쓴다는 개념이였는데. eks 환경상 불가능한 부분이 있어서 docker in docker로 jenkins Pod 내에 docker를 띄우는 docker in docker 로 결정하게 되었습니다. 

이와 더불어 모든 파드들이 그렇곘지만, jenkins 파드는 Pod / Container 수준에서 securityContext를 이용해 실행할 UID/GID를 루트가 아닌 유저로 (1000/1000) 실행하도록 권장되었습니다. 

-> 왜 그런지 생각해보면. jenkins 자체가 다양한 명령어나 CLI, API Call을 하는데 root로 실행되면 엄청난 취약점이자 털릴경우 Node 자체가 위험해지니 그렇겠다는 합리적인 추론이 가능했습니다.

아무튼, 그렇기 때문에 docker 또한 root로 동작하는게 아닌 rootless docker를 사용하기로 하고. 

jenkins 파드 내에 `jenkins`와 `docker-rootless`를 사용하기 위해 아래와 같이 yaml 파일을 셋업했습니다.

```yaml
helmCharts:
  - name: jenkins
    includeCRDs: true
    repo: https://charts.jenkins.io
    releaseName: jenkins
    namespace: jenkins
    version: 4.3.5
    valuesInline:
      controller:
        resources:
          requests:
            cpu: 100m
            memory: 8192Mi
          limits:
            cpu: 2000m
            memory: 16384Mi
...
...
        sidecars:
          configAutoReload:
            enabled: true
          other:
            - name: dind
              image: docker:dind-rootless
              imagePullPolicy: IfNotPresent
              command: [dockerd-entrypoint.sh]
              securityContext:
                privileged: true
              env:
                - name: DOCKER_TLS_CERTDIR
                  value: '/certs'
                - name: DOCKER_HOST
                  value: 'unix:///run/user/1000/docker.sock'
              volumeMounts:
                - name: docker-rootless
                  mountPath: /run/user/1000
                - name: jenkins-home
                  mountPath: /var/jenkins_home
        runsAsUser: 1000
        fsGroup: 1000
        podSecurityContextOverride:
          runAsUser: 1000
          fsGroup: 1000
          runAsNonRoot: true
          supplementalGroups: [1000, 100999]
        containerSecurityContext:
          runAsUser: 1000
          runAsGroup: 1000
          runAsNonRoot: true
          readOnlyRootFilesystem: true
          allowPrivilegeEscalation: false
      persistence:
        enabled: true
        existingClaim: jenkins-pv-claim
        volumes:
          - name: docker-rootless
            emptyDir: {}
          - name: jenkins-home
            emptyDir: {}
          - name: jenkins-jobs
            configMap:
              name: jenkins-jobs
...
        mounts:
          - name: docker-rootless
            mountPath: /run/user/1000
          - name: jenkins-jobs
            mountPath: /var/jenkins_home/casc_configs/jobs.yaml
            subPath: jobs.yaml
...
      serviceAccount:
        create: false
        name: jenkins
```

jenkins 내에 sidecar로 docker-rootless를 실행하고. docker socket을 volume에 마운트해서 jenkins 애플리케이션 컨테이너의 docker cli 가 docker-rootless 컨테이너 내에 존재하는 docker daemon이 사용하는 docker socket을 사용하도록 해서 jenkins 내에서 docker를 실행 가능하도록 했습니다. 

이렇게 한다고 되는건 아니고. jenkins 애플리케이션 컨테이너가 docker cli를 쓸 수 있도록 해야해서 jenkins 를 자체적으로 아래 dockerfile 로 다시 빌드했습니다.

```dockerfile
FROM jenkins/jenkins:lts

USER root
RUN apt update -y && \
    apt install -y python3-pip apt-transport-https \
    ca-certificates curl gnupg2 software-properties-common \
    chromium uuid-runtime

# Installing dev dependencies for chromium
RUN apt install -y fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 \
    libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 \
    libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
    libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
    libxss1 libxtst6 lsb-release wget xdg-utils

# For installing awscli
RUN pip3 install awscli yamlpath --upgrade 

# Installing docker client
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/debian \
    $(lsb_release -cs) \
    stable"

RUN apt update -y && \
    apt install -y docker-ce

# Setup Docker client to connect to Docker daemon running on host
# This docker daemon is from docker-in-docker-with-rootless image
ENV DOCKER_HOST=unix:///run/user/1000/docker.sock

RUN usermod -aG docker jenkins
RUN apt autoremove -y && \
    apt autoclean -y && \
    apt clean -y && \
    rm -rf /var/lib/apt/lists/*

USER jenkins
```

현재 실무에 사용중인 dockerfile이라 조금 난잡한데, chromium 같은경우는 front end 앱 빌드시 사용해야하는 것이 있어서 추가가 되었고. 실제로 docker cli 만 jenkins 에 설치해서 빌드하고 싶으면 아래같이 만들면 됩니다.

```dockerfile
FROM jenkins/jenkins:lts

USER root

# Installing docker client
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/debian \
    $(lsb_release -cs) \
    stable"

RUN apt update -y && \
    apt install -y docker-ce

# Setup Docker client to connect to Docker daemon running on host
# This docker daemon is from docker-in-docker-with-rootless image
ENV DOCKER_HOST=unix:///run/user/1000/docker.sock

RUN usermod -aG docker jenkins
RUN apt autoremove -y && \
    apt autoclean -y && \
    apt clean -y && \
    rm -rf /var/lib/apt/lists/*

USER jenkins
```

위 이미지를 빌드해서 `helmChart.valuesInline.controller.image: "yourRepo/jenkins"`, `helmChart.valuesInline.controller.tag: "yourTag"` 형태로 커스텀 이미지를 땡겨와서 사용하면 됩니다. 

docker-rootless 도 uid/gid를 1000/1000 으로 사용하고, jenkins 도 마찬가지기 때문에 둘이 그룹명이나 유저명은 다르지만 권한 문제 없이 잘 돌아갑니다. 

그 외에도 jenkins 설정을 code 기반으로 하는 JCasc (Jenkins Configuration as code) 부분이나, `serverless-python-requirements`를 쓰면서 발생했던 권한 이슈는 따로 작성하는것으로..