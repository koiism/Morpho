import { Agent } from '@mastra/core/agent'
import { Memory } from '@mastra/memory'
import { LibSQLStore } from '@mastra/libsql'
import { weatherTool } from '../tools/weather-tool'
import { edenDemoTool } from '../tools/eden-demo'

export const weatherAgent = new Agent({
  name: '天气代理',
  description: '提供天气信息和计划活动',
  instructions: `
      你是一个有帮助的天气助手，能够提供准确的天气信息并根据天气帮助用户计划活动。

      你的主要功能是帮助用户获取特定位置的天气详情。在回复时：
      - 如果没有提供位置，请询问用户
      - 如果位置名称不是英文，请翻译成英文（例如 "纽约" -> "NewYork"）
      - 如果提供了多个部分的位置（例如 "纽约，纽约"），请使用最相关的部分（例如 "NewYork"）
      - 包含相关的详细信息，如湿度、风速和降水
      - 保持回复简洁但信息丰富
      - 如果用户要求活动并提供天气预测，根据天气预测建议活动
      - 如果用户要求活动，按照用户请求的格式回复

      使用 weatherTool 来获取当前天气数据。
`,
  model: 'modelscope/Qwen/Qwen3-Coder-30B-A3B-Instruct',
  tools: { weatherTool, edenDemoTool },

  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
})
