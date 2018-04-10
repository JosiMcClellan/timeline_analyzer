import React from 'react';
import PropTypes from 'prop-types';
import GithubService from './GithubService';
// import GithubEvent from './GithubEvent';
import Timeline from './Timeline';

export default class Project extends React.Component {
  // builds = JSON.parse(`
  //   {
  //     "@type": "builds",
  //     "@href": "/repo/17712717/builds?limit=5",
  //     "@representation": "standard",
  //     "@pagination": {
  //       "limit": 5,
  //       "offset": 0,
  //       "count": 129,
  //       "is_first": true,
  //       "is_last": false,
  //       "next": {
  //         "@href": "/repo/17712717/builds?limit=5&offset=5",
  //         "offset": 5,
  //         "limit": 5
  //       },
  //       "prev": null,
  //       "first": {
  //         "@href": "/repo/17712717/builds?limit=5",
  //         "offset": 0,
  //         "limit": 5
  //       },
  //       "last": {
  //         "@href": "/repo/17712717/builds?limit=5&offset=125",
  //         "offset": 125,
  //         "limit": 5
  //       }
  //     },
  //     "builds": [
  //       {
  //         "@type": "build",
  //         "@href": "/build/363291740",
  //         "@representation": "standard",
  //         "@permissions": {
  //           "read": true,
  //           "cancel": false,
  //           "restart": false
  //         },
  //         "id": 363291740,
  //         "number": "129",
  //         "state": "errored",
  //         "duration": 787,
  //         "event_type": "push",
  //         "previous_state": "errored",
  //         "pull_request_title": null,
  //         "pull_request_number": null,
  //         "started_at": "2018-04-06T20:30:59Z",
  //         "finished_at": "2018-04-06T20:44:06Z",
  //         "repository": {
  //           "@type": "repository",
  //           "@href": "/repo/17712717",
  //           "@representation": "minimal",
  //           "id": 17712717,
  //           "name": "okex",
  //           "slug": "JosiMcClellan/okex"
  //         },
  //         "branch": {
  //           "@type": "branch",
  //           "@href": "/repo/17712717/branch/travis",
  //           "@representation": "minimal",
  //           "name": "travis"
  //         },
  //         "tag": null,
  //         "commit": {
  //           "@type": "commit",
  //           "@representation": "minimal",
  //           "id": 108373538,
  //           "sha": "a09d08b50156eaf549a55ce69a989935137a7ff2",
  //           "ref": "refs/heads/travis",
  //           "message": "m",
  //           "compare_url": "https://github.com/JosiMcClellan/okex/compare/28bf95768cf2...a09d08b50156",
  //           "committed_at": "2018-04-06T20:30:47Z"
  //         },
  //         "jobs": [
  //           {
  //             "@type": "job",
  //             "@href": "/job/363291741",
  //             "@representation": "minimal",
  //             "id": 363291741
  //           }
  //         ],
  //         "stages": [
  //
  //         ],
  //         "created_by": {
  //           "@type": "user",
  //           "@href": "/user/1135508",
  //           "@representation": "minimal",
  //           "id": 1135508,
  //           "login": "JosiMcClellan"
  //         },
  //         "updated_at": "2018-04-06T20:44:06.810Z"
  //       },
  //       {
  //         "@type": "build",
  //         "@href": "/build/363250761",
  //         "@representation": "standard",
  //         "@permissions": {
  //           "read": true,
  //           "cancel": false,
  //           "restart": false
  //         },
  //         "id": 363250761,
  //         "number": "128",
  //         "state": "errored",
  //         "duration": 792,
  //         "event_type": "push",
  //         "previous_state": "canceled",
  //         "pull_request_title": null,
  //         "pull_request_number": null,
  //         "started_at": "2018-04-06T18:46:15Z",
  //         "finished_at": "2018-04-06T18:59:27Z",
  //         "repository": {
  //           "@type": "repository",
  //           "@href": "/repo/17712717",
  //           "@representation": "minimal",
  //           "id": 17712717,
  //           "name": "okex",
  //           "slug": "JosiMcClellan/okex"
  //         },
  //         "branch": {
  //           "@type": "branch",
  //           "@href": "/repo/17712717/branch/travis",
  //           "@representation": "minimal",
  //           "name": "travis"
  //         },
  //         "tag": null,
  //         "commit": {
  //           "@type": "commit",
  //           "@representation": "minimal",
  //           "id": 108361498,
  //           "sha": "28bf95768cf234bf7a51653f52298cef5719d920",
  //           "ref": "refs/heads/travis",
  //           "message": "m",
  //           "compare_url": "https://github.com/JosiMcClellan/okex/compare/94743856f2bd...28bf95768cf2",
  //           "committed_at": "2018-04-06T18:45:59Z"
  //         },
  //         "jobs": [
  //           {
  //             "@type": "job",
  //             "@href": "/job/363250762",
  //             "@representation": "minimal",
  //             "id": 363250762
  //           }
  //         ],
  //         "stages": [
  //
  //         ],
  //         "created_by": {
  //           "@type": "user",
  //           "@href": "/user/1135508",
  //           "@representation": "minimal",
  //           "id": 1135508,
  //           "login": "JosiMcClellan"
  //         },
  //         "updated_at": "2018-04-06T18:59:27.817Z"
  //       },
  //       {
  //         "@type": "build",
  //         "@href": "/build/363246659",
  //         "@representation": "standard",
  //         "@permissions": {
  //           "read": true,
  //           "cancel": false,
  //           "restart": false
  //         },
  //         "id": 363246659,
  //         "number": "127",
  //         "state": "canceled",
  //         "duration": 574,
  //         "event_type": "push",
  //         "previous_state": "canceled",
  //         "pull_request_title": null,
  //         "pull_request_number": null,
  //         "started_at": "2018-04-06T18:36:00Z",
  //         "finished_at": "2018-04-06T18:45:34Z",
  //         "repository": {
  //           "@type": "repository",
  //           "@href": "/repo/17712717",
  //           "@representation": "minimal",
  //           "id": 17712717,
  //           "name": "okex",
  //           "slug": "JosiMcClellan/okex"
  //         },
  //         "branch": {
  //           "@type": "branch",
  //           "@href": "/repo/17712717/branch/travis",
  //           "@representation": "minimal",
  //           "name": "travis"
  //         },
  //         "tag": null,
  //         "commit": {
  //           "@type": "commit",
  //           "@representation": "minimal",
  //           "id": 108360283,
  //           "sha": "94743856f2bdf8eb04086b374cbf505d8366c30e",
  //           "ref": "refs/heads/travis",
  //           "message": "m",
  //           "compare_url": "https://github.com/JosiMcClellan/okex/compare/56e58a5ae9dc...94743856f2bd",
  //           "committed_at": "2018-04-06T18:35:48Z"
  //         },
  //         "jobs": [
  //           {
  //             "@type": "job",
  //             "@href": "/job/363246660",
  //             "@representation": "minimal",
  //             "id": 363246660
  //           }
  //         ],
  //         "stages": [
  //
  //         ],
  //         "created_by": {
  //           "@type": "user",
  //           "@href": "/user/1135508",
  //           "@representation": "minimal",
  //           "id": 1135508,
  //           "login": "JosiMcClellan"
  //         },
  //         "updated_at": "2018-04-06T18:45:34.205Z"
  //       },
  //       {
  //         "@type": "build",
  //         "@href": "/build/363170074",
  //         "@representation": "standard",
  //         "@permissions": {
  //           "read": true,
  //           "cancel": false,
  //           "restart": false
  //         },
  //         "id": 363170074,
  //         "number": "126",
  //         "state": "canceled",
  //         "duration": 65,
  //         "event_type": "push",
  //         "previous_state": "errored",
  //         "pull_request_title": null,
  //         "pull_request_number": null,
  //         "started_at": "2018-04-06T16:00:24Z",
  //         "finished_at": "2018-04-06T16:01:29Z",
  //         "repository": {
  //           "@type": "repository",
  //           "@href": "/repo/17712717",
  //           "@representation": "minimal",
  //           "id": 17712717,
  //           "name": "okex",
  //           "slug": "JosiMcClellan/okex"
  //         },
  //         "branch": {
  //           "@type": "branch",
  //           "@href": "/repo/17712717/branch/travis",
  //           "@representation": "minimal",
  //           "name": "travis"
  //         },
  //         "tag": null,
  //         "commit": {
  //           "@type": "commit",
  //           "@representation": "minimal",
  //           "id": 108337250,
  //           "sha": "56e58a5ae9dc78e5852a2c3f970566f6b231e062",
  //           "ref": "refs/heads/travis",
  //           "message": "m",
  //           "compare_url": "https://github.com/JosiMcClellan/okex/compare/a1ec351fbe9f...56e58a5ae9dc",
  //           "committed_at": "2018-04-06T15:38:19Z"
  //         },
  //         "jobs": [
  //           {
  //             "@type": "job",
  //             "@href": "/job/363170075",
  //             "@representation": "minimal",
  //             "id": 363170075
  //           }
  //         ],
  //         "stages": [
  //
  //         ],
  //         "created_by": {
  //           "@type": "user",
  //           "@href": "/user/1135508",
  //           "@representation": "minimal",
  //           "id": 1135508,
  //           "login": "JosiMcClellan"
  //         },
  //         "updated_at": "2018-04-06T16:01:29.750Z"
  //       },
  //       {
  //         "@type": "build",
  //         "@href": "/build/363169830",
  //         "@representation": "standard",
  //         "@permissions": {
  //           "read": true,
  //           "cancel": false,
  //           "restart": false
  //         },
  //         "id": 363169830,
  //         "number": "125",
  //         "state": "canceled",
  //         "duration": 84,
  //         "event_type": "push",
  //         "previous_state": "errored",
  //         "pull_request_title": null,
  //         "pull_request_number": null,
  //         "started_at": "2018-04-06T15:37:48Z",
  //         "finished_at": "2018-04-06T15:38:29Z",
  //         "repository": {
  //           "@type": "repository",
  //           "@href": "/repo/17712717",
  //           "@representation": "minimal",
  //           "id": 17712717,
  //           "name": "okex",
  //           "slug": "JosiMcClellan/okex"
  //         },
  //         "branch": {
  //           "@type": "branch",
  //           "@href": "/repo/17712717/branch/travis",
  //           "@representation": "minimal",
  //           "name": "travis"
  //         },
  //         "tag": null,
  //         "commit": {
  //           "@type": "commit",
  //           "@representation": "minimal",
  //           "id": 108337149,
  //           "sha": "a1ec351fbe9f3fae8103253cae2385adef433f08",
  //           "ref": "refs/heads/travis",
  //           "message": "m",
  //           "compare_url": "https://github.com/JosiMcClellan/okex/compare/ff1f97affacb...a1ec351fbe9f",
  //           "committed_at": "2018-04-06T15:37:36Z"
  //         },
  //         "jobs": [
  //           {
  //             "@type": "job",
  //             "@href": "/job/363169832",
  //             "@representation": "minimal",
  //             "id": 363169832
  //           },
  //           {
  //             "@type": "job",
  //             "@href": "/job/363169833",
  //             "@representation": "minimal",
  //             "id": 363169833
  //           },
  //           {
  //             "@type": "job",
  //             "@href": "/job/363169834",
  //             "@representation": "minimal",
  //             "id": 363169834
  //           }
  //         ],
  //         "stages": [
  //
  //         ],
  //         "created_by": {
  //           "@type": "user",
  //           "@href": "/user/1135508",
  //           "@representation": "minimal",
  //           "id": 1135508,
  //           "login": "JosiMcClellan"
  //         },
  //         "updated_at": "2018-04-06T15:38:29.230Z"
  //       }
  //     ]
  //   }
  // `)

