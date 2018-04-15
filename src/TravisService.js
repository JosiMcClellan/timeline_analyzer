const travisService = {
  baseUrl: 'https://api.travis-ci.org',
  headers: {
    // 'User-Agent': 'API Explorer',
    'Travis-API-Version': 3,
    // Authorization: `token ...`,
  },
  fetch: (owner, repo) => (
    fetch(this.a.buildsUrl(owner, repo), { headers: this.a.headers })
      .then(this.a.parse)
      .then(this.a.distill)
      // .then(x => console.log(x) || x)
  ),
  buildsUrl: (owner, repo) => (
    `${this.a.baseUrl}/repo/${owner}%2F${repo}/builds?limit=5`
  ),
  parse: r => r.json(),
  distill: ({ builds }) => builds.map(rawBuild => ({
    id: rawBuild.id,
    duration: rawBuild.duration,
    timestamp: rawBuild.started_at,
    status: rawBuild.state,
    repoSlug: rawBuild.repository.slug,
    branchName: rawBuild.branch.name,
  })),
};

export default travisService;
