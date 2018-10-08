import firebasemock from 'firebase-mock';

export class FirebaseMock{

 mockauth = new firebasemock.MockAuthentication();
 mockdatabase = new firebasemock.MockFirebase();
 mockfirestore = new firebasemock.MockFirestore();
 mockstorage = new firebasemock.MockStorage();
 mockmessaging = new firebasemock.MockMessaging();
 mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path) => {
    return path ? this.mockdatabase.child(path) : this.mockdatabase;
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    return this.mockauth;
  },
  // use null if your code does not use FIRESTORE
  () => {
    return this.mockfirestore;
  },
  // use null if your code does not use STORAGE
  () => {
    return this.mockstorage;
  },
  // use null if your code does not use MESSAGING
  () => {
    return this.mockmessaging;
  }
);
}

