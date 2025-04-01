import React from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'
import Layout from '../containers/Layout.jsx'
import NotFound from '../components/NotFound.jsx'
import Welcome from '../containers/Welcome.jsx'
import Contact from '../containers/Contact.jsx'
import About from '../components/About.jsx'
import References from '../containers/ProjectsContainer.jsx'
import Admin from '../containers/AdminContainer.jsx'
import ProjectContainer from '../containers/ProjectContainer.jsx'
import ProductsContainer from '../containers/ProductsContainer.jsx'
import ProductContainer from '../containers/ProductContainer.jsx'
import CategoryContainer from '../containers/CategoryContainer.jsx'
import ProjectAdd from '../containers/ProjectAdd.jsx'
import ProductAdd from '../components/product/ProductAdd.jsx'
import Login from '../containers/Login.jsx'
import { useAuth } from '../contexts/AuthContext'
import { GeneralApi } from '../api/GeneralApi'
import { SessionApi } from '../api/SessionApi'

// Authentication check
const checkAuth = async () => {
  try {
    const session = await SessionApi.retrieve()
    if (!session.admin) {
      throw new Error('Not authenticated')
    }
    return session
  } catch (error) {
    throw redirect('/login')
  }
}

// Error boundary for routes
const RouteError = () => {
  return (
    <div className="error-container">
      <h1>Oops! Something went wrong</h1>
      <p>Please try again later or contact support if the problem persists.</p>
    </div>
  )
}

// Root loader to provide session data
const rootLoader = async () => {
  try {
    const session = await SessionApi.retrieve()
    return { session }
  } catch (error) {
    return { session: { admin: false, username: null } }
  }
}

// Products loader to provide products data
const productsLoader = async () => {
  try {
    const [productsData, sessionData] = await Promise.all([
      GeneralApi.getProducts(),
      SessionApi.retrieve()
    ])
    
    // Handle different response formats
    let products = productsData

    // If response has data property, use that
    if (productsData && productsData.data) {
      products = productsData.data
    }

    // If response is an array, wrap it in the expected format
    if (Array.isArray(productsData)) {
      products = { sub: productsData }
    }

    // Ensure products has a sub array
    if (!products || !products.sub) {
      console.error('Invalid products data format:', productsData)
      products = { sub: [] }
    }

    return {
      products,
      isAdmin: sessionData?.admin || false
    }
  } catch (error) {
    console.error('Error loading products:', error)
    return { products: { sub: [] }, isAdmin: false }
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteError />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Welcome />,
        errorElement: <NotFound />
      },
      {
        path: "referanser",
        element: <References />,
        errorElement: <NotFound />,
        loader: async () => {
          try {
            const projects = await GeneralApi.getProjects()
            const session = await SessionApi.retrieve()
            return { 
              projects, 
              isAdmin: session.admin 
            }
          } catch (error) {
            console.error('Error loading projects:', error)
            return { projects: [], isAdmin: false }
          }
        }
      },
      {
        path: "referanser/ny",
        element: <ProjectAdd />,
        errorElement: <NotFound />,
        loader: async () => {
          await checkAuth()
          return null
        }
      },
      {
        path: "referanser/endre/:id",
        element: <ProjectAdd />,
        errorElement: <NotFound />,
        loader: async ({ params }) => {
          await checkAuth()
          try {
            const project = await GeneralApi.getProject(params.id)
            return project
          } catch (error) {
            throw new Error('Project not found')
          }
        }
      },
      {
        path: "referanser/:id",
        element: <ProjectContainer />,
        errorElement: <NotFound />,
        loader: async ({ params }) => {
          try {
            const project = await GeneralApi.getProject(params.id)
            return project
          } catch (error) {
            throw new Error('Project not found')
          }
        }
      },
      {
        path: "produkter",
        element: <ProductsContainer />,
        errorElement: <NotFound />,
        loader: productsLoader,
        children: [
          {
            path: ":categoryId",
            element: <CategoryContainer />,
            errorElement: <NotFound />,
            loader: productsLoader
          },
          {
            path: "ny",
            element: <ProductAdd />,
            errorElement: <NotFound />,
            loader: async () => {
              await checkAuth()
              return null
            }
          },
          {
            path: ":productId",
            element: <ProductContainer />,
            errorElement: <NotFound />,
            loader: async ({ params }) => {
              try {
                const product = await GeneralApi.getProduct(params.productId)
                return product
              } catch (error) {
                throw new Error('Product not found')
              }
            }
          }
        ]
      },
      {
        path: "om-oss",
        element: <About />,
        errorElement: <NotFound />
      },
      {
        path: "kontakt",
        element: <Contact />,
        errorElement: <NotFound />
      },
      {
        path: "admin",
        element: <Admin />,
        errorElement: <NotFound />,
        loader: async () => {
          await checkAuth()
          return null
        }
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <NotFound />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]) 