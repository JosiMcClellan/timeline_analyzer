import deploys from './herokuBuilds.json';

const heroku = {
  getDeploys(..._) {
    return Promise.resolve(JSON.parse(deploys));
  },
};

export default heroku;
