import PropTypes from 'prop-types';

const strReq = PropTypes.string.isRequired; // most things

const XPT = {

  ...PropTypes,

  user: PropTypes.shape({
    id: strReq,
    name: strReq,
    email: strReq,
    avatarUrl: strReq,
    accessToken: strReq,
  }),

  project: PropTypes.shape({
    id: strReq,
    nameWithOwner: strReq,
    travisId: PropTypes.string,
    herokuSlug: PropTypes.string,
  }),

  matchParams(shape) {
    return {
      match: PropTypes.shape({
        params: PropTypes.shape(shape).isRequired,
      }).isRequired,
    };
  },

  locationState(shape) {
    return {
      location: PropTypes.shape({
        state: PropTypes.shape(shape).isRequired,
      }).isRequired,
    };
  },

};

export default XPT;
