export default class Github {
  constructor(token) {
    this.token = token;
  }

  fetch(...args) {
    return fetch(...this.argumentsForFetch(...args))
      .then(Github.parse)
      .then(Github.checkForErrors);
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
    return this.fetch({
      variables: { owner, repo },
      query: Github.commitHistoryQuery,
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
                  commitUrl
                  messageHeadline
                  message
                  pushedDate
                  author {
                    date
                    user {
                      url
                      name
                    }
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
