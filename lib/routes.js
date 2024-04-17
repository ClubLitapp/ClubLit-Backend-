import express from 'express';
import userController from "/Users/winniebrendawaiya/ClubBackend /lib/controllers/userController.js";
import clubController from "/Users/winniebrendawaiya/ClubBackend /lib/controllers/clubContoller.js";
//import onboardingController from "./controllers/onboardingController.js";
//import { getTranscribedAudio, getAvatarResponse, getSignedUrl, cleanAudioFiles } from './controllers/speechTextController.js'
//import analyticsController from './controllers/analyticsController.js';

const app = express()

// User routes
// create a new user
app.route('/user')
  .post(userController.addNewUser);

app.route('/club')
  .post(clubController.addNewClub);

// // edit specific user
// app.route('/user/:userId')
//   .get(userController.getUserWithID)
//   .put(userController.updateUser)
//   .delete(userController.deleteUser)

// app.route('/login')
//   .post(userController.loginUser);

// // app.route('/login-persistent')
// // .post(userController.loginPersistentUser);

// //routes for opening and closing the app
// app.route('/open')
//   .post(userController.openApp);
// app.route('/close')
//    .post(userController.closeApp);



export default app;