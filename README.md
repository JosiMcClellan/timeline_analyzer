# Timeline Analyzer

### The Cake is a Lie
This document is out of date but it's crunch time!  Check back very soon.

### Project Parameters
- solo project
- 2 weeks
- focus: API consumption

### Purpose
This serverless app collects project events from multiple APIs and assembles them into a single, coherent timeline. The MVP will use GitHub, Travis, Heroku, and Pivotal Tracker.  The wireframes (linked below) say it better than words.

### Wireframes
https://balsamiq.cloud/s9xzks4/pvqs6xi

### Storyboard
https://www.pivotaltracker.com/n/projects/2160712

### Use Cases
Future iterations could have a broader use, but the MVP is designed with Turing School students and instructors in mind, so it integrates with the services most commonly used in the last half Turing's backend program.

### Technology
Because there's so much focus on API consumption, the actual tech stack is minimal.  Planned so far:
- React
  - React Router
- Firebase
  - Hosting
  - Authentication
  - Cloud Firestore (database)

### Tasks
##### Setup
All you need before you jump in is Node, Git, and Yarn.
```
  git clone git@github.com:JosiMcClellan/timeline_analyzer.git
  cd timeline_analyzer
  yarn
```

##### Run (development)
```
  yarn start
```

##### Test
There is no testing yet, check back soon.

##### Deploy
First, just set up your own Firebase app on their website.  Just follow their [quick and easy instructions].  You also have to change the project name in `.firebaserc` to your new project's name, and change the url in the deploy script (in `package.json`).  By the time you read this, you might also need to set up some API keys.  After that, whenever you want to deploy, simply type:
```
  yarn deploy
```
This will make a production build and deploy it to firebase in one step.  Note that deploys and commits are separate, so it's up to you to keep the deployed app in sync with your master branch (or automate this) if it's important to you.
