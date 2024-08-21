import { useEffect } from "react"
import {Navigate} from 'react-router-dom'
import { useAuth } from "../context/auth";

export const Logout = ()=>{
  const {removeToken} = useAuth();
   useEffect( ()=>{
    removeToken();
   },[removeToken]);

   return <Navigate to='/login' />
}