// XXX seriously is this an object or a class?

export default class GithubService {
  constructor(token) {
    this.token = token;
  }

  fetch(...args) {
    return fetch(...this.argumentsForFetch(...args))
      .then(res => res.json())
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

  getRepos() {
    return this.fetch({
      query: GithubService.repositoriesQuery,
    }).then(result => (
      console.log(result) || result.data.viewer.repositories.nodes
    ));
  }

  getCommits({ owner, repo }) {
    // return Promise.resolve(JSON.parse(GithubService.commits));
    return this.fetch({
      variables: { owner, repo },
      query: GithubService.commitsQuery,
    }).then(result => (
      result.data.repository.defaultBranchRef.target.history.nodes
    ));
  }

  static checkForErrors(result) {
    if (!result.data) throw result.message;
    return result;
  }

  static repositoriesQuery = `
    query repositoriesQuery {
      viewer{
        repositories(first:100){
          nodes {
            id
            name
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

  static commitsQuery = `${/* * * GraphQL is Fun * * */''}
    query commitsQuery($owner: String! $repo: String!) { ${/* <-- type, name, variables */''}
      repository(owner:$owner name:$repo) {${/* <-- arguments */''}
        defaultBranchRef {${/* <-- `master` repo */''}
          target { ${/* <-- the commit that `master` ref points to */''}
            ...on Commit { ${/* <-- type casting (yes, it's a commit) */''}
              history(first: 30) { ${/* <-- more commits */''}
                nodes{ ${/* <-- the actual commits. I think I'll need edges when I do pagination? */''}
                  id ${/* <-- react key */''}
                  pushedDate ${/* <-- group key */''}
                  changedFiles  additions  deletions ${/* * * Display Fields Below * * */''}
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
