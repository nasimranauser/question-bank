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
    const [countdown, setcountdonw] = useState({})
    const {isAuth, cUser, token} = useAuth();
    const navigate = useNavigate();
    useEffect( ()=>{
        getJoiningExam();
    },[])
    // get minute.
    setInterval( ()=>{
       const sec = new Date().getSeconds();
        sec == 1 ? setcountdonw(true) : setcountdonw(false)
    },1000);
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
                // setexamData(rsdata)
                console.log(`full data ${rsdata}`)
            }else{
                console.log('cannot getting joining exam!')
            }
        }catch(err){
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

{enrollData.length == 0 ? <div style={{textAlign:'center',padding:'10px 15px',background:'#f0fdfead'}}> <h3 style={{color:'#333333e8',fontWeight:500,}}>Not found in any Enrolled Examination!</h3> </div> : ''}

{enrollData.map( (r,i)=>{
    // step 01
    const gdate = new Date(r.examdtime).toString().substring(0,15);
    const gtime = r.examtime;
    // devided.
    const gday = new Date(r.examdtime).getDate().toString();
    const gmonth = new Date(r.examdtime).getMonth()+1;
    // step 02
    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();
    // devided.
    const day = new Date(date).getDate().toString();
    const month = new Date(date).getMonth()+1;
    // compare only day and month || houre.
    let cday,cmonth;
    cday = day >= gday ? day - gday : gday - day; 
     cmonth = month >= gmonth ? month - gmonth : gmonth - month;
    // hour and minute.
    // step 1
    const hour = new Date().getHours();
    const min = new Date().getMinutes()
    // step 2
    let ghour =  gtime.substring(0,2);
    let gmin = parseInt(gtime.substring(2,4));
    // convert 
    // ampm 8 stat, 9 start.
    if(ghour[1]==":"){  
     ghour = parseInt( gtime.substring(0,1));
    }else{
      ghour = parseInt( gtime.substring(0,2));
    }
    // compare.
    let chour = ghour >= hour ? ghour - hour : hour - ghour;
    let cminute = gmin >= min ? gmin - min : min - gmin;
    // loop return evry 5 minute value, min==60 then call this function. is is equal then click go btn.
    return(
      <div key={i} className="t2 tu">
    <div className="quickinfo">
    <h3>{i+1}</h3>
<marquee>Powered by - IT Satellite.</marquee>
<span>{cmonth !=0? `${cmonth} Month` : ''} {cday} Days, {chour!=0 ? `${chour} Hours,`: ''}  {cminute !=0 ? `${cminute} Minutes`: 'Exam is Started'} </span>
    </div>
    <table>
        <tbody>
        <tr key={1}><th>Exam name</th> <td>{r.exname}</td><th>Exam Authority</th><td>{r.authority}</td></tr>
        <tr key={2}><th>Enrolled Price</th> <td>{r.inprice}Tk</td><th>Join Schedule</th> <td style={{textAlign:'center'}}>{gdate}, {r.examtime}</td></tr>
        <tr key={3}><th>Print Terms</th> <td><button className='ivbtn'>Click to Download</button></td><th>Print Invoice</th> <td><button className='ivbtn'>Click to Download</button></td></tr>
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
