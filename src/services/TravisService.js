const travisService = {
  baseUrl: 'https://api.travis-ci.org',
  headers: {
    // 'User-Agent': 'API Explorer',
    'Travis-API-Version': 3,
    // Authorization: `token ...`,
  },
  fetch(owner, repo) {
    return fetch(this.buildsUrl(owner, repo), { headers: this.headers })
      .then(r => r.json())
      .then(this.distill);
  },
  buildsUrl(owner, repo) {
    return `${this.baseUrl}/repo/${owner}%2F${repo}/builds?limit=5`;
  },
  distill({ builds }) {
    return builds.map(rawBuild => ({
      id: rawBuild.id,
      duration: rawBuild.duration,
      timestamp: rawBuild.started_at,
      status: rawBuild.state,
      repoSlug: rawBuild.repository.slug,
      branchName: rawBuild.branch.name,
    }));
  },
};

export default travisService;
