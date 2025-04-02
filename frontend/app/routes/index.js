import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
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
import { ROUTES } from '../constants'
import {
  rootLoader,
  checkAuth,
  projectLoader,
  productsLoader,
  categoryLoader,
  productLoader,
  projectsLoader
} from './loaders'

// Error boundary for routes
const RouteError = () => {
  return (
    <div className="error-container">
      <h1>Oops! Something went wrong</h1>
      <p>Please try again later or contact support if the problem persists.</p>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
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
        loader: projectsLoader
      },
      {
        path: "referanser/ny",
        element: <ProjectAdd />,
        errorElement: <NotFound />,
        loader: checkAuth
      },
      {
        path: "referanser/endre/:id",
        element: <ProjectAdd />,
        errorElement: <NotFound />,
        loader: async (args) => {
          await checkAuth()
          return projectLoader(args)
        }
      },
      {
        path: "referanser/:id",
        element: <ProjectContainer />,
        errorElement: <NotFound />,
        loader: projectLoader
      },
      {
        path: "produkter",
        element: <ProductsContainer />,
        errorElement: <NotFound />,
        loader: productsLoader,
        children: [
          {
            path: "ny",
            element: <ProductAdd />,
            errorElement: <NotFound />,
            loader: checkAuth
          },
          {
            path: "endre/:productId",
            element: <ProductAdd />,
            errorElement: <NotFound />,
            loader: async (args) => {
              await checkAuth()
              return productLoader(args)
            }
          },
          {
            path: ":categoryId",
            element: <CategoryContainer />,
            errorElement: <NotFound />,
            loader: categoryLoader,
            children: [
              {
                path: ":productId",
                element: <ProductContainer />,
                errorElement: <NotFound />,
                loader: productLoader,
                children: [
                  {
                    path: ":subId",
                    element: <ProductContainer />,
                    errorElement: <NotFound />,
                    loader: productLoader,
                    children: [
                      {
                        path: ":subSubId",
                        element: <ProductContainer />,
                        errorElement: <NotFound />,
                        loader: productLoader
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: "admin",
        element: <Admin />,
        errorElement: <NotFound />,
        loader: checkAuth
      },
      {
        path: "om",
        element: <About />,
        errorElement: <NotFound />
      },
      {
        path: "kontakt",
        element: <Contact />,
        errorElement: <NotFound />
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