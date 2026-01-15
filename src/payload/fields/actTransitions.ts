import type { Field } from 'payload'

export const actTransitions = (): Field => {
  return {
    name: 'actTransitions',
    type: 'array',
    label: '转幕条件',
    fields: [
      {
        name: 'from',
        type: 'text',
        label: 'From (幕次名)',
        required: true,
        admin: {
          description: '请输入起始幕次名称',
        },
      },
      {
        name: 'to',
        type: 'text',
        label: 'To (幕次名)',
        required: true,
        admin: {
          description: '请输入目标幕次名称',
        },
      },
      {
        name: 'conditionAnchor',
        type: 'textarea',
        label: '条件锚点',
        required: true,
        admin: {
          description:
            '提示词，剧情满足锚点时推进到下一个阶段，例如玩家获得某个关键道具，或导致某个 NPC死亡等确定性事件',
        },
      },
      {
        name: 'generateHistory',
        type: 'textarea',
        label: '产生的历史',
        admin: {
          description: '触发锚点时，历史会被 append 到上下文中',
        },
      },
    ],
  }
}
