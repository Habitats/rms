import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../../containers/Layout.jsx'
import NotFound from '../../components/NotFound.jsx'
import Welcome from '../../containers/Welcome.jsx'
import Contact from '../../containers/Contact.jsx'
import About from '../../components/About.jsx'
import References from '../../containers/ProjectsContainer.jsx'
import Admin from '../../containers/AdminContainer.jsx'
import ProjectContainer from '../../containers/ProjectContainer.jsx'
import ProductsContainer from '../../containers/ProductsContainer.jsx'
import ProductContainer from '../../containers/ProductContainer.jsx'
import CategoryContainer from '../../containers/CategoryContainer.jsx'
import ProjectAdd from '../../containers/ProjectAdd.jsx'
import ProductAdd from '../../components/product/ProductAdd.jsx'
import Login from '../../containers/Login.jsx'

// Authentication middleware
const requireLogin = async () => {
  // Modern auth check implementation
  const isAuthenticated = false // Replace with your auth logic
  if (!isAuthenticated) {
    throw new Response("Unauthorized", { status: 401 })
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />, // Global error boundary
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: "referanser",
        element: <References />,
      },
      {
        path: "referanser/ny",
        element: <ProjectAdd />,
        loader: requireLogin,
      },
      {
        path: "referanser/endre/:id",
        element: <ProjectAdd />,
        loader: requireLogin
      },
      {
        path: "admin",
        element: <Admin />
      },
      {
        path: "referanser/:id",
        element: <ProjectContainer />
      },
      {
        path: "produkter",
        element: <ProductsContainer />,
        children: [
          {
            path: ":categoryId",
            element: <CategoryContainer />
          },
          {
            path: ":categoryId/:productId",
            element: <ProductContainer />
          },
          {
            path: ":categoryId/:productId/:subId",
            element: <ProductContainer />
          },
          {
            path: ":categoryId/:productId/:subId/:subSubId",
            element: <ProductContainer />
          }
        ]
      },
      {
        path: "produkter/ny",
        element: <ProductAdd />
      },
      {
        path: "produkter/endre/:productId",
        element: <ProductAdd />
      },
      {
        path: "om",
        element: <About />
      },
      {
        path: "kontakt",
        element: <Contact />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])
