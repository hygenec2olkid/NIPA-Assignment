import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
