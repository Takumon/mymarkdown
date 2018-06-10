import firebase from '~/plugins/firebase.js'
import * as firebaseCore from 'firebase'

export function auth () {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user || false)
    })
  })
}

// リダイレクトで帰って来た時の認証
export function authInLogin () {
  return new Promise((resolve, reject) => {
    firebase.auth().getRedirectResult().then(result => {
      resolve(result.credential ? result.user: false)
    })
  })
}

export function signOut() {
  return firebase.auth().signOut()
}


// PWAの場合popuoだとうまくいかないのでリダイレクトでログインする
export function loginWith(provider) {
  return firebase.auth().signInWithRedirect(provider)
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
