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
    <span> Completed Examination: <span style={{color:'#d09014',fontWeight:'bold'}}>0</span></span>
</div>
</div>
<div className="data_context" style={{height:'68.6vh'}}>
<div className="exam_content">
<div className="t1 t1a headline" style={{width:260,}}>
<p> <TbCircleCheckFilled /> My Complited Examination</p>
</div>
{cData.length != 0 ? 
    <div className="t2 tu" style={{boxShadow:'none'}}>
    <table style={{background:'#ffff'}}>
        <tr>
            <th className='na' style={{textAlign:'center'}}><SiImessage /> Not have a any Completed Exam!</th> 
        </tr>
    </table>
</div>
:
<div>
<div className="t2 tu">
    <div className="quickinfo">
    <h3>1</h3>
<marquee>Powered by - Nabodhar Bidda Niketon</marquee>
<span>12 Jan 2024, 12:00PM </span>
    </div>
    <table>
        <tr>
            <th>Exam name</th> <td>HSC ICT Pleminary Exam</td>
            <th>Exam Authority</th> <td>ABC Coaching Center</td>
        </tr>
        <tr>
            <th>Enrolled Price</th> <td>105Tk</td>
            <th>Join Schedule</th> <td>12, Jan 2024, 12:00PM</td>
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
</div>

}


</div>

</div>
    </div>
  )
}

export default CompletedContent
