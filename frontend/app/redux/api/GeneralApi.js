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
  return retrieve('api/products')
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
  return fetch(`${baseUrl}${path}`, {
    method: 'GET',
    credentials: 'include'
  }).then(parseJson)
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
  throw new Error(res.info)
}
