// FIXME is this an object or a class?

export default class Github {
  static parse(response) {
    return response.json();
  }

  static dataOrError({ data, message }) {
    if (data) return data;
    throw message;
  }

  static log(stuff) {
    console.log(stuff);
    return stuff;
  }

  constructor(token) {
    this.token = token;
  }

  fetch(params) {
    return fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'timeline-analyzer',
      },
      body: JSON.stringify(params),
    })
      .then(Github.parse)
      .then(Github.dataOrError)
      .catch(console.error);
  }

  getRepos() {
    return this.fetch({
      query: Github.repositoriesQuery,
    }).then(data => (
      data.viewer.repositories.nodes
    ));
  }

  getCommits(id) {
    return this.fetch({
      variables: { id },
      query: Github.commitsQuery,
    }).then(data => (
      data.node.defaultBranchRef.target.history.nodes
    ));
  }

  static repositoriesQuery = `
    query repositoriesQuery {
      viewer{
        repositories(first:100){
          nodes {
            id
            nameWithOwner
            primaryLanguage{
              name
              color
            }
            languages{
              totalCount
            }
          }
        }
      }
    }
  `

  static commitsQuery = `
    query commitsQuery($id: ID!) {
      node(id:$id){
        ...on Repository{
          defaultBranchRef {
            target {
              ...on Commit {
                history(first: 100) {
                  nodes{
                    id
                    pushedDate
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
    }
  `
}
