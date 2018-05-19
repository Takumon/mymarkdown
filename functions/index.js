const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase)


// ユーザ登録時にDBのユーザ登録数をインクリメントする
exports.incrementUserCount = functions.auth.user().onCreate(event => {
  const userCountRef = admin.database().ref('userCount')
  userCountRef.on('value', function (snapshot) {
    const count = snapshot.val() || 0;
    userCountRef.set(count + 1);
    console.log('count increments!');
  });
});

// ユーザ登録数を取得する(クロスオリジン許可)
exports.getUserCount = functions.https.onRequest((request, response) => {
  cors(request, response, () => {

    const userCountRef = admin.database().ref('userCount')
    userCountRef.on('value', function (snapshot) {
      const count = snapshot.val() || 0;

      response.status(200).send(JSON.stringify({
        count: count
      }));
    }, function(errorObject) {
      response.status(500).send(JSON.stringify({
        errorCode : errorObject.code
      }));
    });
  });
});
