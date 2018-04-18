const taapi = {
  path(path) {
    return `http://localhost:3000/api/v1/${path}`;
  },

  post(resource, params) {
    return fetch(this.path(resource), {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
  },

  authenticate(code) {
    return this.post('auth', { code });
  },

  findOrCreateProjectWithUser(params) {
    return this.post('projects', { params });
  },
};

export default taapi;
