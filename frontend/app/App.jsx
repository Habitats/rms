import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { ProductProvider } from './contexts/ProductContext'
import { router } from './routes'
import { createQueryClient, QueryDevTools } from './config/queryClient'

const queryClient = createQueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProductProvider>
          <RouterProvider router={router} />
          <QueryDevTools />
        </ProductProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App

