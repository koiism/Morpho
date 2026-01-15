export interface GameItem {
  title: string
  description: string
  type: 'game' | 'character' | 'world' | 'script'
  status?: 'active' | 'archived' | 'draft'
  lastPlayed: string
}

export const mockData = {
  games: {
    active: [
      {
        title: '印斯茅斯的阴影',
        description: '在一个隐藏着黑暗秘密的海滨小镇进行调查。',
        type: 'game',
        status: 'active',
        lastPlayed: '2小时前',
      },
      {
        title: '赛博朋克：霓虹雨',
        description: '第4区的高风险抢劫任务。',
        type: 'game',
        status: 'active',
        lastPlayed: '1天前',
      },
    ] as GameItem[],
    archived: [
      {
        title: '凡达林失落的矿坑',
        description: '经典的冒险已完成。',
        type: 'game',
        status: 'archived',
        lastPlayed: '2个月前',
      },
    ] as GameItem[],
  },
  characters: [
    {
      title: '智者埃尔德里克',
      description: '人类法师，5级',
      type: 'character',
      lastPlayed: '2小时前',
    },
    {
      title: '凯尔',
      description: '精灵游荡者，3级',
      type: 'character',
      lastPlayed: '1周前',
    },
  ] as GameItem[],
  worlds: [
    {
      title: '艾瑟瑞亚',
      description: '一个由浮空岛屿和飞艇构成的世界。',
      type: 'world',
      status: 'active',
      lastPlayed: '3天前',
    },
  ] as GameItem[],
  scripts: [
    {
      title: '失踪的商人',
      description: '一个适合低级队伍的简单谜团。',
      type: 'script',
      status: 'draft',
      lastPlayed: '1个月前',
    },
  ] as GameItem[],
}
