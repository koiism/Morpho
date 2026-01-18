import { Mastra } from '@mastra/core/mastra'
import { PinoLogger } from '@mastra/loggers'
import { worldsAgent } from './agents/payload-agents'
import { MongoDBStore } from '@mastra/mongodb'

export const mastra = new Mastra({
  workflows: {},
  agents: {
    default: worldsAgent,
  },
  storage: new MongoDBStore({
    url: process.env.MONGODB_URI!,
    dbName: process.env.MONGODB_DB_NAME!,
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  telemetry: {
    // Telemetry is deprecated and will be removed in the Nov 4th release
    enabled: false,
  },
  observability: {
    // Enables DefaultExporter and CloudExporter for AI tracing
    default: { enabled: true },
  },
})
