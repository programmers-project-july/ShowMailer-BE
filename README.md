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