  // commits = JSON.parse(`
  //   [{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OjVlMGNhOTFlOWU0ODZhYTI2ZDM4ODM3MThkMTdkNjFhZmNmMjVkOGY=","pushedDate":"2018-04-09T18:22:24Z","changedFiles":4,"additions":82,"deletions":35,"abbreviatedOid":"5e0ca91","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/5e0ca91e9e486aa26d3883718d17d61afcf25d8f","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-09T12:22:11-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OjA4NDlkMWZjN2FjNjk5NGU4N2RjMjkyODg1MWQ0NTMwZDZjOGY1OTU=","pushedDate":null,"changedFiles":5,"additions":183,"deletions":1,"abbreviatedOid":"0849d1f","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/0849d1fc7ac6994e87dc2928851d4530d6c8f595","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-08T23:10:05-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OmJlZTc0YTE5NWRhMDYzOWMwMmY5MGIwMzAzMmQ5ZWE2YjlmN2FhNjU=","pushedDate":null,"changedFiles":4,"additions":79,"deletions":47,"abbreviatedOid":"bee74a1","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/bee74a195da0639c02f90b03032d9ea6b9f7aa65","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-08T23:05:17-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OjQwZDYwY2VhYTEyNDcwZGM1NmE0M2E2NTBiNWFiMDU1ODFkODk1NTI=","pushedDate":"2018-04-08T07:43:26Z","changedFiles":2,"additions":2,"deletions":1,"abbreviatedOid":"40d60ce","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/40d60ceaa12470dc56a43a650b5ab05581d89552","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-08T00:22:08-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OmY5OWUwZGZlNmEzZDdkZTk1ZGUyYjRhYWM0NjgzYTA1ZTk0YTUwZjY=","pushedDate":"2018-04-07T18:10:12Z","changedFiles":5,"additions":337,"deletions":23,"abbreviatedOid":"f99e0df","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/f99e0dfe6a3d7de95de2b4aac4683a05e94a50f6","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-07T12:10:03-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OjJhMjBhODZjY2QwN2RkNmU0OTFkYmZiNzY2Y2EyYjNhNDU4ODQ5M2E=","pushedDate":"2018-04-07T04:27:10Z","changedFiles":7,"additions":53,"deletions":17,"abbreviatedOid":"2a20a86","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/2a20a86ccd07dd6e491dbfb766ca2b3a4588493a","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-06T22:26:41-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OjFiMzZlZWNjMjAyNmM2Njg1MTI4ODQzODBjZGQ0OGZkMDE4ZmUyOGU=","pushedDate":null,"changedFiles":4,"additions":69,"deletions":6,"abbreviatedOid":"1b36eec","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/1b36eecc2026c668512884380cdd48fd018fe28e","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-06T21:35:22-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OjVkNmI0NDhjMGYyY2Q4Nzg0Y2JlZDQ1ODc4NTkwNjQzOTgwZTZjZTk=","pushedDate":"2018-04-07T03:25:47Z","changedFiles":7,"additions":249,"deletions":86,"abbreviatedOid":"5d6b448","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/5d6b448c0f2cd8784cbed45878590643980e6ce9","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-06T19:56:06-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OjMwODJlMmI5ZmMzZDA5MWY2ZDRkMzAxNTBhMGIxZWU3OTEzMjIwOWE=","pushedDate":"2018-04-07T01:35:53Z","changedFiles":1,"additions":35,"deletions":2428,"abbreviatedOid":"3082e2b","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/3082e2b9fc3d091f6d4d30150a0b1ee79132209a","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-06T19:35:33-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OjNjZTcyZDBlNmE3NzgwZDc3MTk4ZTcwNGIyZWMwMTU5YzcxZDc0NmI=","pushedDate":null,"changedFiles":8,"additions":1768,"deletions":83,"abbreviatedOid":"3ce72d0","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/3ce72d0e6a7780d77198e704b2ec0159c71d746b","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-06T19:35:21-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OmZhY2IyMmZmZTgyNWQ5YTExMjk1ZDIwZWQwMGE2MzY2NDU2OGVmN2U=","pushedDate":null,"changedFiles":4,"additions":46,"deletions":0,"abbreviatedOid":"facb22f","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/facb22ffe825d9a11295d20ed00a63664568ef7e","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-06T19:35:00-06:00"}},{"id":"MDY6Q29tbWl0MTI4NDgxNjY2OjEzNGIxN2I2MGQyOWQzZDc4MDg4MGFjMzMzOTg0NzgwZTQ4OGE0NjM=","pushedDate":null,"changedFiles":14,"additions":9963,"deletions":0,"abbreviatedOid":"134b17b","commitUrl":"https://github.com/JosiMcClellan/timeline_analyzer/commit/134b17b60d29d3d780880ac333984780e488a463","author":{"user":{"login":"JosiMcClellan","url":"https://github.com/JosiMcClellan","avatarUrl":"https://avatars1.githubusercontent.com/u/7880651?v=4"},"date":"2018-04-06T18:00:35-06:00"}}]
  // `)
  static propTypes = {
    // BUG doesn't notice getDerivedStateFromProps
    token: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        owner: PropTypes.string.isRequired,
        repo: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    token: null,
    user: {},
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { token } = nextProps;
    if (token === prevState.token) return null;
    return { token, commits: [] };
  }

