import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDeYojCh20bXb-j6rav1Y-ViTwSurwdoGM",
    authDomain: "preil-crm.firebaseapp.com",
    databaseURL: "https://preil-crm.firebaseio.com",
    projectId: "preil-crm",
    storageBucket: "",
    messagingSenderId: "967307788906",
    appId: "1:967307788906:web:038901872ce1ab5b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase.firestore()