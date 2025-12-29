# Node.js Test Project

Node.js (React) workflow 테스트를 위한 최소 React 애플리케이션입니다.

## 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 테스트
npm test

# 빌드
npm run build
```

## Docker 지원

이 프로젝트는 Docker를 통한 프로덕션 배포를 지원합니다.

```bash
# Docker 이미지 빌드
docker build -t node-test-project .

# 컨테이너 실행
docker run -p 8080:80 node-test-project

# 브라우저에서 http://localhost:8080 접속
```

### GHCR에서 이미지 가져오기

릴리즈가 생성되면 자동으로 Docker 이미지가 GitHub Container Registry에 푸시됩니다.

```bash
# 최신 버전 가져오기
docker pull ghcr.io/your-org/node-test-project:latest

# 특정 버전 가져오기
docker pull ghcr.io/your-org/node-test-project:1.0.0

# 실행
docker run -p 8080:80 ghcr.io/your-org/node-test-project:latest
```

## 릴리즈 관리

이 프로젝트는 [Release Please](https://github.com/googleapis/release-please)를 사용하여 자동화된 릴리즈 관리를 수행합니다.

### 자동 버전 관리

- Conventional Commits 기반으로 버전이 자동으로 결정됩니다
- `feat:` → minor 버전 증가 (1.0.0 → 1.1.0)
- `fix:` → patch 버전 증가 (1.0.0 → 1.0.1)
- `feat!:` 또는 `BREAKING CHANGE:` → major 버전 증가 (1.0.0 → 2.0.0)

### 릴리즈 프로세스

1. main 브랜치에 커밋 푸시 (Conventional Commits 형식)
2. Release Please가 자동으로 릴리즈 PR 생성
3. PR 머지 시 GitHub Release 자동 생성
4. 릴리즈 시 자동으로:
   - 프로덕션 빌드 아티팩트 생성 (.tar.gz, .zip)
   - Docker 이미지 빌드 및 GHCR에 푸시
   - package.json 버전 자동 업데이트

## 테스트 시나리오

자세한 테스트 시나리오는 [TEST_SCENARIO.md](TEST_SCENARIO.md)를 참고하세요.

## Available Scripts

- `npm start` - 개발 서버 실행 (http://localhost:3000)
- `npm test` - Jest 테스트 실행
- `npm run build` - 프로덕션 빌드
- `npm run lint` - ESLint 실행

## 기여하기

이 프로젝트에 기여하고 싶으시다면 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

## Learn More

- [Create React App documentation](https://create-react-app.dev/docs/getting-started/)
- [React documentation](https://react.dev/)
- [Release Please documentation](https://github.com/googleapis/release-please)
- [Conventional Commits](https://www.conventionalcommits.org/)
