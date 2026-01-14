import { ChatPageContent } from './page-client'

export default async function ChatPage() {
  const response = await fetch('http://localhost:3000/api/chat')
  const messages = await response.json()

  return <ChatPageContent initialMessages={messages} />
}
