const baseUrl = '/';

export function retrieve() {
  return fetch(`${baseUrl}session`)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error(res.info);
    });
}

function post(session, path) {
  return fetch(`${baseUrl}session/${path}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(session)
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error(res.info);
  });
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


