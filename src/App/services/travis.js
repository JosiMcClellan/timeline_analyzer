import exampleJson from './builds.json';

const travis = {
  urlBase: 'https://api.travis-ci.org',

  headers(_token) {
    return ({
    // 'User-Agent': 'API Explorer',
      'Travis-API-Version': 3,
    // Authorization: `token ${token}`,
    });
  },

  getBuilds(_id, _token) {
    return Promise.resolve(this.clean(exampleJson));
    // const { headers, clean } = this;
    // const url = `${this.urlBase}/repo/${id}/builds?limit=15`;
    // return fetch(url, { headers: headers(token) })
    // .then(r => r.json())
    // .then(this.clean);
  },

  clean({ builds }) {
    return builds.map(raw => ({
      id: raw.id,
      duration: raw.duration,
      timestamp: raw.started_at,
      status: raw.state,
      repoSlug: raw.repository.slug,
      branchName: raw.branch.name,
    }));
  },

};

export default travis;
