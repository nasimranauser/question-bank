import React, { useEffect, useState } from 'react'
import '../assets/styles/Overview.css'
import { MdOutlineArrowBack } from "react-icons/md";
import { TbCircleCheckFilled } from "react-icons/tb";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { GoPackageDependents } from "react-icons/go";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { SiImessage } from "react-icons/si";
import { RiProgress1Line } from "react-icons/ri";

function CompletedContent() {
    const [loading, setLoad] = useState(false);
    const {isAuth, cUser, token} = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [cData, setcData] = useState([]);
   useEffect( ()=>{
     isAuth ?  gcdata() : '';
   },[]);
   const gcdata = async()=>{
    const url = `${window.location.origin}/api/exam/completed`;
    try{
        const response = await fetch(url, {
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        });
        const rs = await response.json();
        if(response.ok){
           console.log('ok');
           setcData(rs.data)
        }else{console.log(rs.message)}
    }catch(err){
        console.error(err)
    }
   }
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
<div className="data_context" style={{height:'68.6vh'}}>
<div className="exam_content">
<div className="t1 t1a headline" style={{width:260,}}>
<p> <TbCircleCheckFilled /> My Complited Examination</p>
</div>
{cData.length == 0 ? 
 <div style={{textAlign:'center',padding:'10px 15px',background:'#f0fdfead'}}> <h3 style={{color:'#333333e8',fontWeight:500,}}>Not found! You haven't Completed any Exam!</h3> </div> 
:
<div>
{cData.map( (r, i)=>{
    const gdate = new Date(r.examdtime).toString().substring(0,15);
    return(
        <div className="t2 tu">
    <div className="quickinfo">
    <h3>{i+1}</h3>
<marquee>Powered by - {r.authority}</marquee>
<span>{gdate}, {r.examtime} </span>
    </div>
    <table>
        <tr>
            <th>Exam name</th> <td>{r.exname}</td>
            <th>Exam Authority</th> <td>{r.authority}</td>
        </tr>
        <tr>
            <th>Enrolled Price</th> <td>{r.inprice}Tk</td>
            <th>Join Schedule</th> <td>{gdate}, {r.examtime}</td>
        </tr>
        <tr>
            <th>Print Terms</th> <td>Link</td>
            <th>Print Invoice</th> <td>Link</td>
        </tr>

        
    </table>

   
        <p><IoMdInformationCircleOutline /> Make sure your smart phone/ computer - latop, microphone is ok, or don't work any device of your network, 10km is block</p>
    
   
    <div className="btn_group">

    <button style={{background:'#3d6f02',color:'#ffff'}}><RiProgress1Line /> Please waite your Result is Processing now</button>

    
    </div>
   

</div>
    )
})}
</div>

}


</div>

</div>
    </div>
  )
}

export default CompletedContent
