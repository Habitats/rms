const baseUrl = '/'

export function getProjects() {
  return retrieve('projects')
}

export function getProject(id) {
  return retrieve(`project/${id}`)
}

export function getImages() {
  return retrieve('images')
}

export function getPrivates() {
  return retrieve('privates')
}

export function getProducts() {
  return retrieve('products')
}

export function save(project) {
  return post(project, 'secret')
}

export function saveProduct(product) {
  return post(product, 'secret/product')
}

export function sendMail(email) {
  return post(email, 'mail')
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

function parseJson(res) {
  if (res.status === 200) {
    return res.json()
  }
  throw new Error(res.info)
}

export function remove(project) {
  let url = `${baseUrl}${project.get('id')}`
  return fetch(url, {
    method: 'delete'
  }).then(parseJson)
}