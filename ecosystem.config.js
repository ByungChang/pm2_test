module.exports = {
    apps: [
      {
        name: "test", // 이름. 나중에 이 이름으로 프로세스를 관리한다
        script: "./index.js", // 실행할 파일 경로
        instances: 1, // 클러스터 모드 사용 시 생성할 인스턴스 수
        exec_mode: "cluster", // fork, cluster 모드 중 선택
        merge_logs: true, // 클러스터 모드 사용 시 각 클러스터에서 생성되는 로그를 한 파일로 합쳐준다.
        autorestart: true, // 프로세스 실패 시 자동으로 재시작할지 선택
        watch: false, // 파일이 변경되었을 때 재시작 할지 선택
        max_memory_restart: "512M", // 프로그램의 메모리 크기가 일정 크기 이상이 되면 재시작한다.
        env: {
          // 개발 환경설정
          PORT: 3001,
          NODE_ENV: "development"
        },
        env_production: {
          // 운영 환경설정 (--env production 옵션으로 지정할 수 있다.)
          PORT: 3002,
          NODE_ENV: "production"
        }
      }
    ],
  
    deploy: {
      development: {
        // 개발 환경설정
        user: "root",
        host: [{ host: "192.168.0.201"}],
        ref: "origin/master", // 리모트 브랜치
        repo: "git@github.com:byungchang/pm2_test.git", // Github 프로젝트 주소
        ssh_options: 'StrictHostKeyChecking=no',
        path: "/var/www/pm2_test", // 원격 서버에서 프로젝트를 생성할 위치
        // 프로젝트 배포 후 실행할 명령어
        "post-deploy":
          "npm install && pm2 reload ecosystem.config.js --env development"
      },
      production: {
        // 운영 환경설정
        //...
      }
    }
  };