import * as firebase from 'firebase';

firebase.initializeApp({
  projectId: 'timeline-analyzer',
  authDomain: 'timeline-analyzer.firebaseapp.com',
  apiKey: 'AIzaSyAl8DVxiifvKZK5liUmkrtwdHk7EpWBN_Y',
  databaseURL: 'https://timeline-analyzer.firebaseio.com',
});

firebase.uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => false,
  },
};

export default firebase;
