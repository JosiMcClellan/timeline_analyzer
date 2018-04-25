const taapi = {

  basePath: 'https://timeline-analyzer-api.herokuapp.com',
  defaultHeaders: { 'Content-Type': 'application/json' },

  fetch(path, { headers, token, ...config }) {
    config.headers = { ...this.defaultHeaders, ...headers };
    if (token) config.headers.Authorization = token;
    return fetch(this.basePath + path, config)
      .then(res => res.json())
      .catch(console.error);
  },

  send(path, { body, ...rest }) {
    return this.fetch(path, {
      method: 'POST',
      body: JSON.stringify(body),
      ...rest,
    });
  },

  getProject(token, projectId) {
    return this.fetch(`/api/v1/projects/${projectId}`, { token });
  },

  authenticate(code) {
    return this.send('/auth', {
      body: { code },
    });
  },

  connectRepo(repo) {
    return this.send('/api/v1/projects', {
      body: repo,
    });
  },

  addUserHeroku(token, code) {
    return this.send('/api/v1/users/heroku', {
      token,
      method: 'PATCH',
      body: { code },
    });
  },

  addProjectHeroku(token, projectId, herokuSlug) {
    return this.send(`/api/v1/projects/${projectId}/heroku`, {
      token,
      method: 'PATCH',
      body: { herokuSlug },
    });
  },
};

export default taapi;
