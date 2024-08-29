import React, { useEffect, useState } from 'react'
import '../assets/styles/Overview.css'
import '../assets/styles/Account.css'
import { MdOutlineArrowBack } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5"
import { CiCamera } from "react-icons/ci";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import profile from '../assets/img/profile.png'

function AccountContent() {
    const [loading, setLoad] = useState(false);
    const {isAuth, cUser, token} = useAuth();
    const [image, setImage] = useState(null);
    const [camera,setCamera] = useState(false);
    const navigate = useNavigate();
    
    const trychangeimg = async(e)=>{
      setImage(e.target.files[0]);
    }
    const updatesimg = async(e)=>{
      e.preventDefault();
     
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      "http://localhost:3000/api/auth/upload-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    }
  return (
    <div onMouseOut={()=> setCamera(false)}>
      <div className="inform pb0 mt63" style={{marginBottom:1,}}>
<div className="informlft" style={{paddingLeft:0,}}>

   <div>
    <a href="#" onClick={()=> navigate('/')}><MdOutlineArrowBack /> Back</a> &nbsp;&nbsp;&nbsp;&nbsp;
   
   </div>

</div>
<div className='ptitle'></div>
<div className="numinform ecount">
</div>
</div>
<div className="data_context" style={{height:'71.4vh'}}>
<div className="exam_content">
<div className="main_content bgmc" style={{position:'relative',justifyContent:'center'}}>

<div className='profile_img'>
    <div className='content_img' onMouseOver={()=> setCamera(true) }>
        {camera ?  <form onSubmit={updatesimg}><label htmlFor='upload'><CiCamera /> </label> <input accept="image/*" type="file" onChange={(e)=> trychangeimg(e)} id="upload" hidden/>
        <button>submit</button>
        </form> : ''}
        <img src={profile} alt="" />
    </div>
</div>
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
