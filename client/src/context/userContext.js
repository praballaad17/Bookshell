import React, { useContext, useState, useEffect, createContext, useCallback } from 'react'
import { getUserByUsername, getuserDisplayImgs } from '../services/userServices';

const UserContext = createContext();


export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ user, children }) {
    // const [user, setUser] = useState({});
    const [searchResult, setSearchResult] = useState([])

    // useEffect(() => {
    //     setUser({ ...userProfile })
    // }, [])


    // useEffect(() => {
    //     async function getUserObjByUserId(username) {
    //         const user = await getUserByUsername(username);
    //         console.log("user", user);
    //         setUser({ ...user } || {});
    //     }

    //     if (userProfile && userProfile?.username) {
    //         getUserObjByUserId(userProfile?.username);
    //     }
    // }, [user]);


    const value = {
        user,
        searchResult, setSearchResult
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
