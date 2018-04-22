const taapi = {
  path(path) {
    return `https://timeline-analyzer-api.herokuapp.com/api/v1/${path}`;
  },

  post(resource, params) {
    return fetch(this.path(resource), {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .catch(console.error);
  },

  authenticate(code) {
    return this.post('auth', { code });
  },

  connectRepo(stuff) {
    return this.post('projects', stuff);
  },
};

export default taapi;
