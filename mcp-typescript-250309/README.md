# MCP TypeScript 서버

이 프로젝트는 Model Context Protocol(MCP)을 사용하는 TypeScript 서버 예제입니다.

## 기능

- MCP 서버 구현
- 간단한 덧셈 도구 (`add`) 제공
- 동적 인사말 리소스 (`greeting`) 제공
- Express 서버를 통한 SSE(Server-Sent Events) 연결 지원

## 설치 방법

```bash
# 의존성 설치
npm install
```

## 실행 방법

```bash
# 서버 실행
npm start
```

서버는 기본적으로 8001 포트에서 실행됩니다.

## 사용 가능한 도구

### add

두 숫자를 더합니다.

**매개변수**:

- `a`: 첫 번째 숫자
- `b`: 두 번째 숫자

**반환값**: 두 숫자의 합

**예시**:

```
입력: a=1, b=5
출력: 6
```

### greeting

동적 인사말을 생성합니다.

**매개변수**:

- `name`: 인사할 대상의 이름

**반환값**: 인사말 메시지

**예시**:

```
입력: name=홍길동
출력: Hello, 홍길동!
```

## 클라이언트 연결 방법

1. SSE 연결: `/sse` 엔드포인트로 GET 요청
2. 메시지 전송: `/messages` 엔드포인트로 POST 요청

## 개발 환경

- Node.js
- TypeScript
- Express
- MCP SDK

## 라이센스

MIT
