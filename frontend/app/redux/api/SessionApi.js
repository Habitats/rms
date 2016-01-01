const baseUrl = '/'

export function retrieve() {
  return fetch(`${baseUrl}session`, {
    method: 'GET',
    credentials: 'include'
  }).then(parseJson)
}

function post(session, path) {
  return fetch(`${baseUrl}session/${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(session)
  }).then(parseJson)
}

function parseJson(res) {
  if (res.status === 200) {
    return res.json()
  }
  throw new Error(res.info)
}

export function save(session) {
  return post(session, "")
}

export function logout(session) {
  return post(session, "logout")
}

export function login(session) {
  return post(session, "login")
}


