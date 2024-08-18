import React, { useEffect, useState } from 'react'
import '../assets/styles/Overview.css'
import { MdOutlineArrowBack } from "react-icons/md";
import { TbCircleCheckFilled } from "react-icons/tb";
import { MdSettingsBackupRestore } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { GoPackageDependents } from "react-icons/go";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

function JoinContent() {
    const [enrollData, setData] = useState([])
    const {isAuth, cUser, token} = useAuth();
    const navigate = useNavigate();
    useEffect( ()=>{
        getJoiningExam();
    },[])
    const getJoiningExam = async ()=>{
        const url = 'http://localhost:3000/api/exam/joining';
        try{
            const response = await fetch(url, {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            const rsdata = await response.json();
            if(response.ok){
                // console.log('getting joining exam.')
                setData(rsdata.joinedata);
            }else{
                console.log('cannot getting joining exam!')
            }
        }catch(err){
            console.log(`Joining exam getting error ${err}`);
            
        }
    }
  return (
    <div>
      <div className="inform pb0">
<div className="informlft" style={{paddingLeft:0,}}>

   <div>
    <a href="#" onClick={()=> navigate('/')}><MdOutlineArrowBack /> Back</a> &nbsp;&nbsp;&nbsp;&nbsp;
   
   </div>

</div>
<div style={{paddingLeft:56, textAlign:'center'}}>
</div>
<div className="numinform ecount">
</div>
</div>
<div className="data_context" style={{height:'68.5vh'}}>
<div className="exam_content">
<div className="t1 t1a headline">
<p> <TbCircleCheckFilled /> My Joinning Examination</p>
</div>

{enrollData.map( (r,i)=>{
    return(
      <div key={i} className="t2 tu">
    <div className="quickinfo">
    <h3>{i+1}</h3>
<marquee>Powered by - Nabodhar Bidda Niketon</marquee>
<span>2 Hours, 10 Minute, 5 Secound</span>
    </div>
    <table>
        <tbody>
        <tr key={1}><th>Exam name</th> <td>{r.exname}</td><th>Exam Authority</th><td>ABC Coaching Center</td></tr>
        <tr key={2}><th>Enrolled Price</th> <td>{r.inprice}Tk</td><th>Join Schedule</th> <td>{r.payment.trxtime}</td></tr>
        <tr key={3}><th>Print Terms</th> <td>Click to Download</td><th>Print Invoice</th> <td>Click to Download</td></tr>
        </tbody>
        
    </table>

   
        <p><IoMdInformationCircleOutline /> Make sure your smart phone/ computer - latop, microphone is ok, or don't work any device of your network, 10km is block</p>
    
   
    <div className="btn_group">
    <button><MdSettingsBackupRestore /> Return Exam</button>
    <NavLink to={`/question/${r.exname}/${r.examid}`}>
    <button><GoPackageDependents /> Go Exam Center</button>
    </NavLink>
    
    </div>
   

</div>  
    );
})}





</div>

</div>
    </div>
  )
}

export default JoinContent
