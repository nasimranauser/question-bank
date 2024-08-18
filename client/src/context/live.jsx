
// carosel, exam component, lenght

import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [slide, setSlide] = useState([]);
    const [elenght, seteLenght] = useState(null);
    const [jlenght, setjLenght] = useState(null);
    // lenght exam, lenght joinned, lenght notification.
    // load slide, exam component
    // getting.
    const getSlide = async()=>{
        try{
            const response = await fetch();
            
        }catch(err){
            console.error(err)
        }
    }
    
    return <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}

export const useLive = ()=>{
    const liveValue = useContext(AuthContext);
    return liveValue;
}