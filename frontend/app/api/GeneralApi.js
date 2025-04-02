const baseUrl = '/'

/**
 * Generic API response type
 * @template T
 * @typedef {Object} ApiResponse
 * @property {T} data - The response data
 * @property {string} [error] - Error message if any
 */

/**
 * Generic API error type
 * @typedef {Object} ApiError
 * @property {string} message - Error message
 * @property {number} status - HTTP status code
 */

/**
 * Fetches all projects
 * @returns {Promise<ApiResponse<Array>>}
 */
export async function getProjects() {
  return retrieve('api/projects')
}

/**
 * Fetches a single project by ID
 * @param {string} id - Project ID
 * @returns {Promise<ApiResponse<Object>>}
 */
export async function getProject(id) {
  console.log('API: Fetching project with ID:', id);
  try {
    // Try the new API endpoint format first
    let response = await fetch(`${baseUrl}api/projects/${id}`, {
      method: 'GET',
      credentials: 'include'
    });
    
    // If that fails, try the old format
    if (!response.ok) {
      console.log('API: First endpoint failed, trying alternative endpoint');
      response = await fetch(`${baseUrl}api/project/${id}`, {
        method: 'GET',
        credentials: 'include'
      });
    }
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API: Project data:', data);
    return data;
  } catch (error) {
    console.error('API: Error fetching project:', error);
    throw error;
  }
}

/**
 * Fetches all images
 * @returns {Promise<ApiResponse<Array>>}
 */
export async function getImages() {
  return retrieve('api/images')
}

/**
 * Invalidates the image cache
 * @returns {Promise<ApiResponse<Object>>}
 */
export async function invalidateImageCache() {
  return retrieve('secret/invalidate')
}

/**
 * Fetches private content
 * @returns {Promise<ApiResponse<Array>>}
 */
export async function getPrivates() {
  return retrieve('api/privates')
}

/**
 * Fetches all products
 * @returns {Promise<ApiResponse<Array>>}
 */
export async function getProducts() {
  try {
    const response = await retrieve('api/products')
    console.log('API: Products response:', response)
    
    // If response is already in the correct format, return it
    if (response && response.hasOwnProperty('sub')) {
      return response
    }
    
    // If response has data property, return that
    if (response && response.data) {
      return response.data
    }
    
    // If response is an array, wrap it in the expected format
    if (Array.isArray(response)) {
      return { sub: response }
    }
    
    throw new Error('Invalid response format from API')
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

/**
 * Fetches a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<ApiResponse<Object>>}
 */
export async function getProduct(id) {
  return retrieve(`api/products/${id}`)
}

/**
 * Saves a project
 * @param {Object} project - Project data
 * @returns {Promise<ApiResponse<Object>>}
 */
export async function saveProject(project) {
  return post(project, 'secret/project')
}

/**
 * Removes a project
 * @param {Object} project - Project data
 * @returns {Promise<ApiResponse<Object>>}
 */
export async function removeProject(project) {
  return remove(project, 'secret/project')
}

/**
 * Removes a product
 * @param {Object} product - Product data
 * @returns {Promise<ApiResponse<Object>>}
 */
export async function removeProduct(product) {
  return remove(product, 'secret/product')
}

/**
 * Saves a product
 * @param {Object} product - Product data
 * @returns {Promise<ApiResponse<Object>>}
 */
export async function saveProduct(product) {
  return post(product, 'secret/product')
}

/**
 * Sends an email
 * @param {Object} email - Email data
 * @returns {Promise<ApiResponse<Object>>}
 */
export async function sendMail(email) {
  return post(email, 'api/mail')
}

/**
 * Generic GET request
 * @param {string} path - API endpoint path
 * @returns {Promise<ApiResponse<Object>>}
 */
async function retrieve(path) {
  console.log('API: Making request to:', path)
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'GET',
      credentials: 'include'
    })
    console.log('API: Response status:', response.status)
    return parseJson(response)
  } catch (error) {
    console.error('API: Request failed:', error)
    throw error
  }
}

/**
 * Generic POST request
 * @param {Object} body - Request body
 * @param {string} path - API endpoint path
 * @returns {Promise<ApiResponse<Object>>}
 */
async function post(body, path) {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return parseJson(response)
  } catch (error) {
    console.error('API: POST request failed:', error)
    throw error
  }
}

/**
 * Generic DELETE request
 * @param {Object} body - Request body
 * @param {string} path - API endpoint path
 * @returns {Promise<ApiResponse<Object>>}
 */
async function remove(body, path) {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return parseJson(response)
  } catch (error) {
    console.error('API: DELETE request failed:', error)
    throw error
  }
}

/**
 * Parses JSON response
 * @param {Response} res - Fetch Response object
 * @returns {Promise<ApiResponse<Object>>}
 * @throws {ApiError}
 */
async function parseJson(res) {
  if (res.status === 200) {
    const data = await res.json()
    console.log('API: Parsed response:', data)
    return data
  }
  console.error('API: Error response:', res)
  throw new Error(`API Error: ${res.status} ${res.statusText}`)
} 