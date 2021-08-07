# ensemble-backend-es6 🦀

[![Build Status](https://travis-ci.com/ensemble/backend-es6.svg?token=JUcCNLXGFi2Z35ydtNmz&branch=master)](https://travis-ci.com/ensemble/backend-es6)


## START-UP PROCEDURE

==================

- Install and configure mongoDB
- sudo service mongod start|stop|restart or simply mongod
- brew services restart mongodb-community@4.0
- clone the repo
- npm install && npm start

"start": "NODE_ENV=development nodemon --exec babel-node --presets=latest -- ./src",


## ROUTINES

=================

1. pull a particular branch

> git pull origin <branch>

2. Create a new branch named "feature_x" and switch to it using

> git checkout -b feature_x

3. push the branch to your remote repository

> git push origin <branch>

4. switch back to master

> git checkout master

5. and delete the branch again

> git branch -d feature_x

Remove the old origin and readd the correct one:

> git remote remove origin
> git remote add origin <correct address>

Update the existing remote links:

> git remote set-url origin <correct url>

> mongod --shutdown



## TODO TASKLIST

=================

- [x] Award
- [ ] BookmarkedJob
- [ ] BookmarkedProject
- [ ] BookmarkedProject
- [ ] Circle
- [ ] Company
- [ ] Education
- [ ] Experience
- [ ] ExternalCompany
- [ ] ExternalJob
- [ ] FileItem
- [ ] FriendRequest
- [ ] Job
- [ ] JobApplication
- [ ] Location
- [ ] LocationCountry
- [ ] LocationState
- [ ] MentorshipUser
- [ ] MentorshipUserFriend
- [ ] Picture
- [ ] Project
- [ ] ProjectApplication
- [ ] Setting
- [ ] Talent
- [ ] User
- [ ] UserCircle
- [ ] ViewedJob
- [ ] ViewdProject
- [ ] Role
- [ ] Privilege




## API ROUTES

================

1. api/project

---

- **List Projects**

  - get /api/project

- **Add Project**

  - post /api/project

- **Delete Project**

  - delete /api/project/{projectId}

- **Update Project**
  - put /api/project/{projectId}



## Changes


https://www.npmjs.com/package/recachegoose

redis-cli KEYS '\*'




## SCRIPT

run-rs --mongod --keep --shell ./backend-es6/replStart.js


## TODO

