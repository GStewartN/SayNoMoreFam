const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotifications = functions.database.ref('/messages/{messageId}').onWrite(event => {
  const snapshot = event.data;
  if (snapshot.previous.val()) {
    return;
  }
  const payload = {
    notification: {
      title: `${snapshot.val().author}`,
      body: `${snapshot.val().msg}`,
      icon: 'assets/icon/png',
      click_action: `https://${functions.config().firebase.authDomain}`
    }
  };
});
