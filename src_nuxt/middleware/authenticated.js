import { auth } from '~/plugins/auth'


export default function ({ route, store, redirect }) {

  return new Promise((resolve, reject) => {
    // firebaseで認証管理
    auth().then(user => {
      console.log('user')
      console.log(user)
      if (user) {
        store.dispatch('setLoginUser', user).then(() => {
          resolve()
        })
      } else if (route.path === "/login") {
        resolve()
      } else {
        // ログイン画面以外で未認証の場合はログイン画面に遷移
        redirect('/login')
        resolve()
      }
    })
  })

}