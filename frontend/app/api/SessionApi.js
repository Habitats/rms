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

export function logout(user) {
  return fetch(`${baseUrl}session/logout`, {
    method: 'post',
    body: user
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error(res.info);
  });
}

export function save(session) {
  return fetch(`${baseUrl}session`, {
    method: 'post',
    body: JSON.stringify({
      ...session,
      modified: new Date().getMilliseconds()
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error(res.info);
  });
}
