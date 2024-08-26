import React, {useState, useEffect, createContext, useContext} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    // define state
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [cUser, setUser] = useState([]);
    // store token
    const storeTokenLS = async (servertoken)=>{
        setToken(servertoken);
        return localStorage.setItem('token', servertoken); 
    }
    // check auth or not
    let isAuth = !!token;
     // remove token
     const removeToken = async()=>{
        setToken('')
        return localStorage.removeItem('token');
    }
    // load function
        // load data
        useEffect( ()=>{
            isAuth ? loadUser() : null 
        },[]);
    const loadUser = async ()=>{
        const  url = 'http://localhost:3000/api/auth/cuser';
        try{
            const respone = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type":"application/json"
                }
            });
            const rs = await respone.json();
            if(respone.ok){
                setUser(rs.udata);
            }else{
                setUser(null);
            }
        }catch(err){
           console.log('')
        }
    }
    
    
    return <AuthContext.Provider value={{token,cUser, isAuth, storeTokenLS, removeToken}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error ('use auth in uses inside main application');
    }
    return authContextValue;
}