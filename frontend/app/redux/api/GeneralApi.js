const baseUrl = '/'

export function getProjects() {
  return retrieve('api/projects')
}

export function getProject(id) {
  return retrieve(`api/project/${id}`)
}

export function getImages() {
  return retrieve('api/images')
}

export function invalidateImageCache() {
  return retrieve('secret/invalidate')
}

export function getPrivates() {
  return retrieve('api/privates')
}

export function getProducts() {
  console.log('API: Fetching products')
  return retrieve('api/products')
    .then(data => {
      console.log('API: Products fetched successfully:', data)
      return data
    })
    .catch(error => {
      console.error('API: Error fetching products:', error)
      throw error
    })
}

export function saveProject(project) {
  return post(project, 'secret/project')
}

export function removeProject(project) {
  return remove(project, 'secret/project')
}

export function removeProduct(product) {
  return remove(product, 'secret/product')
}

export function saveProduct(product) {
  return post(product, 'secret/product')
}

export function sendMail(email) {
  return post(email, 'api/mail')
}

export function retrieve(path) {
  console.log('API: Making request to:', path)
  return fetch(`${baseUrl}${path}`, {
    method: 'GET',
    credentials: 'include'
  }).then(response => {
    console.log('API: Response status:', response.status)
    return parseJson(response)
  })
}

function post(body, path) {
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(parseJson)
}

function remove(body, path) {
  return fetch(`${baseUrl}${path}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(parseJson)
}

function parseJson(res) {
  if (res.status === 200) {
    return res.json()
  }
  console.error('API: Error response:', res)
  throw new Error(`API Error: ${res.status} ${res.statusText}`)
}
