// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, signOut, FacebookAuthProvider, GoogleAuthProvider, OAuthProvider, reauthenticateWithPopup} from
"firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from
"firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAQrZBU4ZJb8LYxoeHNtIjgX9EHdM0ZRj4",
    authDomain: "trabalholpe2alexandrereb-1723e.firebaseapp.com",
    databaseURL: "https://trabalholpe2alexandrereb-1723e-default-rtdb.firebaseio.com",
    projectId: "trabalholpe2alexandrereb-1723e",
    storageBucket: "trabalholpe2alexandrereb-1723e.appspot.com",
    messagingSenderId: "788986807093",
    appId: "1:788986807093:web:675fd5f7a9f75f2d0b027c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);



//export default firebaseApp;



/*provider.setCustomParameters({
     // Force re-consent
     prompt: 'consent',
    // Target specific email with login hint.
    login_hint: 'alexandrerebechi@outlook.com'
})
provider.addScope('mail.read');
provider.addScope('calendars.read');*/


const googleProvider = new GoogleAuthProvider();



const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
    .then((re) => {
        console.log(re);
    })
    .catch((err)=>{
        console.log(err.message);
    })
};
const provider = new OAuthProvider('microsoft.com');
const signInWithMicrosoft = async () =>{
   
    signInWithPopup(auth, provider)
    .then((result) => {
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.
    
        // Get the OAuth access token and ID Token
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
      })
    .catch((err)=>{
        console.log(err.message);
    })
}


const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithFacebook,
    logout,
};
