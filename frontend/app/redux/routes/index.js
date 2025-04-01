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
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Welcome />,
        errorElement: <NotFound />
      },
      {
        path: "referanser",
        element: <References />,
        errorElement: <NotFound />
      },
      {
        path: "referanser/ny",
        element: <ProjectAdd />,
        loader: requireLogin,
        errorElement: <NotFound />
      },
      {
        path: "referanser/endre/:id",
        element: <ProjectAdd />,
        loader: requireLogin,
        errorElement: <NotFound />
      },
      {
        path: "admin",
        element: <Admin />,
        errorElement: <NotFound />
      },
      {
        path: "referanser/:id",
        element: <ProjectContainer />,
        errorElement: <NotFound />
      },
      {
        path: "produkter",
        element: <ProductsContainer />,
        errorElement: <NotFound />,
        children: [
          {
            path: ":categoryId",
            element: <CategoryContainer />,
            errorElement: <NotFound />
          },
          {
            path: ":categoryId/:productId",
            element: <ProductContainer />,
            errorElement: <NotFound />
          },
          {
            path: ":categoryId/:productId/:subId",
            element: <ProductContainer />,
            errorElement: <NotFound />
          },
          {
            path: ":categoryId/:productId/:subId/:subSubId",
            element: <ProductContainer />,
            errorElement: <NotFound />
          }
        ]
      },
      {
        path: "produkter/ny",
        element: <ProductAdd />,
        errorElement: <NotFound />
      },
      {
        path: "produkter/endre/:productId",
        element: <ProductAdd />,
        errorElement: <NotFound />
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
