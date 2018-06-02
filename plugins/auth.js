import firebase from '~/plugins/firebase'
import * as firebaseCore from 'firebase'

export function auth () {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user || false)
    })
  })
}

export function signOut() {
  return firebase.auth().signOut()
}



export function loginWith(provider) {
  return firebase.auth().signInWithPopup(provider)
}


const google= new firebaseCore.auth.GoogleAuthProvider()
const facebook= new firebaseCore.auth.FacebookAuthProvider()
const twitter= new firebaseCore.auth.TwitterAuthProvider()
const github= new firebaseCore.auth.GithubAuthProvider()

export const LOGIN_PROVIDER = {
  google,
  facebook,
  twitter,
  github,
}
