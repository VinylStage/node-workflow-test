# Node.js (React) Workflows

이 디렉토리는 **Node.js/React** 프로젝트를 위한 GitHub Actions Workflow 템플릿을 제공합니다.

---

## 📋 포함된 Workflow

| Workflow | 파일명 | 트리거 | 설명 |
|----------|--------|--------|------|
| **PR Build & Test** | `pr-build.yml` | PR 생성/업데이트 | 빌드, 테스트, 린팅, 타입 체크 |
| **Release** | `release.yml` | Release 생성 | 프로덕션 빌드 & NPM 배포 |

---

## 🚀 빠른 시작

### 1. 필수 요구사항

#### 프로젝트 설정
- **`package.json`** 필수
- **`package-lock.json`** 필수 (npm ci 사용)
- Node 버전 명시 (`.nvmrc`)

#### package.json 예시
```json
{
  "name": "your-app",
  "version": "1.0.0",
  "private": false,
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0"
  }
}
```

#### .nvmrc 예시
```
20.10.0
```

또는:
```
20
```

### 2. Workflow 복사

```bash
# 프로젝트로 이동
cd /path/to/your-project

# Node.js workflow 복사
cp /path/to/template/.github/workflows/node-react/* .github/workflows/
cp /path/to/template/.github/workflows/_common/* .github/workflows/
```

### 3. NPM 배포 설정 (선택사항)

NPM에 패키지를 배포하려면:

1. NPM 토큰 발급: https://www.npmjs.com/settings/[username]/tokens
2. GitHub Secret 등록: `NPM_TOKEN`
3. `package.json`의 `private` 필드를 `false`로 설정

```bash
# GitHub CLI 사용
gh secret set NPM_TOKEN
```

---

## 📝 Workflow 상세 설명

### PR Build & Test (`pr-build.yml`)

**트리거**:
- `develop` 또는 `main` 브랜치로의 PR 생성/업데이트

**실행 내용**:
1. Node 버전 자동 감지 (`.nvmrc`)
2. 의존성 설치 (`npm ci`)
3. ESLint 실행 (lint 스크립트가 있는 경우)
4. TypeScript 타입 체크 (`tsconfig.json`이 있는 경우)
5. 테스트 실행 (test 스크립트가 있는 경우)
6. 프로덕션 빌드 (`npm run build`)
7. 빌드 결과물 업로드
8. Docker 이미지 빌드 검증 (선택사항)

**커스터마이징**:
```yaml
# Node 버전 고정
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'

# Yarn 사용
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version-file: '.nvmrc'
    cache: 'yarn'

- name: Install dependencies
  run: yarn install --frozen-lockfile

# pnpm 사용
- uses: pnpm/action-setup@v2
  with:
    version: 8

- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version-file: '.nvmrc'
    cache: 'pnpm'
```

---

### Release (`release.yml`)

**트리거**:
- GitHub Release 생성 시
- 수동 실행 (`workflow_dispatch`)

**실행 내용**:
1. Node 버전 자동 감지
2. `package.json`에서 버전 추출
3. Git tag와 버전 일치 확인 (경고만)
4. 테스트 실행 (최종 검증)
5. 프로덕션 빌드
6. 빌드 결과물 압축 (`.tar.gz`, `.zip`)
7. Release에 빌드 결과물 업로드
8. NPM 배포 (NPM_TOKEN이 설정되고 `private: false`인 경우)

**환경 변수 주입**:
```yaml
- name: Build project
  run: npm run build
  env:
    REACT_APP_VERSION: ${{ steps.version.outputs.version }}
    REACT_APP_BUILD_TIME: ${{ github.event.repository.updated_at }}
```

---

## 🔧 버전 관리 전략

### package.json의 version = 버전의 단일 기준(SSOT)

1. **개발 중에는 `package.json`의 버전을 변경하지 않음**
2. **릴리즈 시점에만 버전 업데이트**
   - Release-Please가 Conventional Commits 기반으로 자동 업데이트
3. **Git tag는 `package.json` 버전과 동기화**

### Conventional Commits 예시

```bash
# Minor 버전 증가 (1.0.0 → 1.1.0)
git commit -m "feat: 다크 모드 지원 추가"

# Patch 버전 증가 (1.0.0 → 1.0.1)
git commit -m "fix: 모바일 레이아웃 버그 수정"

# Major 버전 증가 (1.0.0 → 2.0.0)
git commit -m "feat!: React 18로 업그레이드

BREAKING CHANGE: React 17 이하는 더 이상 지원되지 않습니다."
```

---

## 📦 릴리즈 사용법

### React 앱 (build 결과물)

Release가 생성되면 빌드 결과물이 압축되어 업로드됩니다.

```bash
# 다운로드
wget https://github.com/your-org/your-app/releases/download/v1.0.0/your-app-v1.0.0.tar.gz

# 압축 해제
tar -xzf your-app-v1.0.0.tar.gz

# 정적 파일 서빙
cd build
python3 -m http.server 8000
# 또는
npx serve -s .
```

### NPM 패키지 (라이브러리인 경우)

```bash
# NPM에서 설치
npm install your-package

# 특정 버전 설치
npm install your-package@1.0.0
```

---

## 🧪 로컬 테스트

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 린팅
npm run lint

# 타입 체크
npm run type-check

# 테스트
npm test

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npx serve -s build
```

---

## 🏗️ 빌드 디렉토리

프로젝트에 따라 빌드 결과물 경로가 다를 수 있습니다:

| 도구 | 빌드 디렉토리 |
|------|-------------|
| Create React App | `build/` |
| Next.js | `.next/` 또는 `out/` |
| Vite | `dist/` |
| Parcel | `dist/` |

Workflow에서 자동으로 `build/` 또는 `dist/`를 감지합니다.

---

## 🔍 트러블슈팅

### Q1. Node 버전 자동 감지 실패

**해결**:
- `.nvmrc` 파일 생성
- 또는 workflow에서 Node 버전 고정

### Q2. npm ci 실패

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

### Q3. ESLint 실패

**해결**:
- 로컬에서 `npm run lint -- --fix` 실행
- 또는 workflow에서 ESLint 단계를 `continue-on-error: true`로 설정

### Q4. 빌드 결과물 경로 오류

**증상**:
```
Build directory not found
```

**해결**:
- `package.json`의 build 스크립트 확인
- 또는 workflow에서 `BUILD_DIR` 환경 변수 수정

### Q5. NPM 배포 실패

**증상**:
```
npm ERR! You must be logged in to publish packages
```

**해결**:
- `NPM_TOKEN` Secret 확인
- `package.json`의 `private` 필드가 `false`인지 확인

---

## 📚 추가 리소스

- [Create React App 공식 문서](https://create-react-app.dev/)
- [GitHub Actions - setup-node](https://github.com/actions/setup-node)
- [npm ci 공식 문서](https://docs.npmjs.com/cli/v10/commands/npm-ci)

---

## 💬 문의

궁금한 점이 있다면 [Issue](../../issues)를 생성해주세요!