  state = {
    token: null,
    commits: [],
  };

  componentDidMount() {
    this.requestAll();
  }
  componentDidUpdate() {
    this.requestAll();
  }
  componentWillUnmount() {
    this.requestToken = null;
  }

  requestAll() {
    this.requestCommitHistory();
    this.requestBuildHistory();
  }

  requestBuildHistory() {
    const { owner, repo } = this.props.match.params;
    fetch(
      `https://api.travis-ci.org/repo/${'JosiMcClellan'}%2F${repo}/builds?limit=5`,
      {
        headers: {
          'User-Agent': 'API Explorer',
          'Travis-API-Version': 3,
          // Authorization: `token qO52SXXaPF-eJqp4MEuL5A`,
        },
      },
    )
      .then(r => r.json())
      .then(({ builds }) => this.setState({ builds }));
  }

  requestCommitHistory() {
    const { token } = this.state;

    // already requested it
    if (this.requestToken === token) return;
    this.requestToken = token;
    // already have it
    if (this.state.commits.length) return;
    // not authorized for it
    if (!token) return;

    new GithubService(token)
      .fetchCommitHistory(this.props.match.params)
      .then((commits) => {
        // no longer want it
        if (this.requestToken !== token) return;
        this.requestToken = null;
        // couldn't get it
        if (commits.errors) return console.error(commits);
        // got it!
        this.setState({ commits });
      });
  }

  render() {
    const { owner, repo } = this.props.match.params;
    const { commits, builds } = this.state;
    return (
      <div>
        <h2>Project page for {owner}/{repo}</h2>
        <Timeline {...{ commits, builds }} />
      </div>
    );
  }
}
