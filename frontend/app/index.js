import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import { router } from './routes'
import theme from './theme'
import GlobalStyle from './GlobalStyle'
import './config/fontawesome'
import './scss/base.scss'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Custom shouldForwardProp function
const shouldForwardProp = prop => {
  // List of props that should not be forwarded to DOM elements
  const propsToFilter = ['isSmall', 'isMedium'];
  return isPropValid(prop) && !propsToFilter.includes(prop);
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyleSheetManager>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
