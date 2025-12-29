# Node.js Test Project - 테스트 시나리오

이 프로젝트는 Node.js (React) workflow를 테스트하기 위한 최소 React 애플리케이션입니다.

---

## 📋 프로젝트 구조

```
node-test/
├── .github/
│   ├── workflows/
│   │   ├── pr-build.yml       # PR 빌드 & 테스트
│   │   ├── release.yml        # 릴리즈 & NPM 배포
│   │   ├── labels.yml         # 라벨 동기화
│   │   ├── pr-checks.yml      # PR 검증
│   │   └── release-please.yml # 릴리즈 자동화
│   ├── ISSUE_TEMPLATE/
│   ├── labels.yml
│   └── pull_request_template.md
├── public/
│   └── index.html             # HTML 템플릿
├── src/
│   ├── index.js               # 엔트리 포인트
│   ├── index.css              # 글로벌 스타일
│   ├── App.js                 # 메인 컴포넌트
│   ├── App.css                # App 스타일
│   └── App.test.js            # 테스트
├── package.json               # 의존성 & 버전
├── .nvmrc                     # Node 버전
└── README.md
```

---

## 🚀 로컬 테스트

### 1. Node.js 설치 확인

```bash
node --version
# v20.x.x

npm --version
# 10.x.x
```

### 2. 의존성 설치 및 테스트

```bash
# 프로젝트 디렉토리로 이동
cd node-test

# 의존성 설치
npm install

# 개발 서버 실행
npm start
# 브라우저에서 http://localhost:3000 자동 열림

# 테스트 실행
npm test

# 빌드
npm run build

# 빌드 결과물 확인
ls -lh build/

# 빌드 결과물 미리보기
npx serve -s build
# http://localhost:3000
```

---

## 🧪 GitHub Actions 테스트 시나리오

### 시나리오 1: PR Build Workflow 테스트

**목적**: PR 생성 시 자동 빌드 & 테스트 실행

**단계**:

```bash
# 1. GitHub에 새 레포지토리 생성
# - 레포 이름: node-test-workflow

# 2. 로컬에서 Git 초기화
cd node-test
git init
git add .
git commit -m "feat: initial React app"
git branch -M main

# 3. 원격 레포지토리 연결 및 푸시
git remote add origin https://github.com/YOUR_USERNAME/node-test-workflow.git
git push -u origin main

# 4. develop 브랜치 생성
git checkout -b develop
git push origin develop

# 5. 기능 브랜치 생성
git checkout -b feat/add-new-component

# 6. 새 컴포넌트 추가
cat > src/HelloWorld.js << 'EOF'
import React from 'react';

function HelloWorld() {
  return (
    <div>
      <h2>Hello from a new component!</h2>
    </div>
  );
}

export default HelloWorld;
EOF

# App.js에서 import 및 사용
git add .
git commit -m "feat: HelloWorld 컴포넌트 추가"
git push origin feat/add-new-component

# 7. GitHub에서 PR 생성
# - Base: develop
# - Compare: feat/add-new-component
# - PR 제목: "feat: HelloWorld 컴포넌트 추가"
# - PR 본문: "Fixes #1"
```

**확인 사항**:
- [ ] `pr-build.yml` workflow 자동 실행
- [ ] Node 버전 자동 감지 (.nvmrc)
- [ ] `npm ci` 의존성 설치 성공
- [ ] `npm run lint` 성공 (ESLint)
- [ ] `npm test` 통과
- [ ] `npm run build` 성공
- [ ] 빌드 결과물 업로드
- [ ] PR Checks 통과

---

### 시나리오 2: TypeScript 타입 체크 테스트 (선택사항)

**목적**: TypeScript 프로젝트인 경우 타입 체크 실행

**사전 준비**:
```bash
# TypeScript로 변환 (선택사항)
npm install --save typescript @types/node @types/react @types/react-dom

# tsconfig.json이 있으면 pr-build.yml이 자동으로 타입 체크 실행
```

---

### 시나리오 3: Release Workflow 테스트 (Release Please v4)

**목적**: Release 생성 시 프로덕션 빌드 및 배포

**사전 준비**:
- `release-please-config.json` 파일 존재 확인
- `.release-please-manifest.json` 파일에 현재 버전 명시
- `package.json`의 version이 manifest와 일치하는지 확인

**단계**:

