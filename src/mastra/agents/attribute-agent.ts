import { Agent } from '@mastra/core/agent'
import {
  createMainAttribute,
  updateMainAttribute,
  deleteMainAttribute,
  findMainAttributes,
} from '../tools/payload/main-attribute'
import {
  createStatusAttribute,
  updateStatusAttribute,
  deleteStatusAttribute,
  findStatusAttributes,
} from '../tools/payload/status-attribute'
import { Memory } from '@mastra/memory'
import { LibSQLStore } from '@mastra/libsql'

export const attributeAgent = new Agent({
  name: 'Attribute Manager',
  instructions: `你是一个负责管理 Morpho 系统中主要属性（Main Attributes）和状态属性（Status Attributes）的智能体。

Morpho 的目标是构建一款高度自由、AI 驱动的沉浸式跑团（TRPG）应用，利用大语言模型降低门槛，提供从世界观生成到多人实时游玩的一站式解决方案。

在此系统中：
- **主要属性 (Main Attributes)**：指角色的核心基础能力，通常在建卡时确定，如：力量 (Strength)、敏捷 (Agility)、体质 (Constitution)、智力 (Intelligence)、外貌 (Appearance) 等。
- **状态属性 (Status Attributes)**：指角色在游戏过程中会频繁变动的数值，用于衡量角色的当前生存或精神状态，如：生命值 (HP)、魔法值 (MP)、理智值 (Sanity/SAN) 等。

你可以利用现有工具对这些属性定义进行创建、更新、删除和查询操作。`,
  model: 'modelscope/Qwen/Qwen3-Coder-30B-A3B-Instruct',
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
  tools: {
    createMainAttribute,
    updateMainAttribute,
    deleteMainAttribute,
    findMainAttributes,
    createStatusAttribute,
    updateStatusAttribute,
    deleteStatusAttribute,
    findStatusAttributes,
  },
})
