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
    const [cData, setcData] = useState([]);
    const [enroll, setEnroll] = useState(null);

    useEffect( ()=>{
        //loadUser();
        getExam(params.id);
    },[]);
    
    const getExam = async (paramsid)=>{
        const url = `http://localhost:3000/api/exam/getone/`;
        try{
            const response = await fetch(url, {
                method: "GET",
                headers:{
                    "examid": paramsid,
                    "cstudent": isAuth ? cUser._id : null,
                    "Content-Type":"application/json"
                }
            });
            const ress = await response.json();
            if(response.ok){
                setcData(ress.edata);
                setEnroll(ress.enroll);
                setLoad(false);
                console.log(ress.edata)
            }else{
                // exits this page, or not rendering data this page.
            }
        }catch(err){
            console.error(`this erro ${err}`)
        }
    }

    // jon now
    const joinNow = ()=>{
        // let's check is logged in or not || check already joinned or not
        if(!isAuth){ return navigate('/register') }
        // payment window loading.
        
        // get order function call, parse -> token, eid -> record stored, then load again current data.
        joinExam(token, cData._id);
    }
    const joinExam = async (token, examid)=>{
        const url = 'http://localhost:3000/api/exam/enroll';
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
  return (
    <div>
      <div className="inform" style={{paddingBottom:13,borderRadius:3,marginBottom:5,borderRadius:5,}}>
<div className="informlft">
   <div style={{display:'flex',}}>
    <a href="#" onClick={()=> navigate('/')}><MdOutlineArrowBack /> Back</a> &nbsp;&nbsp;&nbsp;&nbsp;
   </div>

</div>

<div className="numinform">
<span style={{color:'#241111c9',fontSize:18,position:'relative',top:2,}}>
<span>26 Jan 2024</span> , <span>10:30AM</span></span>
</div>
</div>
<div className="data_context" >
<div className="main_content" style={{borderRadius:6}}>
    <img src={eimg} alt={eimg}
    style={{width:'100%',height:'100%',boxSizing:'border-box'}}
    />
</div>

<div className="exam_content">
<div className="t1">
<h1 className="indIKd GW0XC cS4Vcb-pGL6qe-fwJd0c">{cData.name}, 2024</h1>
<h3><strong>Join Fee:</strong> {cData.price} <FaBangladeshiTakaSign /></h3>
<h4><strong>Exam Date:</strong> 12 Semptember 2024, 12:00PM</h4>
<p> <button >
    <BsFilePdfFill />আরো বিস্তারিত জানতে ডাউনলোড করে পড়ুন</button></p>
</div>
<div className="t2">

<h2>List of awards - </h2>
    <ul>
        <li>8" Android Tablet</li>
        <li>Smart Phone</li>
        <li>Admission Book</li>
        <li>BUET Ti-Shirt</li>
    </ul>
</div>
<div className="t3">
<div className="g">
    <h2>Exam Rules – </h2>
</div>
<ol>
    <li>Camera Restriction</li>
    <li>Location Restriction</li>
    <li>IP Change Restriction</li>
</ol>
 <div className='cancelexam'>
 <button>যে যে কারণে আপনাকে পরীক্ষা থেকে বাতিল ঘোষণা করা হতে পারে <GoArrowRight /> </button>
 </div>
</div>
<div className="t4">
<marquee>Exam Audit & Maintained by - Education Care Point, Powered by - IT SATELLITE </marquee>
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
</div>
    </div>
  )
}

export default OverviewContent
