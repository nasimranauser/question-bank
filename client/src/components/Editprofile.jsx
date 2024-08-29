import React, { useEffect, useState } from 'react'
import '../assets/styles/Overview.css'
import '../assets/styles/Form.css'
import { MdOutlineArrowBack } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5"
import { BsCheck } from "react-icons/bs";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

function Editprofile() {
    const [loading, setLoad] = useState(false);
    const {isAuth, cUser, token} = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [cData, setcData] = useState([]);
    const [enroll, setEnroll] = useState(null);
    const [data, setData] = useState({
      name:cUser.name,face:cUser.face,dob:cUser.dob,fname:cUser.fname,mname:cUser.mname,
      village:cUser.village,postcode:cUser.postcode,upazilla:cUser.upazilla,zilla:cUser.zilla,email:cUser.email,
      phone:cUser.phone,insititue:cUser.insititue,session:cUser.session,classref:cUser.classref,deparmentref:cUser.deparmentref,
    });

    const handleInput = (e)=>{
      const {name, value} = e.target;
      setData({...data,
          [name]:value
      })
  }
    const saveprofile = async()=>{
      const url = '';
      // let's check valid or not.
      if(data.name && data.dob && data.fname && data.mname && data.village && data.postcode
        && data.upazilla && data.zilla && data.email && data.phone && data.insititue && data.session
        && data.classref && data.deparmentref){
          try{
            const response = await fetch(url, {
              method:'POST',
              headers:{
                "Content-Type":"application/json",
              }
            });
            const rsdata = await response.json();
            if(response.ok){
              toast.success('Profile is updated!')
            }else{
              toast.error('Please wait a few moment, then try again!')
            }
          }catch(err){
            console.log('request error!')
          }
        }else{
          return toast.warning('All input field are required!');
        }
      
    }
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
 <div>
  <h3>Edit Profile</h3>
 </div>
<div className="t2 tu space8" style={{background:'#ffff',boxShadow:'none'}}>
    <form className='bnone'>
    <div className='field' key={1}><label>Name</label>
    <input type='text' name='name' onChange={(e)=> handleInput(e)} value={data.name} />
    </div>
   <div className='field'> <label>Date of Birth</label>
   <input type='date' name='dob' onChange={(e)=> handleInput(e)} value={data.dob} />
   </div>
   <div className='field' key={2}><label>Father's Name</label>
   <input type='text' name='fname' onChange={(e)=> handleInput(e)} value={data.fname} />
   </div>
   <div className='field'>
   <label>Mother's Name</label>
   <input type='text' name='mname' onChange={(e)=> handleInput(e)} value={data.mname} />
   </div>
   <div className='field' key={3}><label>Mobile No</label>
   <input type='text' name='phone' onChange={(e)=> handleInput(e)} value={data.phone} />
   </div>
   <div className='field' key={3}><label>Email <small>(optional)</small></label>
   <input type='text' name='email' onChange={(e)=> handleInput(e)} value={data.email} />
   </div>
    <div className='field' key={5}><label>Institute Name</label>
    <input type='text' name='institute' onChange={(e)=> handleInput(e)} value={data.institute} />
    </div>
    <div className='field'>
    <label>Class</label>
    <input type='text' name='classref' onChange={(e)=> handleInput(e)} value={data.classref}/>
    </div>
    <div className='field'>
    <label>Deparment</label>
    <input type='text' name='deparmentref' onChange={(e)=> handleInput(e)} value={data.deparmentref}/>
    </div>
    <div className='field'>
    <label>Session</label>
    <input type='text' name='session' onChange={(e)=> handleInput(e)} value={data.session}/>
    </div>
    <div className='field'>
    <label> Address</label>
    </div>
    <div className='field gidfield' key={4}>
     <div> <input type='text' name='village' placeholder='Village' onChange={(e)=> handleInput(e)} value={data.village} /></div>
    <div>
    <input type='text' placeholder='Postal code' name='postcode' onChange={(e)=> handleInput(e)} value={data.postcode} />
    </div>
    </div>
    <div className='field gidfield' key={4}>
    <div>
     <select onChange={(e)=> handleInput(e)} value={data.upazilla} name='upazilla'>
      <option value>Upazilla</option>
      <option selected value={data.upazilla}>{data.upazilla}</option>
      {data.upazilla !='Haripur' ? <option>Haripur</option> : ''}
      {data.upazilla !='Baliadangi' ? <option>Baliadangi</option> : ''}
      {data.upazilla !='Pirganj' ? <option>Pirganj</option> : ''}
      {data.upazilla !='Ranisankail' ? <option>Ranisankail</option> : ''}
     </select>
    </div>
    <div>
    <select onChange={(e)=> handleInput(e)} value={data.zilla} name='zilla'>
    <option value>Zilla</option>
    <option selected value={data.zilla}>{data.zilla}</option>
   </select>
    </div>
    </div>
    <div className='field' key={7}>
    <div className='pbtn' style={{color:'green',textAlign:'center',justifyContent:'right'}}>
    <button onClick={saveprofile} ><BsCheck /> Save Profile</button>
    </div>
    </div>
    </form>
</div>



</div>

</div>
    </div>
  )
}

export default Editprofile
