import React, { useEffect, useState } from 'react'
import eimg from '../../public/examimg.jpg';
import '../assets/styles/Overview.css'

import { MdOutlineArrowBack } from "react-icons/md";
import { BsFilePdfFill } from "react-icons/bs";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

function OverviewContent() {
    const {isAuth, cUser, token} = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoad] = useState(true);

    const [enroll, setEnroll] = useState(null);
    const [nexam, setnExam] = useState({});
    const [dtime, setdtime] = useState('');
    const [time, settime] = useState('');
    const [authority, setathority] = useState('');
    const [rules, setRules] = useState({});
    const [award, setAward] = useState({});

    useEffect( ()=>{
        //loadUser();
        getExam();
    },[]);
    
    const getExam = async ()=>{
        const url = `${window.location.origin}/api/exam/get/${params.id}/${isAuth? cUser._id : null}`;
        try{
            const response = await fetch(url, {
                method: "GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const ress = await response.json();
            if(response.ok){
                setTimeout( ()=>{
                    setnExam(ress.data)
                    const datetostr = new Date(ress.data.schedule.datetime).toString().substring(0,15);
                   setdtime(datetostr);
                   settime(ress.data.schedule.timespam);
                   setathority(ress.data.authority.orgname)
                   setRules(ress.data.rules);
                   setAward(ress.data.award)
                   setEnroll(ress.enroll)
                   setLoad(false);
                },1000)
            }else{
                setnExam({});
                console.log('faild to getting exam information!')
                // exits this page, or not rendering data this page.
            }
        }catch(err){
            setnExam({});
            console.error(`this erro ${err}`)
        }
    }

    // jon now
    const joinNow = ()=>{
        // let's check is logged in or not || check already joinned or not
        if(!isAuth){ return navigate('/register') }
        // payment window loading.
        // get order function call, parse -> token, eid -> record stored, then load again current data.
        joinExam(token, nexam._id);
    }
    const joinExam = async (token, examid)=>{
        const url = `${window.location.origin}/api/exam/enroll`;
        try{
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization":`Bearer ${token}`,
                    "Content-Type":"application/json"
                   
                },
                body: JSON.stringify({ examid:examid })
            });
            const res = await response.json();
            if(response.ok){
                console.log(res.message);
                toast.success('Congraculation! You have joinned successfully this exam.')
                getExam(params.id);
            }
        }catch(err){
            console.error(`Exam joinning error ${err}`)
        }
    }
    console.log(enroll)
  return (
    <div>
        <div style={{height:10,}}></div>
      <div className="inform mt63" style={{paddingBottom:13,marginBottom:5,borderRadius:5,}}>
<div className="informlft">
   <div style={{display:'flex',}}>
    <a href="#" onClick={()=> navigate('/')}><MdOutlineArrowBack /> Back</a> &nbsp;&nbsp;&nbsp;&nbsp;
   </div>

</div>
<div className="numinform">
<span style={{color:'#241111c9',fontSize:18,position:'relative',top:2,}}>
<span>{''} </span> , <span>{''} </span></span>
</div>
</div>
{loading ? 
 <div style={{fontSize:17,color:'#333',textAlign:'center',padding:60,}}> Loading... </div>
 :     <div>
 <div className="data_context" >
 <div className="main_content" style={{borderRadius:6}}>
     <img src={nexam.refurl} alt={'exam image'}
     style={{width:'100%',height:'100%',boxSizing:'border-box'}}
     />
 </div>
 
 <div className="exam_content">
 <div className="t1">
 <h1 className="indIKd GW0XC cS4Vcb-pGL6qe-fwJd0c">{nexam.name}, 2024</h1>
 <h3><strong>Join Fee:</strong> {nexam.price} <FaBangladeshiTakaSign /></h3>
 <h4><strong>Exam Date:</strong> {dtime}, {time}</h4>
 {/*<p> <button > 
     <BsFilePdfFill />আরো বিস্তারিত জানতে ডাউনলোড করে পড়ুন</button></p> */}
 </div>
 <div className="t2">
 
 <h2>List of awards - </h2>
     <ul>
     {award.a1 ? <li> {award.a1} </li> : '' }
     {award.a2 ? <li> {award.a2} </li> : '' }
     {award.a3 ? <li> {award.a3} </li> : '' }
     {award.a4 ? <li> {award.a4} </li> : '' }
     {award.a5 ? <li> {award.a5} </li> : '' }
     {award.a6 ? <li> {award.a6} </li> : '' }
     {award.a7 ? <li> {award.a7} </li> : '' }
     {award.a8 ? <li> {award.a8} </li> : '' }
     {award.a9 ? <li> {award.a9} </li> : '' }
     {award.a10 ? <li> {award.a10} </li> : '' }
     </ul>
 </div>
 <div className="t3">
 <div className="g">
     <h2>Exam Rules – </h2>
 </div>
 <ol>
     {rules.r1 ? <li> {rules.r1} </li> : '' }
     {rules.r2 ? <li> {rules.r2} </li> : '' }
     {rules.r3 ? <li> {rules.r3} </li> : '' }
     {rules.r4 ? <li> {rules.r4} </li> : '' }
     {rules.r5 ? <li> {rules.r5} </li> : '' }
 </ol>
 {/* <div className='cancelexam'>
  <button>যে যে কারণে আপনাকে পরীক্ষা থেকে বাতিল ঘোষণা করা হতে পারে <GoArrowRight /> </button>
  </div> */}
 </div>
 <div className="t4">
 <marquee>Exam Audit & Maintained by - {authority}, Powered by - IT SATELLITE </marquee>
 </div>
 </div>
 
 
 </div>
 <div className="enroll">
 <div className="e1">
 <input type="checkbox" name='check' id='check' htmlFor='check' />
 <p htmlFor='check'>Agree exam terms, <a href="#">Read terms</a></p>
 </div>
 {enroll ? <button style={{background:'#a4acb0',borderColor:'gray'}}>You have an already Joinned this exam</button> :
  <button onClick={joinNow}>{isAuth ? 'Join Now' : 'Create Account then Join Now'}</button> }
 </div> </div>}
    </div>
  )
}

export default OverviewContent
