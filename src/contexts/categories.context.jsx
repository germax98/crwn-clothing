import { createContext, useState, useEffect } from "react";
//import SHOP_DATA from "../shop-data"; only needed to setup the firestore (called once)
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";



export const CategoriesContext = createContext({
    categoriesMap:{},
})

export const CategoriesProvider = ({children})=>{
    const [categoriesMap,setCategoriesMap]=useState({})
    //create a collection in firestore 
    /*useEffect(()=>{
        addCollectionAndDocuments('categories',SHOP_DATA)
    },[])
    */
   useEffect(()=>{  //if i call a async function inside of my use Effect i declare a new async function to call the async function
    const getCategoriesMap = async ()=>{
        const categoryMap = await getCategoriesAndDocuments()
        console.log(categoryMap)
        setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
   },[])
    const value = {categoriesMap}
    return (
        <CategoriesContext.Provider value={value}>{children}
        </CategoriesContext.Provider>
    )
}