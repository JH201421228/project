# 1. 빌드 배포 정리

## 목차

1. [기술 스택](#기술-스택)
2. [빌드 및 배포](#빌드-및-배포)


## 기술 스택

1. 이슈 관리 : Jira
2. 형상 관리 : Gitlab
3. 빌드/배포 관리 : Jenkins `2.426.3`
4. 커뮤니케이션 : MatterMost, Notion, Discord
5. 개발 환경
    1) 운영체제 Window10
    2) IDE 
         - VSCode `1.85.1`
         - InteliJ `2023.3.2`
    3) 데이터베이스 : MySQL `8.0.36`
    4) 서버 : AWS EC2
         - Ubuntu `20.04 LTS`
         - Docker `25.0.0`
         - docker-compose `2.24.2`
         - Openvidu `2.29.0`
         - Nginx `1.18.0(ubuntu)`
         - Https/SSL `Let's Encrypt`        
6. 세부사항
    1) Frontend
        - lang: HTML5, CSS3, JAVASCRIPT, Node.js `16.16.0` 
        - Framework: 
            * React: `18.2.0`
            * React Redux: `9.1.0`
            * React Router DOM: `6.21.3`
        - 주요 Libraries
            * axios: `1.6.7`
            * bootstrap: `5.3.2`
            * howler `2.2.4`
            * firebase `10.8.0`
        - 개발 도구
            * Vite: `5.0.8`
            * ESLint: `8.56.0`
            * Prettier `3.2.4`

    2) Backend
        - Language: Java 17
        - Framework:
            *  Spring Boot: 3.2.1
            *  Spring Security: 3.2.1
            *  Spring Data JPA
        - 주요 Libraries:
            * Lombok
            * JJwt: `0.11.5`
        -  개발 도구:
            *  Spring Boot Devtools
            *  Gradle `8.5`
        -  API 문서화:
            *  Swagger



## 빌드 및 배포
### 1. Openvidu 설치
📜 [공식 사이트](https://docs.openvidu.io/en/stable/deployment/ce/on-premises/#2-lets-encrypt-certificatep)
1) 설치를 위한 ROOT 권한
    ```
    sudo su
    ```
2) Openvidu 설치에 권장되는 /opt 폴더로 이동
    ```
    cd /opt
    ```
3) openvidu 설치
    ```bash
    curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash

    $ cd openvidu
    ```

4) openvidu env(환경설정)파일 수정
    ```
    $ vim .env
    # OpenVidu configuration
    
    DOMAIN_OR_PUBLIC_IP=<MY-DOMAIN>

    OPENVIDU_SECRET=<MY-SECRET>

    CERTIFICATE_TYPE=letsencrypt

    LETSENCRYPT_EMAIL=<MY-EMAIL>

    HTTP_PORT=80

    HTTPS_PORT=443
    ```

    - ❗ Openvidu를 처음 실행할 때 HTTPS 인증서를 발급받아야 하므로 첫 실행에는 포트 설정을 변경하지 않거나 주석처리 한채로 저장해 놓아야 한다.
    


5) 설정 후 오픈비두 서버 실행
    ```
    $ ./openvidu start

    Creating openvidu-docker-compose_coturn_1          ... done
    Creating openvidu-docker-compose_app_1             ... done
    Creating openvidu-docker-compose_kms_1             ... done
    Creating openvidu-docker-compose_nginx_1           ... done
    Creating openvidu-docker-compose_redis_1           ... done
    Creating openvidu-docker-compose_openvidu-server_1 ... done

    ----------------------------------------------------

    OpenVidu Platform is ready!
    ---------------------------

    * OpenVidu Server: https://DOMAIN_OR_PUBLIC_IP/

    * OpenVidu Dashboard: https://DOMAIN_OR_PUBLIC_IP/dashboard/

    ----------------------------------------------------
    ```

    - ❗ docker-compose가 설치된 환경이어야 함


### 2. AWS EC2 기본 설정 및 nginx 설치
1) (선택) 우분투 미러서버 변경
    - 처음 우분투를 받았을 때 기본설정 되어 있는 미러서버는 느리거나 update시 일부 다운로드가 되지 않는 오류가 발생하는 경우가 있음
    - 국내에서 접근 가능한 가장 빠른 카카오 미러서버로 기본설정 변경

    ```bash
    $ sudo vim /etc/apt/sources.list

    # esc버튼 클릭 후
    :%s/{기존에 입력되어 있던 미러서버 주소}/mirror.kakao.com
    :wq

    deb http://mirror.kakao.com/ubuntu/ focal main restricted

    deb http://mirror.kakao.com/ubuntu/ focal-updates main restricted

    deb http://mirror.kakao.com/ubuntu/ focal-updates universe

    deb http://mirror.kakao.com/ubuntu/ focal multiverse

    deb http://mirror.kakao.com/ubuntu/ focal-updates multiverse

    deb http://mirror.kakao.com/ubuntu/ focal-backports main restricted universe multiverse
    ```

