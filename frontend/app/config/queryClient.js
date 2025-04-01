import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const isDevelopment = process.env.NODE_ENV === 'development'

export function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  })

  // Enable React Query DevTools in development
  if (isDevelopment) {
    queryClient.setDefaultOptions({
      queries: {
        ...queryClient.getDefaultOptions().queries,
        refetchOnWindowFocus: false,
      },
    })
  }

  return queryClient
}

export function QueryDevTools() {
  if (isDevelopment) {
    return <ReactQueryDevtools initialIsOpen={false} />
  }
  return null
} 