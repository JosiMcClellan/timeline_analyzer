export default class GithubService {
  constructor(token) {
    this.token = token;
  }

  fetch(...args) {
    return fetch(...this.argumentsForFetch(...args))
      .then(GithubService.parse)
      .then(GithubService.checkForErrors);
  }

  argumentsForFetch(graphql) {
    return [
      'https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphql),
      },
    ];
  }

  fetchCommitHistory({ owner, repo }) {
    // return Promise.resolve(JSON.parse(GithubService.commits));
    return this.fetch({
      variables: { owner, repo },
      query: GithubService.commitHistoryQuery,
    }).then(({ errors, data }) => {
      if (errors) return { errors };
      return data.repository.defaultBranchRef.target.history.nodes;
    });
  }

  static parse(res) {
    return res.json();
  }

  static checkForErrors(result) {
    if (result.errors) throw result.errors;
    return result;
  }

  static commitHistoryQuery = `
    query commitHistory($owner: String! $repo: String!) {
      repository(owner:$owner name:$repo) {
        defaultBranchRef {
          target {
            ...on Commit {
              history(first: 20) {
                nodes{
                  id ${/* <-- for react keying */''}
                  pushedDate ${/* <-- for grouping */''}
                  changedFiles  additions  deletions
                  abbreviatedOid  commitUrl
                  author {
                    user { login, url, avatarUrl }
                    date
                  }
                }
              }
            }
          }
        }
      }
    }
  `
}