2) nginx 설치 및 SSL 인증서 발급, 적용
    ```bash
    # nginx 설치
    sudo apt-get update
    sudo apt-get install nginx

    # 설치 및 버전 확인
    nginx -v
    ```

    - nginx설치후 letsencrypt를 이용해 SSL 인증서 발급
    ```bash
    sudo apt-get install letsencrypt # letsencrypt 설치

    sudo systemctl stop nginx # 발급을 위한 nginx 정지

    sudo letsencrypt certonly --standalone -d {도메인 주소} # letsencrypt로 서버 domain에 SSL 인증서 발급
    ```

    - nginx 설정 파일을 프로젝트에 맞게 수정
    ```
    sudo vim /etc/nginx/sites-available/default

    server {
            location / {
            proxy_pass http://localhost:{프론트 포트 번호};
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            }

            location /api/v1/ {
            proxy_pass http://localhost:{백엔드 포트번호}/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            }


        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/i10e103.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/i10e103.p.ssafy.io/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    }


    server {
        if ($host = i10e103.p.ssafy.io) {
            return 301 https://$host$request_uri;
        } # managed by Certbot


            listen 80 ;
            listen [::]:80 ;
        server_name i10e103.p.ssafy.io;
        return 404; # managed by Certbot
    }

    ```

    * nginx 테스트 후 재가동
    ```bash
    $ sudo nginx -t
    $ sudo systemctl restart nginx
    ```

3) 백엔드 빌드
    * BackEnd Dockerfile
    ```dockerfile
    FROM openjdk:17-jdk-alpine as build

    WORKDIR /workspace

    COPY gradlew .
    COPY gradle gradle
    COPY build.gradle .
    COPY settings.gradle .
    COPY src src

    RUN chmod +x ./gradlew

    RUN ./gradlew clean build

    FROM openjdk:17-jdk-alpine

    EXPOSE 8090

    COPY --from=build /workspace/build/libs/*.jar /app/app.jar

    ENTRYPOINT ["java","-jar","/app/app.jar"]
    ```

    * jenkins에서 Push 알림을 받아 clone 후 자동 배포
    ```
    # Spring Project 폴더로 이동
    cd BACK/project_7lans
    docker build -t 7lans-back .

    # Docker 컨테이너를 실행합니다.
    docker run -d -p 8090:8080 --name back-server 7lans-back
    ```

    * ❗ application.yaml 파일은 git에 업로드되지 않으므로 따로 설정해줌
    ```
    spring:
        datasource:
            driver-class-name: com.mysql.cj.jdbc.Driver
            url: jdbc:mysql://<your-host>:<your-port>/<db-name>?useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=UTF-8
            username: <db-username>
            password: <db-password>

        jpa:
            hibernate:
            ddl-auto: none // 배포/개발 환경 따라 다르게 설정
            properties:
            hibernate:
                format_sql: true

        logging:
        level:
            org.hibernate.SQL: debug
            
        springdoc:
        packages-to-scan: jpabasic.project_7lans
        default-consumes-media-type: application/json;charset=UTF-8
        default-produces-media-type: application/json;charset=UTF-8
        swagger-ui:
            path: /api-docs/
            disable-swagger-default-url: true
            display-request-duration: true
            operations-sorter: method
        use-fqn: true
            
        # JWT
        jwt:
        # HS256 algorithm is used.
        secret_key: <your-secret-key>
        expiration_time: <expiration time>
    ```

4) 프론트엔드 빌드
    * Frontend Dockerfile
    ```dockerfile
    FROM node:16

    WORKDIR /app

    COPY package*.json ./

    RUN npm install

    COPY . .

    RUN npm run build
    RUN ls -la /app
    FROM nginx:stable-alpine

    COPY --from=0 /app/dist /usr/share/nginx/html
    RUN ["rm", "/etc/nginx/conf.d/default.conf"]
    COPY ./default.conf /etc/nginx/conf.d
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]  
    ```

    * jenkins에서 Push 알림을 받아 clone 후 자동 배포
    ```
    # React Project 폴더로 이동
    cd FRONT/7lans
    docker build -t 7lans-front .

    # Docker 컨테이너 실행
    docker run -d --name front-server -p 30007:80 7lans-front   
    ```

    * ❗ 환경변수 관련 파일은 git에 업로드되지 않으므로 root 폴더에 따로 .env 파일을 설정해줌
    ```
    VITE_OPENVIDU_URL='<your-openvidu-url>'
    VITE_OPENVIDU_SECRET='<your-openvidu-secret>'
    VITE_API_URL='<your-api-url>'
    VITE_FIREBASE_API_KEY='<your-firebase-api-key>'
    VITE_PREVIOUS_SUBMIT='<your-previous-submit-image-url>'
    VITE_SUBMIT='<your-submit-image-url>'
    VITE_APPROVE='<your-approve-image-url>'
    VITE_DEFAULT_THUMBNAIL='<your-default-thumbnail-url>'
    VITE_PUBLIC_URL='<your-public-url>'
    ```