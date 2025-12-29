# Contributing Guide

이 프로젝트에 기여해주셔서 감사합니다! 이 가이드는 효과적으로 기여하는 방법을 설명합니다.

---

## 📋 목차

- [시작하기 전에](#시작하기-전에)
- [개발 환경 설정](#개발-환경-설정)
- [브랜치 전략](#브랜치-전략)
- [커밋 컨벤션](#커밋-컨벤션)
- [Pull Request 가이드](#pull-request-가이드)
- [코드 스타일](#코드-스타일)
- [테스트](#테스트)
- [릴리즈 프로세스](#릴리즈-프로세스)
- [Docker 이미지](#docker-이미지)

---

## 시작하기 전에

### Issue 생성

새로운 기능이나 버그 수정을 시작하기 전에 [Issue](../../issues)를 먼저 생성하거나 기존 Issue를 확인해주세요.

- 버그 리포트: 버그 템플릿 사용
- 기능 제안: Feature Request 템플릿 사용
- 질문: Discussion 탭 이용

### 기여 가능한 항목

- 🐛 버그 수정
- ✨ 새로운 기능 추가
- 📚 문서 개선
- ♻️ 코드 리팩토링
- ⚡ 성능 개선
- ✅ 테스트 추가

---

## 개발 환경 설정

### 1. 저장소 Fork 및 Clone

```bash
# Fork 후 clone
git clone https://github.com/YOUR_USERNAME/PROJECT_NAME.git
cd PROJECT_NAME

# Upstream 저장소 추가
git remote add upstream https://github.com/ORIGINAL_OWNER/PROJECT_NAME.git
```

### 2. 의존성 설치

```bash
# Node.js 버전 확인 (.nvmrc 참조)
node --version

# 의존성 설치
npm install
```

### 3. 로컬 실행

```bash
# 개발 서버 실행
npm start

# 테스트 실행
npm test

# 빌드
npm run build

# 린팅
npm run lint
```

### 4. Docker 로컬 테스트 (선택사항)

```bash
# Docker 이미지 빌드
docker build -t project-name:dev .

# 컨테이너 실행
docker run -p 8080:80 project-name:dev

# 브라우저에서 http://localhost:8080 확인
```

---

## 브랜치 전략

### 브랜치 네이밍

```
feat/기능명          # 새로운 기능
fix/이슈번호-버그명   # 버그 수정
docs/문서명          # 문서 업데이트
refactor/대상        # 리팩토링
perf/개선사항        # 성능 개선
test/테스트명        # 테스트 추가
chore/작업명         # 기타 작업
```

### 예시

```bash
# 새 기능 개발
git checkout -b feat/dark-mode

# 버그 수정
git checkout -b fix/123-login-error

# 문서 업데이트
git checkout -b docs/contributing-guide
```

---

## 커밋 컨벤션

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 스펙을 따릅니다.

### 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

| Type | 설명 | 버전 영향 |
|------|------|----------|
| `feat` | 새로운 기능 | Minor (1.0.0 → 1.1.0) |
| `fix` | 버그 수정 | Patch (1.0.0 → 1.0.1) |
| `docs` | 문서 변경 | 없음 |
| `style` | 코드 스타일 변경 (포맷팅) | 없음 |
| `refactor` | 리팩토링 | 없음 |
| `perf` | 성능 개선 | Patch |
| `test` | 테스트 추가/수정 | 없음 |
| `build` | 빌드 시스템 변경 | 없음 |
| `ci` | CI 설정 변경 | 없음 |
| `chore` | 기타 변경사항 | 없음 |
| `revert` | 이전 커밋 되돌리기 | 없음 |

### Breaking Changes

Breaking change가 있는 경우:

```bash
# 방법 1: ! 사용
git commit -m "feat!: API 엔드포인트 변경"

# 방법 2: footer에 BREAKING CHANGE 명시
git commit -m "feat: 새로운 인증 시스템

BREAKING CHANGE: 기존 auth 토큰은 더 이상 유효하지 않습니다."
```

Breaking change는 Major 버전을 증가시킵니다 (1.0.0 → 2.0.0).

### 커밋 예시

```bash
# 새로운 기능
git commit -m "feat: 다크 모드 테마 추가"

# 버그 수정
git commit -m "fix: 로그인 페이지 리다이렉트 오류 수정"

# 문서 업데이트
git commit -m "docs: README에 Docker 사용법 추가"

# 성능 개선
git commit -m "perf: 이미지 lazy loading 적용"

# 여러 줄 커밋 메시지
git commit -m "feat: 사용자 프로필 기능 추가

- 프로필 이미지 업로드
- 닉네임 변경
- 이메일 알림 설정

Closes #42"
```

---

## Pull Request 가이드

### 1. 최신 상태 유지

```bash
# upstream에서 최신 변경사항 가져오기
git fetch upstream
git rebase upstream/main
```

### 2. PR 생성

1. Fork한 저장소로 push
   ```bash
   git push origin feat/your-feature
   ```

2. GitHub에서 Pull Request 생성
   - Base: `main` (또는 `develop`)
   - Compare: `feat/your-feature`

3. PR 템플릿 작성
   - 관련 Issue 번호 명시 (`Fixes #123`)
   - 변경 사항 설명
   - 체크리스트 완료

### 3. PR 체크리스트

PR을 제출하기 전에 다음을 확인하세요:

- [ ] 코드가 로컬에서 정상 작동함
- [ ] 린팅 통과 (`npm run lint`)
- [ ] 테스트 통과 (`npm test`)
- [ ] 빌드 성공 (`npm run build`)
- [ ] Conventional Commits 형식 준수
- [ ] 관련 문서 업데이트 (필요한 경우)
- [ ] Breaking Changes 명시 (해당되는 경우)

### 4. 리뷰 과정

- CI/CD가 자동으로 빌드, 테스트, 린팅을 실행합니다
- 리뷰어의 피드백에 응답하고 필요시 수정합니다
- 승인 후 maintainer가 머지합니다

---

## 코드 스타일

### ESLint

프로젝트는 ESLint를 사용합니다:

```bash
# 린팅 실행
npm run lint

# 자동 수정
npm run lint -- --fix
```

### 일반 규칙

- 들여쓰기: 2 spaces
- 문자열: 작은따옴표 선호
- 세미콜론: 필수
- 파일명: kebab-case (예: `user-profile.js`)
- 컴포넌트명: PascalCase (예: `UserProfile`)

---

## 테스트

### 테스트 작성

새로운 기능에는 테스트를 추가해주세요:

```javascript
// ComponentName.test.js
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### 테스트 실행

```bash
# 모든 테스트 실행
npm test

# Watch 모드
npm test -- --watch

# 커버리지 확인
npm test -- --coverage
```

---

## 릴리즈 프로세스

이 프로젝트는 [Release Please](https://github.com/googleapis/release-please)를 사용한 자동 릴리즈를 수행합니다.

### 자동 릴리즈 흐름

1. **개발자**: Conventional Commits으로 커밋 작성
2. **Release Please**: main 브랜치 푸시 시 릴리즈 PR 자동 생성
   - 버전 자동 계산
   - CHANGELOG.md 자동 업데이트
   - package.json 버전 자동 업데이트
3. **Maintainer**: 릴리즈 PR 리뷰 후 머지
4. **자동화**: GitHub Release 생성 및 다음 작업 실행
   - 프로덕션 빌드 아티팩트 생성
   - Docker 이미지 빌드 및 GHCR 푸시
   - NPM 배포 (설정된 경우)

### 수동 버전 업데이트

특별한 경우 수동으로 버전을 지정할 수 있습니다:

```bash
# package.json과 .release-please-manifest.json 모두 업데이트
git commit -m "chore: release 2.0.0" --allow-empty
```

---

## Docker 이미지

### 로컬 빌드 및 테스트

```bash
# 이미지 빌드
docker build -t project-name:dev .

# 실행
docker run -p 8080:80 project-name:dev

# 테스트
curl http://localhost:8080
```

### GHCR 이미지

릴리즈가 생성되면 자동으로 다음 태그로 이미지가 푸시됩니다:

- `ghcr.io/owner/repo:latest`
- `ghcr.io/owner/repo:1.0.0`
- `ghcr.io/owner/repo:1.0`
- `ghcr.io/owner/repo:1`

---

## 질문이나 도움이 필요한 경우

- [Issue](../../issues) 생성
- [Discussions](../../discussions) 참여
- 메인테이너에게 직접 문의

감사합니다! 🎉
