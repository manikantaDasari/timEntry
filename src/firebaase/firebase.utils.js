import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config= {
    apiKey: "AIzaSyCJ6OiF89NaZCF1XCWsCmH64wAZ41PaoJo",
    authDomain: "timeentry-ff849.firebaseapp.com",
    databaseURL: "https://timeentry-ff849.firebaseio.com",
    projectId: "timeentry-ff849",
    storageBucket: "timeentry-ff849.appspot.com",
    messagingSenderId: "99729910404",
    appId: "1:99729910404:web:7bfc074c45422f243070d1",
    measurementId: "G-19C6HKZXHG"
  
};

export const updateUserProfileDoc= async(userAuth, additionalData)=>{
    if(!userAuth) return;    
    const userRef=  firestore.doc(`users/${userAuth.uid}`);    
    const snapShot= await userRef.get();
      if(!snapShot.exists){
        const{displayName, email}= userAuth;
        const createdAt= new Date();
        try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })          
        } catch (error) {
          console.log('error in creating user', error.message);          
          
        }

      }

      return userRef;
      
    }

export const updateUserTasks= async (userid, task)=>{
  if(userid) {   
    const userRef=  firestore.doc(`users/${userid}`);    
    userRef.update({
      tasks:firebase.firestore.FieldValue.arrayUnion(task)
    })}
    return
}


firebase.initializeApp(config);

export const auth= firebase.auth();
export const firestore = firebase.firestore()