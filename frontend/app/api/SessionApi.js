const baseUrl = '/';
export function newSession() {
  return fetch(`${baseUrl}session`)
    .then(res => {
      if (res.status === 200) {
        return res.json()
      }
      throw new Error(res.info)
    })
}

export function logout(session) {
  return fetch(`${baseUrl}session/logout`, {
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
  return fetch(`${baseUrl}session`, {
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
