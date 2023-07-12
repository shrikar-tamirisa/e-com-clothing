import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBFZzouDfHRQDAYFM3fM_K9A6iDVhISvAI",
    authDomain: "e-com-db-3b54c.firebaseapp.com",
    projectId: "e-com-db-3b54c",
    storageBucket: "e-com-db-3b54c.appspot.com",
    messagingSenderId: "408639847041",
    appId: "1:408639847041:web:5e322957dbcc96e326ab80"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
     
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        } catch(error){
            alert(error);
        }
    }

    return userDocRef;
}