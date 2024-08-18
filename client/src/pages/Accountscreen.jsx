import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccountContent from "../components/AccountContent";

const AccountScreen = ()=>{
    
    return(
        <>
           <Navbar />
            <AccountContent />
           <Footer />
        </>
    );
}

export default AccountScreen