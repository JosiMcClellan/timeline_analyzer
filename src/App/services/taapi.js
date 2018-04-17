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

  findOrCreateUser(params) {
    return this.post('users', params);
  },

  createProject(params) {
    return this.post('projects', params);
  },

  // getProject return fetch(this.path('project'))
};

export default taapi;
