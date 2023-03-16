import { createContext, useEffect, useReducer } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
} 

const userReducer = (state,action)=>{
  console.log('dispatched',action)
  const {type,payload} = action
  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return{
        ...state,
        cureentUser: payload
      }
    
    default: 
      throw new Error (`Unabled type ${type} in userReducer`)
  }
}

const INITAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  
  const [state,dispatch]=useReducer(userReducer, INITAL_STATE)

  const {currentUser} = state
  console.log(currentUser)
  const setCurrentUser = (user) =>{
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
  }
  const value = { currentUser, setCurrentUser };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/*
const userReducer = (state, action) => {
  return {
    currentUser: null; 
  }
}
*/