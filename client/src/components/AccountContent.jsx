import React, { useEffect, useState } from 'react'
import '../assets/styles/Overview.css'
import { MdOutlineArrowBack } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5"
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import profile from '../assets/img/profile.png'

function AccountContent() {
    const [loading, setLoad] = useState(false);
    const {isAuth, cUser, token} = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [cData, setcData] = useState([]);
    const [enroll, setEnroll] = useState(null);
  return (
    <div>
      <div className="inform pb0 mt63" style={{marginBottom:1,}}>
<div className="informlft" style={{paddingLeft:0,}}>

   <div>
    <a href="#" onClick={()=> navigate('/')}><MdOutlineArrowBack /> Back</a> &nbsp;&nbsp;&nbsp;&nbsp;
   
   </div>

</div>
<div className='ptitle'></div>
{/* <div className='lc'> Last logged In: 11 February 2024, 12:00PM
</div> */}
<div className="numinform ecount">
</div>
</div>
<div className="data_context" style={{height:'71.4vh'}}>
<div className="exam_content">
<div className="main_content bgmc" style={{position:'relative',justifyContent:'center'}}>

<div className='profile_img'>
    <div className='content_img'>
        <img src={profile} alt="" />
    </div>
</div>
{/* <div className='accesslink'>
    <CiShare2 />
    <IoIosLink />
    <RiGlobalLine />
</div> */}
</div>

<div className="t2 tu space8" style={{background:'#ffff',boxShadow:'none'}}>
    <table className='bnone'><tbody><tr key={1}><th>Name</th><td>{cUser.name}</td><th>Date of Birth</th><td>{cUser.dob}</td></tr><tr key={2}><th>Father's Name</th><td>{cUser.fname}</td><th>Mother's Name</th><td>{cUser.mname}</td></tr><tr key={3}><th>Mobile No</th><td>{cUser.phone}</td><th>Student ID</th><td>{cUser.studentid}</td></tr>
    <tr key={5}><th>Institute Name</th><td>{cUser.institute}</td><th>Qualification</th><td>{cUser.classref} - {cUser.session}</td></tr>
    <tr key={4}><th> Address</th><td style={{textAlign:'center'}}>{cUser.village}, {cUser.postcode} - {cUser.upazilla}, {cUser.zilla}</td><th>IP Address</th><td style={{color:'red'}}>{cUser.ipaddress}</td></tr><tr key={7}><td colSpan={'4'}><div className='pbtn' style={{color:'green',textAlign:'center',justifyContent:'right'}}><NavLink to={'/edit-profile'}><button ><IoSettingsOutline /> Edit Profile</button></NavLink></div></td></tr></tbody></table>
</div>



</div>

</div>
    </div>
  )
}

export default AccountContent
