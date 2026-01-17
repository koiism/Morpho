import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from '@copilotkit/runtime'
import { NextRequest } from 'next/server'
import { MastraAgent } from '@ag-ui/mastra'
import { mastra } from '@/mastra'

const serviceAdapter = new ExperimentalEmptyAdapter()

export const POST = async (req: NextRequest) => {
  const runtime = new CopilotRuntime({
    // @ts-expect-error - ignore for now, typing error
    agents: MastraAgent.getLocalAgents({ mastra }),
  })
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: '/api/copilotkit',
  })

  return handleRequest(req)
}
