import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.database = app.database();
    this.storage = app.storage();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => {
    this.auth.signOut();
    console.log('Signed Out')};

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

      // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
  this.auth.onAuthStateChanged(authUser => {
    if (authUser) {
      this.user(authUser.uid)
        .once('value')
        .then(snapshot => {
          if(snapshot.val()!=null)
          {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.role) {
              dbUser.role = '';
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };
            next(authUser);
          }
        });
    } else {
      fallback();
    }
  });

  // *** User API ***
  user = uid => this.database.ref(`users/${uid}`);
  users = () => this.database.ref('users');

  // *** Booking API ***
  booking = uid => this.database.ref(`booking/${uid}`)
  bookings = () => this.database.ref('booking')
  bookingMember = uid => this.database.ref(`bookingMembers/${uid}`)
  bookingMembers = () => this.database.ref('bookingMembers')

  // *** Reviews API ***
  review = uid => this.database.ref(`reviews/${uid}`)
  reviews = () => this.database.ref('reviews')

  // *** Chatting API ***
  chat = uid => this.database.ref(`chats/${uid}`)
  chats = () => this.database.ref('chats')
  chatMember = () => this.database.ref('chatMembers')
  chatMembers = uid => this.database.ref(`chatMembers/${uid}`)
  messages = uid => this.database.ref(`chatMessages/${uid}`)

  // *** Profile Pictures API ***
  profilePic = uid => this.storage.ref(`profile/${uid}`)
  profilePics = () => this.storage.ref(`profile/`)

}

 
export default Firebase;
