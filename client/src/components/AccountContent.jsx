import React, { useEffect, useState } from 'react'
import '../assets/styles/Overview.css'
import { MdOutlineArrowBack } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RiPrinterCloudFill } from "react-icons/ri";
import { CiShare2 } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { RiGlobalLine } from "react-icons/ri";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { CgProfile } from "react-icons/cg";
import { PiReadCvLogo } from "react-icons/pi";
function AccountContent() {
    const [loading, setLoad] = useState(false);
    const {isAuth, cUser, token} = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [cData, setcData] = useState([]);
    const [enroll, setEnroll] = useState(null);
  return (
    <div>
      <div className="inform pb0" style={{marginBottom:1,}}>
<div className="informlft" style={{paddingLeft:0,}}>

   <div>
    <a href="#" onClick={()=> navigate('/')}><MdOutlineArrowBack /> Back</a> &nbsp;&nbsp;&nbsp;&nbsp;
   
   </div>

</div>
<div className='ptitle'></div>
<div className='lc'> Last logged In: 11 February 2024, 12:00PM
</div>
<div className="numinform ecount">
</div>
</div>
<div className="data_context" style={{height:'71.4vh'}}>
<div className="exam_content">
<div className="main_content bgmc" style={{position:'relative',}}>

<div className='profile_img'>
    <div className='content_img'>
        <img src="./user.jpg" alt="" />
    </div>
</div>
<div className='accesslink'>
    <CiShare2 />
    <IoIosLink />
    <RiGlobalLine />
</div>
</div>

<div className="t2 tu" style={{background:'#ffff',boxShadow:'none'}}>
    <table className='bnone'>
        <tr>
            <th>Name</th>
            <td>{cUser.name}</td>
            <th>Date of Birth</th>
            <td>{cUser.dob}</td>
        </tr>
        <tr>
            <th>Father's Name</th>
            <td>{cUser.fname}</td>
            <th>Mother's Name</th>
            <td>{cUser.mname}</td>
        </tr> <tr>
            <th>Mobile No</th>
            <td>{cUser.phone}</td>
            <th>Student ID</th>
            <td>#ID12345678</td>
        </tr>
        <tr>
            <th>P. Address</th>
            <td colSpan={'3'} style={{textAlign:'center'}}>{cUser.village}, {cUser.postcode} - {cUser.upazilla}, {cUser.zilla}</td>
        </tr>
        <tr>
            <th>School/ College</th>
            <td>{cUser.institute}</td>
            <th>Qualification</th>
            <td>SSC - {cUser.session}</td>
            
        </tr>
        <tr>
            <th>IP Address</th>
            <td>{cUser.ipaddress}</td>
            <th>Device Location</th>
            <td>5120 Ranisankail</td>
        </tr>
        <tr>
            <th>Join Date</th>
            <td>01 August 2024</td>
            <th>Last Login</th>
            <td>18 September 2024, 12:00PM</td>
        </tr>

        <tr>
            <td colSpan={'4'}>
                <div className='pbtn'>
                <button><RiPrinterCloudFill /> Print Document</button>
                <button ><PiReadCvLogo /> Open Portfolio</button> 
                <button ><IoSettingsOutline /> Edit Information</button> 
                </div>
            </td>
        </tr>
    </table>

</div>



</div>

</div>
    </div>
  )
}

export default AccountContent