```bash
# 1. main 브랜치에 Conventional Commits 추가
git checkout main
git commit --allow-empty -m "feat: 다크 모드 지원"
git commit --allow-empty -m "fix: 레이아웃 버그 수정"
git push origin main

# 2. Release-Please가 자동으로 Release PR 생성
# - release-please-config.json 기반으로 동작
# - package.json의 version 자동 업데이트
# - CHANGELOG.md 자동 생성

# 3. Release PR 확인
gh pr list
# "chore(main): release X.X.X" 형태의 PR 확인

# 4. Release PR 내용 확인
# - package.json 버전 변경사항
# - CHANGELOG.md 업데이트
# - .release-please-manifest.json 업데이트

# 5. Release PR 머지
gh pr merge [PR_NUMBER] --merge

# 6. GitHub Release 자동 생성 확인
gh release list

# 7. Release workflow 실행 확인
gh run list --workflow=release.yml
```

**확인 사항**:
- [ ] Release Please가 올바른 버전을 계산 (Conventional Commits 기반)
- [ ] `package.json`의 version이 자동 업데이트됨
- [ ] `.release-please-manifest.json`이 업데이트됨
- [ ] CHANGELOG.md가 생성되거나 업데이트됨
- [ ] Git tag 생성 및 GitHub Release 생성
- [ ] **release-please workflow에서 Docker 이미지 자동 빌드 시작**
- [ ] Node.js 의존성 설치 및 프로덕션 빌드 성공
- [ ] Docker 이미지 빌드 성공 (멀티 플랫폼)
- [ ] GHCR에 이미지 푸시 성공
- [ ] GitHub Release에 Docker 이미지 정보 자동 추가
- [ ] release.yml workflow가 실행되어 빌드 아티팩트 생성

---

### 시나리오 4: NPM 배포 테스트 (라이브러리인 경우)

**목적**: NPM 레지스트리에 패키지 배포

**사전 준비**:
```bash
# 1. package.json 수정
# - "private": false 설정
# - "main", "module" 필드 추가 (라이브러리인 경우)

# 2. NPM 계정 생성: https://www.npmjs.com/signup
# 3. NPM 토큰 생성: https://www.npmjs.com/settings/[username]/tokens
# 4. GitHub Secret 등록: NPM_TOKEN
```

**확인 사항**:
- [ ] NPM에 패키지 업로드 성공
- [ ] `npm install node-test-project` 가능

---

### 시나리오 5: 환경 변수 주입 테스트

**목적**: 빌드 시 환경 변수 주입 확인

**단계**:

```bash
# 로컬 테스트
REACT_APP_VERSION=0.1.0 npm run build

# build/ 디렉토리의 JavaScript 파일에서 버전 확인
grep -r "0.1.0" build/

# 실행 및 확인
npx serve -s build
# 브라우저에서 "Version: 0.1.0" 표시 확인
```

**확인 사항**:
- [ ] release.yml에서 `REACT_APP_VERSION` 설정
- [ ] 빌드 결과물에 버전 정보 포함
- [ ] UI에서 버전 정보 확인 가능

---

### 시나리오 6: Docker 이미지 빌드 및 GHCR 테스트

**목적**: Docker 이미지 로컬 빌드 및 GHCR 푸시 확인

**로컬 테스트**:

```bash
# 1. Docker 이미지 빌드
docker build -t node-test-project:dev .

# 2. 빌드된 이미지 확인
docker images | grep node-test-project

# 3. 컨테이너 실행
docker run -d -p 8080:80 --name test-app node-test-project:dev

# 4. Health check 확인
docker ps
# STATUS 컬럼에서 "healthy" 확인

# 5. 브라우저 테스트
curl http://localhost:8080
# 또는 브라우저에서 http://localhost:8080 접속

# 6. 컨테이너 로그 확인
docker logs test-app

# 7. 컨테이너 정리
docker stop test-app
docker rm test-app
```

**GHCR 푸시 테스트** (Release Please workflow에서 자동 실행):

