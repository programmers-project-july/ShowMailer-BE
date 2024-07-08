# backend-demo repository

Node.js와 TypeScript를 사용한 백엔드 서버

## 프로젝트 개요

이 프로젝트는 Express와 TypeScript를 사용하여 Node.js 백엔드 서버를 구축하기 위한 기본 템플릿입니다.

## 설정 및 설치

### 1. 초기 설정

먼저 프로젝트를 초기화하고 필요한 패키지를 설치합니다.

```bash
npm init -y
npm install express
npm install typescript ts-node @types/node @types/express
```

```
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### 브런치 세팅
dev브런치 아래에 하위 브런치를 생성하여 사용하시면 됩니다.

1. 기능개발 = feat 태그를 사용합니다. ex : feat/#1-firestore -> firestore관련 기능 개발에 사용

브런치 생성 후 작업 위치에서 터미널에
``` git fetch ```
``` git git checkout -t origin/feat/#1-firestore ```
``` git branch ```
브런치 변경 확인 후에 개발 진행하시면 됩니다.
Readme 업데이트는 필요한 부분 계속하여 진행하시면 됩니다.
