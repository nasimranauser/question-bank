import React, { useState } from 'react'
import '../assets/styles/Navbar.css'
import { FaUser } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import {useAuth} from '../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import userimg from '../assets/img/profile.png'
import { CiHome } from "react-icons/ci";

function Navbar() {
  const navigate = useNavigate();
  const {cUser, token , removeToken, isAuth} = useAuth();
  const logoutNow = ()=>{
    navigate('/logout');
  }

  return (
    <div className="top_content">
    <div className="p1">
        <div className="profile">
            <div className="avater">
              {isAuth == false ? <NavLink to={'/register'}><FaUser /> Create Account</NavLink> : ''} 
              {isAuth == true ? <img src={userimg} title={ cUser.name} alt={cUser.name} /> : ''}
            </div>
           
            {isAuth == true ? <div className='utxt'>
              <h3 style={{color:'rgb(79, 63, 63)',fontSize:16,}}>{cUser.name} | {cUser.institute} </h3>
              <p>Active status: <span style={{color:'green'}}>Online</span></p>
              </div>  : ''}
            
        </div>
    </div>
    <div className="p2">
 
    <button title='Back' onClick={() => navigate('/')} jsaction="trigger.NmtSIb" className="iM6qI" jsname="ttdpI" aria-label="আগের ছবি" data-ved="2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQhRx6BAgAEAg">
              <div className="wv9iH MjJqGe  cd29Sd" >
               <CiHome style={{color:'#70757a',fontSize:24,position:'relative',left:'1px'}} />
                </div>
              </button>
            <button title='Back' onClick={() => navigate(-1)} jsaction="trigger.NmtSIb" className="iM6qI" jsname="ttdpI" aria-label="আগের ছবি" data-ved="2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQhRx6BAgAEAg">
              <div className="wv9iH MjJqGe  cd29Sd" ><svg className="FJ6RFd" viewBox="0 0 24 24" focusable="false" height="28" width="28"><path d="M0 0h24v24H0z" fill="none"></path><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path></svg></div>
              </button>
              <button title='Forward' onClick={()=> navigate(1)} jsaction="trigger.cLfhwf" className="iM6qI" jsname="OCpkoe" aria-label="পরের ছবি" data-ved="2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQhhx6BAgAEAk"><div className="wv9iH MjJqGe  cd29Sd"><svg className="t0PEec" viewBox="0 0 24 24" focusable="false" height="28" width="28"><path d="M0 0h24v24H0z" fill="none"></path><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path></svg></div>
              </button>

              <div  className="StEefb mitem" jsname="xl07Ob" jscontroller="DJOkZc">
                <button title='Option Menu' jsaction="WRyONc" className="iM6qI" jsname="hyP9Qc" aria-label="এই ফলাফলের জন্য আরও অ্যাকশন" data-ved="2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQ6D96BAgAEAo" aria-expanded="false"><div className="wv9iH MjJqGe  cd29Sd" jsname="AMTXO"><svg viewBox="0 0 24 24" focusable="false" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></div>
                </button>
                
                <div className="gXQlA k4o2Hc" jsname="V68bde" style={{display:'none'}} data-ved="2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQ5D96BAgAEAs"><div jscontroller="ST7cxc" jsmodel="L1J2dc" data-sms="" data-fbm="" data-sf="43" data-sm="5" data-sp="1" data-shem="abme,ssic,trie" data-hveid="CAAQDA" className="wIk0sb" role="button" tabIndex="0" jslog="189815;ved:2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQ98oLegQIABAM;track:click" jsaction="d2OwS:MM34Cf;MYwIPc;JIbuQc:MYwIPc"><div jsname="YOuPgf" data-ved="2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQgK8MegQIABAN" className="OKZdtc" jslog="202624;ved:2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQgK8MegQIABAN;track:click"><svg className="sFT5O indIKd gRAwSd" viewBox="0 0 24 24" focusable="false" height="20" width="20"><path d="M0 0h24v24H0z" fill="none"></path><path d="M18 16c-.79 0-1.5.31-2.03.81L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.53.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.48.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.12c-.05.22-.09.45-.09.69 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3zm0-12c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></svg><span className="indIKd wEzsrc cS4Vcb-pGL6qe-lfQAOe">শেয়ার করুন</span></div></div><a jscontroller="pHHwKf" jsaction="VQKSsc:qdhiVe;wSc0Ee:n6NZAb;uyzWMd:rSzake;qdhiVe;" className="wIk0sb" role="button" tabIndex="0" data-immersive="true" data-ved="2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQ9S16BAgAEA4" data-bucket="Report-this-Result IS" data-psd="feedbackType:Report this result;featureId:IMAGES;searchResultUrl:https://bn.quora.com/graha-kayati-ki-ki;docId:LZ8Avi0wgE2BXM;"><svg className="sFT5O indIKd gRAwSd" viewBox="0 0 24 24" focusable="false" height="20" width="20"><path d="M0 0h24v24H0z" fill="none"></path><path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"></path></svg><span className="indIKd wEzsrc cS4Vcb-pGL6qe-lfQAOe">মতামত দিন</span></a></div></div><div className="SLLhk"><button jsaction="trigger.Hqc3Od" className="uj1Jfd wv9iH iM6qI" jsname="tqp7ud" aria-label="বন্ধ করুন" data-ved="2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQiRx6BAgAEA8" jslog="3593;ved:2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQiRx6BAgAEA8;track:click">
                {isAuth ? <div title='Logout Profile' onClick={logoutNow} className="ioQ39e wv9iH MjJqGe  cd29Sd mitem" jsname="vbgB1c"><svg viewBox="0 0 24 24" focusable="false" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></div> : 
                
                <div title='Login Profile' onClick={()=> navigate('/login')} className="ioQ39e wv9iH MjJqGe  cd29Sd mitem" jsname="vbgB1c">
                <BiLogIn style={{color:'#70757a',fontSize:23,position:'relative',left:'-2px'}} />
                </div>
                 }
                
                </button></div>
                &nbsp;&nbsp;
</div>
</div>
  )
}

export default Navbar
