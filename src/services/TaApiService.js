const TaApiService = {
  path(path) {
    return `https://quantified-self-api-express.herokuapp.com/${path}`;
  },

  createUser(params) {
    fetch(this.path('users'), {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },
};

export default TaApiService;
