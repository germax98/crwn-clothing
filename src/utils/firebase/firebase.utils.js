import {initializeApp} from 'firebase/app'
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    
} from 'firebase/auth'
import{
    getFirestore,
    doc, //retrieve doments from the firestore databse
    getDoc, //get Documents Data
    setDoc  //set Documents Data
}from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHTreiBr4R6CnPkEwHzVSsmsMPOzLhi-Y",
    authDomain: "crwn-clothing-db-5188d.firebaseapp.com",
    projectId: "crwn-clothing-db-5188d",
    storageBucket: "crwn-clothing-db-5188d.appspot.com",
    messagingSenderId: "573016299279",
    appId: "1:573016299279:web:d6feb97ffcd015c302d07a"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  //Authentification Service (Google, Facebook...)
  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
    prompt: "select_account"
  })
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

//---------------Database

export const db = getFirestore() //init
export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef = doc(db, 'users', userAuth.uid) //Database, Collection, uniqueID
    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists())//checks that the data is existing


    //user does not exist
    if(!userSnapshot.exists()){ 
        const { displayName,email} = userAuth
        const createdAt = new Date()

        try{
            //writes Data into Database
            await setDoc( userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch (error){
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef
    //user exists
    
}//get user Data and store it into the database 