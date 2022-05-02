import React, { useState, useEffect, useMemo } from "react";
import jwt_decode from 'jwt-decode';
import { getCurUser } from "../components/api/ApiUser";

export const UserContext = React.createContext({roles: 'none'});

export function UserProvider({children}){
    const [user, setUser] = useState({roles: 'none'});
    
    const updateUser = (newUser) => {
        setUser(newUser);
    }

    useEffect(() => {
        if ( localStorage.getItem('token') ) {
    
          const username = jwt_decode(localStorage.getItem('token')).username;
          getCurUser(updateUser, username);
      
        }
    
      }, [])

    return (
        <UserContext.Provider value={ useMemo(() => ({user, updateUser}), [ user, updateUser]) }>
            { children }
        </UserContext.Provider>
    )
}