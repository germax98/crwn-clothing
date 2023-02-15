import {initializeApp} from 'firebase/app'
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
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
  const googleProvider = new GoogleAuthProvider()

  googleProvider.setCustomParameters({
    prompt: "select_account"
  })
export const auth = getAuth()

//provider
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)


//---------------Database
  //---------------Google user information
export const db = getFirestore() //init
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={})=>{
    if(!userAuth)return
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
                createdAt,
                ...additionalInformation
            })
        }catch (error){
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef
    //user exists
    
}//get user Data and store it into the database 

    //---------------NativeLogin user information

export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email|| !password)return
    return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email|| !password)return
    return await signInWithEmailAndPassword(auth,email,password)
}

//-----------SignOutFunction

export const signOutUser= async ()=> await signOut(auth)

export const onAuthStateChangedListener =(callback)=>
{
    onAuthStateChanged(auth, callback)// permanent open listener
}