import React, {useState, useEffect} from 'react'
import { MdOutlineCastForEducation } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdPermContactCalendar } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import '../assets/styles/Register.css'
import '../assets/styles/auth.css'
import { useAuth } from '../context/auth';
import { useNavigate, Navigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

function Registercontent() {
    const {token, storeTokenLS} = useAuth();
    const navigate = useNavigate();
    if(token){
        navigate('/');
    }
    // state managment
    const [user,setUser] = useState({
        name:'', face:'face', dob:'', fname:'', mname:'', studentid: `qb${Math.random().toString(36).substr(2, 9)}id`,
       village:'', postcode:'',upazilla:'',zilla:'',
        email:'',phone:'',
        institute:'', session:'', classref:'', deparmentref:'',
        ipaddress:'',devicelocation:'',
    });
    const [form1, setForm1] = useState(true);
    const [form2, setForm2] = useState(false);
    const [form3, setForm3] = useState(false);
    const [form4, setForm4] = useState(false);
    const [isVerified, setisVerified] = useState(localStorage.getItem('verify'));
    // get ip address
    useEffect(() => {
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => setUser({...user, ipaddress: data.ip}))
        .catch(error => console.log(error))
    }, []);

    // handle function
    const handleInput = (e)=>{
        const {name, value} = e.target;
        setUser({...user, 
            [name]:value
        });
    }
    const next = ()=>{
        if(form1){
            // check idenity, step 4 = gendar, relagion, img
            if(user.name=='' && user.dob=='' && user.fname=='' && user.mname==''){
                toast.warning('student information is required')
            }
            else if(user.name==''){
                toast.warning('Please enter your name!')
            }else if(user.dob==''){
                toast.warning('Please enter your date of birth!')
            }else if(user.fname==''){
                toast.warning('Please enter your father name!')
            }else if(user.mname==''){
                toast.warning('Please enter your mother name!')
            }else{
            setForm1(false)
            setForm2(true)
            setForm3(false)
            }
        }else if(form2){
            if(user.village==''){
                toast.warning('Please enter village name!')
            }else if(user.postcode==''){
                toast.warning('Please enter postal name!')
            }else if(user.upazilla==''){
                toast.warning('Please select upazilla name!')
            }else if(user.zilla==''){
                toast.warning('Please select zilla name!')
            }else{
            setForm1(false)
            setForm2(false)
            setForm3(true)
            }  
        }
        else if(form3){
            // submit this,
            if(user.institute==''){
                toast.warning('Please select your institute name!')
            }else if(user.session==''){
                toast.warning('Please select your session!')
            }else if(user.classref==''){
                toast.warning('Please select your class!')
            }else if(user.deparmentref==''){
                toast.warning('Please select your deparment!')
            }else{
            setForm1(false)
            setForm2(false)
            setForm3(false)
            setForm4(true)
            }
        }
    }
    
    const back = ()=>{
        // let's check
        if(form2==true){
            setForm2(false);
            setForm1(true);
            setForm3(false);
            setForm4(false);
        }else if(form3==true){
            setForm3(false)
            setForm2(true)
            setForm1(false)
            setForm4(false)
        }else if(form4==true){
            setForm4(false)
            setForm3(true)
            setForm2(false)
            setForm1(false)   
        }
        else{
            setForm1(true)
            setForm2(false)
            setForm3(false)
            setForm4(false)
        }
    }

    const submit = async()=>{
        // loading start
        const url = 'http://localhost:3000/api/auth/register';
        if(user.phone==''){
            toast.warning('Enter your phone number!')
        }else if(user.ipaddress==''){
            toast.warning('Ip address is empty!')
        }else if(user.devicelocation==''){
            toast.warning('device identity is missing!')
        }else{
                try{
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(user)
                });
                console.log(response)
                const res_data = await response.json();
                if(response.ok){
                    toast.success("Account created success.")
                storeTokenLS(res_data.token)
                // navigate home 
                setTimeout( ()=>{
                    navigate('/home')
                },500);
                }else if(res_data.status==false){
                    toast.error(res_data.message)
                }
             else{
                console.log(res_data)
            }
            }catch(err){
                console.log(`request sending err ${err}`)
            }
        }            
    }


  return (
    <div className="register mt63">
    <div className="note">
        
       <h2><MdAccountBox / >Create -Student Account </h2>
    </div>
    <div className="regcontent">

        {form1 ? <div className="part_i">
            <div className="field flexthis">
           <div>
           <label style={{display:'flex', alignItems:'center', justifyContent:'center', gap:2}} htmlFor="0"><IoIosInformationCircleOutline style={{fontSize:'22px', fontWeight:600}} / >Fillup your primary info</label>
            </div>
            <div className='statusicon'>
                <IoIosCheckmarkCircleOutline />
                <IoClose />
                <IoClose />
                <IoClose />
            </div>
        </div>
           <div className="field">
               <label htmlFor="a">Name of the student</label>
               <input type="text" name='name' onChange={(e)=> handleInput(e)} value={user.name}  />
               </div>
           <div className="field">
               <label htmlFor="b">Date of birth</label>
               <input type='date' name='dob' value={user.dob} onChange={(e)=> handleInput(e)} />
           </div>
           <div className="field">
               <label htmlFor="c">Father name</label>
               <input type="text" name='fname' onChange={(e)=> handleInput(e)} value={user.fname} />
           </div>
           <div className="field">
               <label htmlFor="d">Mother name</label>
               <input type="text" name='mname' onChange={(e)=> handleInput(e)} value={user.mname} />
           </div>    
       </div>  : 
        form2 ? <div className="part_i">
        <div className="field flexthis">
           <div>
           <label style={{display:'flex', alignItems:'center', justifyContent:'center', gap:2}} htmlFor="0"><CiLocationOn style={{fontSize:'26px', fontWeight:600}} / > Fillup your Identity</label>
            </div>
            <div className='statusicon'>
                <IoIosCheckmarkCircleOutline />
                <IoIosCheckmarkCircleOutline />
                <IoClose />
                <IoClose />
            </div>
        </div>
           <div className="field">
               <label htmlFor="a">Village</label>
               <input type="text" onChange={(e)=> handleInput(e)} name='village' value={user.village}  />
           </div>
           <div className="field">
               <label htmlFor="b">Post Code</label>
               <input type="number" onChange={(e)=> handleInput(e)} name='postcode' value={user.postcode} />
           </div>
           <div className="field">
               <label htmlFor="c">Point Zilla</label>
               <select onChange={(e)=> handleInput(e)} name='zilla' value={user.zilla}>
                 <option>Select One</option>
                 <option value='Thakurgaon'>Thakurgaon</option>
               </select>
               
           </div>
           <div className="field">
               <label htmlFor="d">Point Upazilla</label>
               
               <select onChange={(e)=> handleInput(e)} name='upazilla' value={user.upazilla}>
                 <option>Select One</option>
                 <option value='Haripur'>Haripur</option>
                 <option value='Ranisankail'>Ranisankail</option>
                 <option value='Pirganj'>Pirganj</option>
                 <option value='Baliadangi'>Baliadangi</option>
               </select>
           </div>    
       </div>  : form3 ? 
       <div className="part_i">
       <div className="field flexthis">
           <div>
           <label style={{display:'flex', alignItems:'center', justifyContent:'center', gap:2}} htmlFor="0"><MdOutlineCastForEducation style={{fontSize:'26px', fontWeight:600}} / > Fillup your Educational background</label>
            </div>
            <div className='statusicon'>
                <IoIosCheckmarkCircleOutline />
                <IoIosCheckmarkCircleOutline />
                <IoIosCheckmarkCircleOutline />
                <IoClose />
            </div>
        </div>

           <div className="field">
               <label htmlFor="a">Institute Name</label>
               <select onChange={(e)=> handleInput(e)} name='institute' value={user.institute}>
                <option>Select One</option>
                <option value={'Ranisankail Degree College'}> Ranisankail Degree College</option>
                <option value={'Pirganj Govt College'}> Pirganj Govt College</option>
                <option value={'Ranisankail Govt High School'}> Ranisankail Govt High School</option>
                <option value={'Ranisankail BM College'}> Ranisankail BM College</option>
                <option value={'Gazirhat Degree College'}> Gazirhat Degree College</option>
                <option value={'Nekmoroad Alimuddin Govt College'}> Nekmoroad Alimuddin Govt College</option>
              </select>
           </div>
           <div className="field">
               <label htmlFor="b">Session</label>
               
                <select onChange={(e)=> handleInput(e)} name='session' value={user.session}>
                    <option>Select one</option>
                    <option value='2024'>2024</option>
                </select>
           </div>
           <div className="field">
               <label htmlFor="b">Class Name</label>
               
               <select onChange={(e)=> handleInput(e)} name='classref' value={user.classref}>
                <option>Select One</option>
                <option value={'Class X'}> Class X</option>
                <option value={'HSC 1st Year'}> HSC 1st Year</option>
                <option value={'HSC 2ndt Year'}> HSC 2nd Year</option> 
              </select>
           </div>
           <div className="field">
               <label htmlFor="c">Deparment Name</label>
               
               <select onChange={(e)=> handleInput(e)} name='deparmentref' value={user.deparmentref}>
                <option>Select One</option>
                <option value={'Null'}>Null</option>
                <option value={'Sicence'}> Sicence</option>
                <option value={'Humanity'}> Humanity</option>
                <option value={'Business Studies'}> Business Studies</option>
              </select>
           </div>
           
       </div>

            : 
            <div className="part_i">
            <div className="field flexthis">
           <div>
           <label style={{display:'flex', alignItems:'center', justifyContent:'center', gap:2}} htmlFor="0"><MdPermContactCalendar style={{fontSize:'26px', fontWeight:600}} / > Contact Info & Current Device Info</label>
            </div>
            <div className='statusicon'>
                <IoIosCheckmarkCircleOutline />
                <IoIosCheckmarkCircleOutline />
                <IoIosCheckmarkCircleOutline />
                <IoIosCheckmarkCircleOutline />
            </div>
        </div>
    
           <div className="field">
               <label htmlFor="a">Mobile Number</label>
               <input type="number" onChange={(e)=> handleInput(e)} name='phone' value={user.phone} />
           </div>
           <div className="field">
               <label htmlFor="b">Email Address <small>(optional)</small></label>
               <input type="email" onChange={(e)=> handleInput(e)} name='email' value={user.email} />
           </div>
           <div className="field">
               <label htmlFor="c">Current IP Address</label>
               <input type="text" onChange={(e)=> handleInput(e)} name='ipaddress' disabled value={user.ipaddress} />
           </div>
           <div className="field">
               <label htmlFor="d">Reference </label>
               <input type="text" onChange={(e)=> handleInput(e)} name='devicelocation' value={user.devicelocation} />
           </div>    
       </div>
       }
       
       <div className="controls">
           {form1 != true ? <button onClick={back}>Back</button> : <button onClick={()=> location.reload()}>Reset</button> }
           {form4 != true ? <button onClick={next}>Next</button> :  <button onClick={submit}>submit</button> }
       </div>
       <div className="login_op">
           <span>Already have an account?&nbsp;</span><NavLink to="/login"> Login Now</NavLink>
       </div>
    </div>
 </div>
  )
}

export default Registercontent
