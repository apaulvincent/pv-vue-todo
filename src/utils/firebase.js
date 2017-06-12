import * as firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDWBcBXP7t3WY81V3QsVztaLXmeXKbF2Ig',
  authDomain: 'pv-vue-todo.firebaseapp.com',
  databaseURL: 'https://pv-vue-todo.firebaseio.com',
  storageBucket: 'pv-vue-todo.appspot.com'
}

firebase.initializeApp(config)

export const db = firebase.database()
export const fireTodo = db.ref().child('todos')
