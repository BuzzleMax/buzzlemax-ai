import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { processChatRequest } from './src/server/sales-engine'

function buzzlemaxChatApiPlugin(): Plugin {
  const handler = (req: any, res: any, next: any) => {
    if (req.url === '/api/chat' && req.method === 'POST') {
      let body = ''
      req.on('data', (chunk: Buffer) => {
        body += chunk.toString()
      })
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}')
          const clientIp =
            (req.headers['x-forwarded-for'] as string) ||
            req.socket?.remoteAddress ||
            '127.0.0.1'
          const result = await processChatRequest(parsed.messages || [], clientIp)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        } catch (err) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              message:
                'Something went wrong on my side. You can still reach the BuzzleMax team through the contact form.',
              leadCaptureRecommended: true,
            })
          )
        }
      })
      return
    }
    next()
  }

  return {
    name: 'buzzlemax-chat-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), buzzlemaxChatApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})