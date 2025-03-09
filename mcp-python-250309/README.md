# MCP Python 샘플 서버

Cursor IDE와 Agent 간의 통신을 위한 JSON-RPC 2.0 기반 MCP(Machine Control Protocol) 서버입니다. 이 프로젝트는 FastMCP 라이브러리를 사용하여 구현된 샘플 서버입니다.

## 프로젝트 구조

```
.
├── server.py              # MCP 서버 메인 코드
├── requirements.txt       # 필요한 Python 패키지 목록
├── Dockerfile             # Docker 이미지 빌드 설정
├── docker-compose.yml     # Docker Compose 설정
├── .dockerignore          # Docker 빌드 시 제외할 파일 목록
└── .cursorrules           # Cursor IDE 규칙 설정
```

## 주요 기능

- JSON-RPC 2.0 프로토콜 지원
- 다양한 전송 방식 지원 (SSE, WebSocket, stdio)
- MCP 도구(Tool) 구현 및 등록
- MCP 리소스(Resource) 구현 및 등록
- MCP 프롬프트(Prompt) 구현 및 등록
- Docker 컨테이너화 지원

## 구현된 MCP 기능

### 도구(Tools)

1. `add` - 두 숫자를 더하는 도구
2. `echo_tool` - 메시지를 그대로 반환하는 도구

### 리소스(Resources)

1. `greeting://{name}` - 이름을 받아 인사말을 반환하는 리소스
2. `echo://{message}` - 메시지를 그대로 반환하는 리소스

### 프롬프트(Prompts)

1. `echo_prompt` - 메시지를 받아 프롬프트 형식으로 반환

## 설치 및 실행 방법

### 로컬 환경에서 실행

1. 필요한 패키지 설치:

```bash
pip install -r requirements.txt
```

2. 서버 실행:

```bash
python server.py
```

### Docker Compose로 실행

1. Docker Compose를 사용하여 서버 빌드 및 실행:

```bash
docker-compose up -d
```

2. 이미지를 다시 빌드하고 실행하려면:

```bash
docker-compose up -d --build
```

3. 로그 확인:

```bash
docker-compose logs -f
```

4. 서버 중지:

```bash
docker-compose down
```

서버는 기본적으로 `http://localhost:8000`에서 실행됩니다.

## 환경 변수 설정

Docker Compose 환경에서는 다음 환경 변수를 사용합니다:

- `PYTHONUNBUFFERED=1` - Python 출력 버퍼링 비활성화
- `LOG_LEVEL=DEBUG` - 로깅 레벨 설정
- `FASTMCP_PORT=8000` - 서버 포트 설정
- `FASTMCP_TRANSPORT=sse` - 전송 방식 설정 (sse, websocket, stdio)
- `FASTMCP_DEBUG=true` - 디버그 모드 활성화
- `FASTMCP_HOST=0.0.0.0` - 호스트 설정

## 전송 방식 변경

`server.py` 파일에서 다음과 같이 전송 방식을 변경할 수 있습니다:

```python
# SSE 방식 (기본값)
mcp.run(transport="sse")
```

또는 Docker Compose 환경에서는 `docker-compose.yml` 파일의 환경 변수를 수정하여 변경할 수 있습니다:

```yaml
environment:
  - FASTMCP_TRANSPORT=sse # sse, websocket, stdio 중 선택
```

## Cursor IDE와 연결

Cursor IDE는 MCP 서버에 연결하여 등록된 도구, 리소스, 프롬프트를 사용할 수 있습니다. 연결 방법은 Cursor IDE의 설정에 따라 다를 수 있습니다.

## 개발 가이드

### 새로운 도구 추가

`server.py` 파일에 다음과 같이 새로운 도구를 추가할 수 있습니다:

```python
@mcp.tool()
def new_tool(param1: str, param2: int) -> str:
    """새로운 도구 설명"""
    # 도구 구현
    return f"결과: {param1}, {param2}"
```

### 새로운 리소스 추가

```python
@mcp.resource("resource://{param}")
def new_resource(param: str) -> str:
    """새로운 리소스 설명"""
    # 리소스 구현
    return f"리소스 결과: {param}"
```

### 새로운 프롬프트 추가

```python
@mcp.prompt()
def new_prompt(param: str) -> str:
    """새로운 프롬프트 설명"""
    # 프롬프트 구현
    return f"프롬프트: {param}"
```

## 문제 해결

### 서버가 시작되지 않는 경우

1. 필요한 패키지가 모두 설치되어 있는지 확인합니다.
2. 포트 충돌이 없는지 확인합니다.
3. 로그를 확인하여 오류 메시지를 확인합니다.

### Cursor IDE와 연결되지 않는 경우

1. 서버가 실행 중인지 확인합니다.
2. 서버 URL이 올바르게 설정되어 있는지 확인합니다.
3. 방화벽 설정을 확인합니다.
4. 로그를 확인하여 연결 요청이 수신되는지 확인합니다.

## 라이센스

MIT
