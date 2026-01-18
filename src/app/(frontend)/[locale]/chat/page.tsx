import { getServerSideURL } from '@/lib/getURL'
import { ChatPageContent } from './page-client'

export default async function ChatPage() {
  const response = await fetch(`${getServerSideURL()}/api/chat`)
  const messages = await response.json()

  return <ChatPageContent initialMessages={messages} />
}
