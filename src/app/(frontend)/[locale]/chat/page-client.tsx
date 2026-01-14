'use client'

import { AssistantRuntimeProvider, makeAssistantToolUI } from '@assistant-ui/react'
import {
  AssistantChatTransport,
  useChatRuntime,
  UseChatRuntimeOptions,
} from '@assistant-ui/react-ai-sdk'

import { WeatherCard, WeatherCardProps } from '@/components/weather-card'
import { Thread } from '@/components/assistant-ui/thread'

const WeatherToolUI = makeAssistantToolUI({
  toolName: 'weatherTool',
  render: ({ result }) => {
    return <WeatherCard {...(result as WeatherCardProps)} />
  },
})

export function ChatPageContent({
  initialMessages,
}: {
  initialMessages: UseChatRuntimeOptions['messages']
}) {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: '/api/chat',
    }),
    messages: initialMessages,
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-screen w-full flex-col bg-background p-4">
        <Thread />
        <WeatherToolUI />
      </div>
    </AssistantRuntimeProvider>
  )
}
