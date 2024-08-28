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
    const [reqload, setreqload] = useState(true)
    const {isAuth, cUser, token} = useAuth();
    const [livedate,setlivedate] = useState(null);
    // test
        const test = ()=>{
             return  setlivedate(new Date)
        }
        useEffect( ()=>{
            test();
        },[test]);
    // test
    const navigate = useNavigate();
    useEffect( ()=>{
        getJoiningExam();
    },[])
    // get minute.

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
                setData(rsdata.joinedata);
                setreqload(false);
            }else{
                setreqload(false)
                console.log('cannot getting joining exam!')
            }
        }catch(err){
            setreqload(false)
            console.log(`Joining exam getting error ${err}`);
            
        }
    }
    // this
  return (
    <div>
      <div className="inform pb0 mt63">
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

{enrollData.length == 0 ? <div style={{textAlign:'center',padding:'10px 15px',background:'#f0fdfead'}}> <h3 style={{color:'#333333e8',fontWeight:500,}}>{reqload ? 'Loading...' : 'Not found in any Enrolled Examination!'} </h3> </div> : ''}

{enrollData.map( (r,i)=>{
    // getting
    const gdate = new Date(r.examdtime).toString().substring(0,15);
    const gtime = r.examtime;
    // machine
    const date = new Date().toDateString();
        function AMPM(date) {
            var hours = date.getHours();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            var strTime =  ampm;
            return strTime;
          }
        function formatAMPM(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
          }
    // compare only day and month || houre.
     let message = '';
     let start = false;
     let finish = false;
     if(date==gdate){
        message = 'Ready to Join. Exam will be started a few moment later.';
     // hour and minute equal.
    var gampm = gtime.slice(-2);
    // step 1
        // step 2
            if(gampm == AMPM(livedate)){
                // step 3
                if(formatAMPM(livedate) >= gtime){
                    message = 'Exam is started now. Rush to the exam center';
                    start = true;
                 }
            }
    }else if(date>gdate){
        finish = true;
        message = "Exami date is over!";
    }
     // check, 4:30 is constand, but 4:30 is not constand.
    return(
      <div key={i} className={start ? "t2 tu sanim" : "t2 tu"}>
    <div className="quickinfo">
    <h3>{i+1}</h3>
<marquee>{message} Powered by - IT Satellite.</marquee>
<span>{gdate} {r.examtime} </span>
    </div>
    {finish ? <div style={{textAlign:'center'}}> <h3 style={{color:'red',marginBottom:8,}}>Exam is Finished</h3> </div> : ''}
    <table>
        <tbody>
        <tr key={1}><th>Exam name</th> <td>{r.exname}</td><th>Exam Authority</th><td>{r.authority}</td></tr>
        <tr key={2}><th>Enrolled Price</th> <td>{r.inprice}Tk</td><th>Join Schedule</th> <td style={{textAlign:'center'}}>{gdate}, {gtime}</td></tr>
        <tr key={3}><th>Print Terms</th> <td><button className='ivbtn'>Click to Download</button></td><th>Print Invoice</th> <td><button className='ivbtn'>Click to Download</button></td></tr>
        </tbody>
        
    </table>

   
        <p><IoMdInformationCircleOutline /> Make sure your smart phone/ computer - latop, microphone is ok, or don't work any device of your network, 10km is block</p>
    
   
    <div className="btn_group">
    <button disabled={finish? true : false}><MdSettingsBackupRestore /> Return Exam</button>
    <NavLink to={`/question/${r.exname}/${r.examid}`}>
    <button disabled={finish? true : false}><GoPackageDependents /> Go Exam Center</button>
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
