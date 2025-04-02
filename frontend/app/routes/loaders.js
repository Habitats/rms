import { redirect } from 'react-router-dom'
import { retrieve } from '../api/SessionApi'
import { 
  getProducts, 
  getProject, 
  getProjects 
} from '../api/GeneralApi'
import { ROUTES } from '../constants'
import { debugRouter } from './index'

/**
 * Authentication check loader
 */
export const checkAuth = async () => {
  try {
    const sessionData = await retrieve()
    return sessionData
  } catch (error) {
    throw redirect(ROUTES.LOGIN)
  }
}

/**
 * Root loader to provide session data
 */
export const rootLoader = async () => {
  try {
    const sessionData = await retrieve()
    return { session: sessionData }
  } catch (error) {
    return { session: { admin: false, username: null } }
  }
}

/**
 * Project loader
 */
export const projectLoader = async ({ params }) => {
  console.log('Project loader called with params:', params);
  try {
    const projectData = await getProject(params.id);
    console.log('Project data received:', projectData);
    
    // Check if we got a valid project
    if (!projectData || !projectData.id) {
      console.log('Invalid project data, trying debug router');
      // Try the debug router as a fallback
      const debugProject = await debugRouter.fetchProject(params.id);
      if (debugProject) {
        console.log('Using debug project data');
        return debugProject;
      }
    }
    
    return projectData;
  } catch (error) {
    console.error('Error loading project:', error);
    
    // Try the debug router as a fallback on error
    try {
      console.log('Trying debug router fallback');
      const debugProject = await debugRouter.fetchProject(params.id);
      if (debugProject) {
        console.log('Using debug project data after error');
        return debugProject;
      }
    } catch (debugError) {
      console.error('Debug router also failed:', debugError);
    }
    
    // If all else fails, return null to show NotFound
    return null;
  }
}

/**
 * Products loader
 */
export const productsLoader = async () => {
  try {
    const [productsData, sessionData] = await Promise.all([
      getProducts(),
      retrieve()
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

/**
 * Category loader
 */
export const categoryLoader = async ({ params }) => {
  try {
    const categoryData = await GeneralApi.getCategory(params.categoryId)
    return categoryData
  } catch (error) {
    throw new Error('Category not found')
  }
}

/**
 * Product loader
 */
export const productLoader = async ({ params }) => {
  try {
    const productData = await GeneralApi.getProduct(params.productId)
    return productData
  } catch (error) {
    throw new Error('Product not found')
  }
}

/**
 * Projects loader
 */
export const projectsLoader = async () => {
  try {
    const [projectsData, sessionData] = await Promise.all([
      getProjects(),
      retrieve()
    ])
    
    // Handle different response formats
    const projects = Array.isArray(projectsData) 
      ? projectsData 
      : projectsData?.data || []
    
    return {
      projects,
      isAdmin: sessionData?.admin || false
    }
  } catch (error) {
    console.error('Error loading projects:', error)
    return { projects: [], isAdmin: false }
  }
} 