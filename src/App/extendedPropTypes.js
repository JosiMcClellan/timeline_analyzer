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
    name: strReq,
    hasTravis: PropTypes.bool.isRequired,
    herokuSlug: PropTypes.string,
  }),

  matchParams(params) {
    return {
      match: PropTypes.shape({
        params: PropTypes.shape(params).isRequired,
      }).isRequired,
    };
  },

};

export default XPT;
