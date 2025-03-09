# MCP 서버 프로젝트

이 저장소는 Cursor IDE와 Agent 간의 통신을 위한 MCP(Machine Control Protocol) 서버 구현 예제를 포함하고 있습니다. Python과 TypeScript 두 가지 언어로 구현된 서버 예제를 제공합니다.

## 프로젝트 구조

```
.
├── mcp-python-250309/    # Python으로 구현된 MCP 서버
└── mcp-typescript-250309/  # TypeScript로 구현된 MCP 서버
```

## 하위 프로젝트

### MCP Python 서버 (mcp-python-250309)

FastMCP 라이브러리를 사용하여 구현된 Python 기반 MCP 서버입니다.

**주요 기능**:

- JSON-RPC 2.0 프로토콜 지원
- 다양한 전송 방식 지원 (SSE, WebSocket, stdio)
- 샘플 MCP 도구, 리소스, 프롬프트 구현
- Docker 컨테이너화 지원

**실행 방법**:

```bash
cd mcp-python-250309
pip install -r requirements.txt
python server.py
```

자세한 내용은 [Python 서버 README](./mcp-python-250309/README.md)를 참조하세요.

### MCP TypeScript 서버 (mcp-typescript-250309)

TypeScript로 구현된 MCP 서버 예제입니다.

**주요 기능**:

- 간단한 덧셈 도구 (`add`) 제공
- 동적 인사말 리소스 (`greeting`) 제공
- Express 서버를 통한 SSE(Server-Sent Events) 연결 지원

**실행 방법**:

```bash
cd mcp-typescript-250309
npm install
npm start
```

자세한 내용은 [TypeScript 서버 README](./mcp-typescript-250309/README.md)를 참조하세요.

## MCP(Machine Control Protocol)란?

MCP는 Cursor IDE와 Agent 간의 통신을 위한 프로토콜로, JSON-RPC 2.0을 기반으로 합니다. 이 프로토콜을 통해 Agent는 도구(Tools), 리소스(Resources), 프롬프트(Prompts) 등을 제공하고, Cursor IDE는 이를 활용하여 다양한 기능을 수행할 수 있습니다.

## 라이센스

MIT
