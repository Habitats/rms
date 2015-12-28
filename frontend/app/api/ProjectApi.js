const baseUrl = '/';
export function getProjects() {
  return fetch(`${baseUrl}projects`)
    .then(res => {
      if (res.status === 200) {
        return res.json()
      }
      throw res.info
    })
    .catch(ex => console.log(ex))
}

export function getImages() {
  return fetch(`${baseUrl}images`)
    .then(res => {
      if (res.status === 200) {
        return res.json()
      }
      throw res.info
    })
    .catch(ex => console.log(ex))
}

export function getPrivates() {
  return fetch(`${baseUrl}privates`)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }

      throw res.info;
    })
    .catch(ex => console.log(ex))
}

export function save(project) {
  return fetch(`${baseUrl}secret`, {
    method: 'post',
    body: project
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }

      throw res.info;
    })
    .catch(ex => console.log(ex))
}

export function sendMail(email) {
  return fetch(baseUrl + 'mail', {
      body: email,
      method: 'post'
    }
  ).then(res => {
    if (res.status === 200) {
      return res.body;
    }
    throw res.info;
  });
}

export function remove(project) {
  let url = `${baseUrl}${project.get('id')}`;
  return fetch(url, {
    method: 'delete'
  }).then(res => {
    if (res.info.ok) {
      return project;
    }
    throw res.info;
  });
}