```bash
# 1. Release 생성 (위의 시나리오 3 참조)

# 2. Release Please workflow 내 Docker 빌드 확인
gh run list --workflow=release-please.yml

# 3. Workflow 상세 로그 확인
gh run view [RUN_ID]

# 4. GHCR에서 이미지 확인
# https://github.com/YOUR_ORG/YOUR_REPO/pkgs/container/YOUR_REPO

# 5. 이미지 pull 테스트
docker pull ghcr.io/YOUR_ORG/YOUR_REPO:latest

# 6. Pull한 이미지 실행
docker run -p 8080:80 ghcr.io/YOUR_ORG/YOUR_REPO:latest

# 7. 특정 버전 이미지 테스트
docker pull ghcr.io/YOUR_ORG/YOUR_REPO:1.0.0
docker run -p 8080:80 ghcr.io/YOUR_ORG/YOUR_REPO:1.0.0
```

**확인 사항**:
- [ ] 로컬에서 Docker 이미지 빌드 성공
- [ ] 멀티 스테이지 빌드로 이미지 크기 최적화 확인
- [ ] nginx가 정상적으로 실행됨
- [ ] Health check가 정상적으로 작동함
- [ ] GHCR에 이미지 푸시 성공 (Release 시)
- [ ] 여러 태그가 생성됨 (latest, 버전, major.minor, major)
- [ ] 멀티 플랫폼 이미지 빌드 성공 (amd64, arm64)
- [ ] GHCR에서 이미지 pull 및 실행 성공

**Docker 이미지 태그 전략**:
- `latest` - 가장 최신 릴리즈
- `1.0.0` - 정확한 버전
- `1.0` - major.minor 버전
- `1` - major 버전만

---

### 시나리오 7: ESLint 검증 테스트

**목적**: 코드 스타일 검증

**단계**:

```bash
# 1. 의도적으로 잘못된 코드 추가
cat >> src/App.js << 'EOF'

// 사용하지 않는 변수
const unusedVariable = 'test';
EOF

git add .
git commit -m "test: ESLint 테스트"
git push

# 2. PR에서 ESLint 오류 확인
```

**수정**:
```bash
# 로컬에서 수정
npm run lint

# 자동 수정 (가능한 경우)
npx eslint src/ --fix

git add .
git commit -m "style: ESLint 오류 수정"
git push
```

---

## 🔍 트러블슈팅

### 문제 1: npm ci 실패

**증상**:
```
npm ERR! The package-lock.json file is outdated
```

**해결**:
```bash
# package-lock.json 재생성
rm package-lock.json
npm install
git add package-lock.json
git commit -m "chore: package-lock.json 업데이트"
```

---

### 문제 2: 빌드 실패 - 메모리 부족

**증상**:
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**해결**:
```bash
# Node 메모리 증가
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

또는 `package.json` 수정:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' react-scripts build"
  }
}
```

---

### 문제 3: 테스트 무한 대기

**증상**:
```
Tests are hanging...
```

**해결**:
```bash
# 단일 실행 모드로 테스트
CI=true npm test

# 또는 package.json에 추가
{
  "scripts": {
    "test": "react-scripts test --passWithNoTests --watchAll=false"
  }
}
```

---

### 문제 4: 빌드 디렉토리 없음

**증상**:
```
Build directory not found
```

**해결**:
- `npm run build` 성공 확인
- `build/` 또는 `dist/` 디렉토리 존재 확인
- Create React App은 `build/`, Next.js는 `.next/` 사용

---

## ✅ 최종 체크리스트

- [ ] 로컬 빌드 성공 (`npm run build`)
- [ ] 로컬 테스트 통과 (`npm test`)
- [ ] 린팅 통과 (`npm run lint`)
- [ ] PR Build workflow 성공
- [ ] PR Checks workflow 성공
- [ ] Release-Please PR 생성 확인
- [ ] GitHub Release 생성 확인
- [ ] 빌드 결과물 압축 파일 업로드 확인
- [ ] NPM 배포 성공 (라이브러리인 경우)

---

## 📚 참고 자료

- [Node.js Workflow 가이드](../.github/workflows/node-react/README.md)
- [Create React App 공식 문서](https://create-react-app.dev/)
- [React 공식 문서](https://react.dev/)
- [npm 공식 문서](https://docs.npmjs.com/)

---

## 💡 팁

1. **의존성 캐시**: GitHub Actions에서 npm 캐시 활용으로 빌드 시간 단축
2. **환경 변수**: `REACT_APP_` 접두사로 환경 변수 사용
3. **빌드 최적화**: `npm run build`로 프로덕션 최적화 빌드
4. **정적 호스팅**: GitHub Pages, Vercel, Netlify 등 활용 가능

즐거운 테스트 되세요! ⚛️
