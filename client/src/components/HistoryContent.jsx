import React, { useEffect, useState } from 'react'
import '../assets/styles/Overview.css'
import { MdOutlineArrowBack } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

function HistoryContent() {
    const [loading, setLoad] = useState(false);
    const {isAuth, cUser, token} = useAuth();
    const navigate = useNavigate();
    const params = useParams();
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
<div className="data_context" style={{height:'68.6vh'}}>
<div className="exam_content">
<div className="t1 t1a headline" style={{width:'110px',}}>
<p > <MdHistory style={{fontSize:20,color:'green',}} /> History</p>
</div>
<div className="t2 tu">
    <table>
        <tr>
            <th>Sl</th>
            <th>Date</th>
            <th>History</th>
            <th>Remove</th>
        </tr>
        <tr>
            <td>1</td>
            <td>01 Jan 2024</td>
            <td>Joinned HSC ICT Pleminary Examination</td>
            <td style={{textAlign:'center'}}><button><CiCircleRemove style={{fontSize:29,color:'red'}} /></button></td>
        </tr>
      
      

        
    </table>

</div>



</div>

</div>
    </div>
  )
}

export default HistoryContent
