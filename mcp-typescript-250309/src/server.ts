import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

let transport: SSEServerTransport;

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
console.log("서버에 add 도구를 등록합니다...");
// 도구 이름: add
// 설명: 두 숫자를 더합니다
// 매개변수:
//   - a: 첫 번째 숫자
//   - b: 두 번째 숫자
// 반환값: 두 숫자의 합
server.tool(
  "add",
  { 
    a: z.number(),
    b: z.number()
  },
  async ({ a, b }) => {
    console.log(`[ADD TOOL] 입력값: a=${a}, b=${b}`);
    const result = a + b;
    console.log(`[ADD TOOL] 결과: ${result}`);
    return {
      content: [{ type: "text", text: String(result) }]
    };
  }
);

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
// const transport = new StdioServerTransport();
// await server.connect(transport);


const app = express();

app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  // Note: to support multiple simultaneous connections, these messages will
  // need to be routed to a specific matching transport. (This logic isn't
  // implemented here, for simplicity.)
  await transport.handlePostMessage(req, res);
});

app.listen(8001, () => {
  console.log("서버가 8001 포트에서 실행 중입니다.");
  console.log("add 도구를 테스트하려면 클라이언트에서 연결하세요.");
  
  // 서버 시작 시 add 도구 테스트
  // console.log("add 도구 자동 테스트를 시작합니다...");
  // setTimeout(async () => {
  //   try {
  //     // add 도구를 직접 호출하여 테스트
  //     const testParams = { a: 1, b: 5 };
  //     console.log(`테스트 파라미터: a=${testParams.a}, b=${testParams.b}`);
      
  //     // 테스트용 함수 직접 호출
  //     const testAddFn = async ({ a, b }) => {
  //       console.log(`[ADD TOOL] 입력값: a=${a}, b=${b}`);
  //       const result = a + b;
  //       console.log(`[ADD TOOL] 결과: ${result}`);
  //       return {
  //         content: [{ type: "text", text: String(result) }]
  //       };
  //     };
      
  //     const result = await testAddFn(testParams);
  //     console.log("테스트 결과:", result);
  //   } catch (error) {
  //     console.error("테스트 중 오류 발생:", error);
  //   }
  // }, 1000); // 1초 후 테스트 실행
});