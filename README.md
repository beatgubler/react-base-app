# react-base-app

## Description
React Base Application with Firebase authentication and database.
This project is meant to give beginning developers a head-start in developing their own web application.

Feel free to leave your suggestions, problems, safety concerns or questions in the respected section here on Github.

## Features:
* responsive design (mobile first)
* local and Google authentication
* persistent login

#### Livepreview: [https://react-base-app.gubler-it.com](https://react-base-app.gubler-it.com)

![react-base-app [Preview]](https://i.imgur.com/LKFXyZf.png)

## Installation
* Install NodeJS -> https://nodejs.org/en/download/
* Clone this project with **git clone https://github.com/beatgubler/react-base-app.git** or download manually
**npm install** -> **npm start**

## Configuration
### Firebase Console
* Log into https://console.firebase.google.com/
* Create New Project
* Create Firestore Database and change the rules to:
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          true
    }
  }
}
```
* Create Authentication method: Email/Password + Google
* Add App and copy the firebaseConfig
### Application
* replace the firebaseConfig with your own config from the Firebase Console

## Notable external dependencies
* Formik - https://www.npmjs.com/package/formik
* Firebase - https://www.npmjs.com/package/firebase
* react-firebase-hooks - https://www.npmjs.com/package/react-firebase-hooks
* Material UI - https://mui.com/getting-started/installation/
* Bootstrap - https://getbootstrap.com/

## Known issues/concerns
* firebase security rules are not restrictive enough
* firebase modular API should be used
