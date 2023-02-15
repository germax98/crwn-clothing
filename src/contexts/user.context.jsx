import { createContext, useState,useEffect } from "react";
import {onAuthStateChangedListener,createUserDocumentFromAuth}from '../utils/firebase/firebase.utils'

//stored data if the user is signed in or not 
//actual value to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: ()=>null,
})

export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser]=useState(null)
    const value = {currentUser, setCurrentUser}//gives Access to user information inside index.js 
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
           
           if(user){
            createUserDocumentFromAuth(user)
           }
           setCurrentUser(user)
        })
        
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

<UserProvider>
    <app/>
</UserProvider>