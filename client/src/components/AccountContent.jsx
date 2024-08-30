import React, { useEffect, useState } from 'react'
import '../assets/styles/Overview.css'
import '../assets/styles/Account.css'
import { MdOutlineArrowBack } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5"
import { CiCamera } from "react-icons/ci";
import { BsCheck } from "react-icons/bs";
import { LuLoader } from "react-icons/lu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios'
import {toast} from 'react-toastify'
import profile from '../assets/img/profile.png'


function AccountContent() {
    const [loading, setLoad] = useState(false);
    const {isAuth, loadUser, cUser, token} = useAuth();
    const [image, setImage] = useState(null);
    const [camera,setCamera] = useState(false);
    const [luimg,setluimg] = useState(false);
    const [tempimg, settempimg] = useState(null);
    const navigate = useNavigate();

    const camerafalse = ()=>{
      if(tempimg==null) {
        setCamera(false)
      }else{
        setCamera(true)
      }
    }

    const trychangeimg = async(e)=>{
      const imginfo = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        settempimg(e.target.result);
      };
      console.log( reader.readAsDataURL(e.target.files[0]))
      if(imginfo.size > 100986) return toast.warning('Image size required mustbe lessthen 100KB')
      setImage(imginfo);
      // this
    }

    const updatesimg = async(e)=>{
      e.preventDefault();
      setluimg(true)
     if(image==null) return toast.warning('upload your image fast!')
    const formData = new FormData();
    formData.append("image", image);

   try{
    const response = await fetch(`${window.location.origin}/upload-image`,{
      method:"POST",
      headers:{
        'uid':cUser._id,
        'Accept': '*/*',
      },
      body: formData
    });
    const rs = await response.json();
    if(response.ok){
      loadUser();
      toast.success(rs.message)
      setluimg(false)
      settempimg(null);
    }else{toast.error(rs.message)}
   }catch(err){
    console.log('request send error')
   }
    }
   
  return (
    <div onMouseOut={camerafalse}>
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
        {camera ?  <form  onSubmit={updatesimg}><label htmlFor='upload'> {tempimg ? 
          <button style={{border:'none',background:'none',outline:'none'}} disabled={luimg?true:false}> {luimg ? <LuLoader /> : <BsCheck style={{borderRadius:'50%'}} /> } </button> : <CiCamera />}  </label> <input accept="image/*" type="file" onChange={(e)=> trychangeimg(e)} id="upload" hidden/>
        </form> : ''}
        {tempimg != null ? <img src={tempimg} /> : 
        <img src={cUser.face=='face' ? profile : `../src/images/students/${cUser.face}`} alt={cUser.face} />
      }
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
