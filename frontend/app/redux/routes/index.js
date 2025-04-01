import React from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'
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

// Authentication check
const checkAuth = async () => {
  try {
    const response = await fetch('/api/session', {
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw redirect('/login');
  }
};

// Error boundary for routes
const RouteError = () => {
  return (
    <div className="error-container">
      <h1>Oops! Something went wrong</h1>
      <p>Please try again later or contact support if the problem persists.</p>
    </div>
  );
};

// Root loader to provide session data
const rootLoader = async () => {
  try {
    const response = await fetch('/api/session', {
      credentials: 'include'
    });
    const session = await response.json();
    return { session };
  } catch (error) {
    return { session: { admin: false, username: null } };
  }
};

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
        errorElement: <NotFound />,
        loader: async () => {
          try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Failed to load products');
            const categories = await response.json();
            return {
              categories,
              loading: false,
              error: null
            };
          } catch (error) {
            console.error('Error loading products:', error);
            return {
              categories: null,
              loading: false,
              error: error.message
            };
          }
        }
      },
      {
        path: "referanser",
        element: <References />,
        errorElement: <NotFound />,
        loader: async () => {
          try {
            // Load projects data
            const projectsResponse = await fetch('/api/projects');
            if (!projectsResponse.ok) throw new Error('Failed to load projects');
            const projects = await projectsResponse.json();

            // Check admin status
            let isAdmin = false;
            try {
              const sessionResponse = await fetch('/api/session', {
                credentials: 'include'
              });
              if (sessionResponse.ok) {
                const sessionData = await sessionResponse.json();
                isAdmin = sessionData.admin;
              }
            } catch (error) {
              console.error('Error checking admin status:', error);
            }

            return { projects, isAdmin };
          } catch (error) {
            console.error('Error loading projects:', error);
            return { projects: [], isAdmin: false };
          }
        }
      },
      {
        path: "referanser/ny",
        element: <ProjectAdd />,
        errorElement: <NotFound />,
        loader: async () => {
          // Check authentication and load necessary data
          await checkAuth();
          return null;
        }
      },
      {
        path: "referanser/endre/:id",
        element: <ProjectAdd />,
        errorElement: <NotFound />,
        loader: async ({ params }) => {
          await checkAuth();
          // Load project data
          try {
            const response = await fetch(`/api/projects/${params.id}`);
            if (!response.ok) throw new Error('Failed to load project');
            return response.json();
          } catch (error) {
            throw new Error('Project not found');
          }
        }
      },
      {
        path: "referanser/:id",
        element: <ProjectContainer />,
        errorElement: <NotFound />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`/api/projects/${params.id}`);
            if (!response.ok) throw new Error('Failed to load project');
            return response.json();
          } catch (error) {
            throw new Error('Project not found');
          }
        }
      },
      {
        path: "produkter",
        element: <ProductsContainer />,
        errorElement: <NotFound />,
        loader: async () => {
          try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Failed to load products');
            return response.json();
          } catch (error) {
            console.error('Error loading products:', error);
            return null;
          }
        }
      },
      {
        path: "produkter/ny",
        element: <ProductAdd />,
        errorElement: <NotFound />,
        loader: async () => {
          await checkAuth();
          return null;
        }
      },
      {
        path: "produkter/:categoryId",
        element: <CategoryContainer />,
        errorElement: <NotFound />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`/api/categories/${params.categoryId}`);
            if (!response.ok) throw new Error('Failed to load category');
            return response.json();
          } catch (error) {
            throw new Error('Category not found');
          }
        }
      },
      {
        path: "produkter/:categoryId/:productId",
        element: <ProductContainer />,
        errorElement: <NotFound />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`/api/products/${params.productId}`);
            if (!response.ok) throw new Error('Failed to load product');
            return response.json();
          } catch (error) {
            throw new Error('Product not found');
          }
        }
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
          await checkAuth();
          return null;
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
