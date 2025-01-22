import {createContext, useContext, useState} from "react";

const userContext=createContext({
    data:null,
    addUser:(uid)=>{},
    removeUser:()=>{},
})
export const useUser=()=>{
    return useContext(userContext)
}
export const UserProvider=({children})=>{
    const [userData,setUserData]=useState(null);

    const addUser=(uid)=>{
        setUserData(uid)
    }
    const removeUser=()=>{
        setUserData(null)
    }
    return (
        <userContext.Provider value={{data:userData,addUser,removeUser}}>
            {children}
        </userContext.Provider>
    )
}