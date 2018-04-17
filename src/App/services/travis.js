const travis = {
  urlBase: 'https://api.travis-ci.org',
  headers: {
    // 'User-Agent': 'API Explorer',
    'Travis-API-Version': 3,
    // Authorization: `token ...`,
  },

  getBuilds(id) {
    const { urlBase, headers, clean } = this;
    const url = `${urlBase}/repo/${id}/builds?limit=15`;
    return fetch(url, { headers }).then(r => r.json()).then(clean);
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
