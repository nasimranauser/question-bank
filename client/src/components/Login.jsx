import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker";
import { AiOutlineDrag } from "react-icons/ai";
import { MdAccountBox } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdPermContactCalendar } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import '../assets/styles/Register.css'
import { useAuth } from '../context/auth';
import { useNavigate, Navigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const {storeTokenLS} = useAuth();
      const [user, setUser] = useState({
          phone:'',studentid:'',
      });
      const inputHandle = (e)=>{
          const {name, value} = e.target;
          setUser({...user,
              [name]:value
          })
      }
      const login = async()=>{
          if(user.phone!='' && user.studentid!=''){
            const url = 'http://localhost:3000/api/auth/login';
            try{
              const response = await fetch(url, {
                  method:'POST',
                  headers:{
                      "Content-Type":"application/json"
                  },
                  body:JSON.stringify(user)
              });
              const rs = await response.json();
              if(response.ok){
                storeTokenLS(rs.token)
                  toast.success('Login success.')
                  setTimeout( ()=>{
                    navigate('/')
                  },500)
                 
              }else{
                  toast.error(rs.message)
              }
            }catch(err){
              console.log(err)
            }
  
          }else{
              toast.warning('All input are required!')
          }
      }
  return (
    <div className="register mt63">
    <div className="note">
        
       <h2><MdAccountBox / >Login -Student Account </h2>
    </div>
    <div className="regcontent">

       <div className="part_i">
            <div className="field flexthis">
           <div>
           <label style={{display:'flex', alignItems:'center', justifyContent:'center', gap:2}} htmlFor="0"><IoIosInformationCircleOutline style={{fontSize:'22px', fontWeight:600}} / > Fillup your login credentials</label>
            </div>
            <div className='statusicon' style={{width:40,}}>
                <IoIosCheckmarkCircleOutline />
            </div>
        </div>
        
           <div className="field">
               <label htmlFor="c">Phone number</label>
               <input type="text" name='phone' onChange={(e)=> inputHandle(e)} value={user.phone} />
           </div>
           <div className="field">
               <label htmlFor="d">Student ID</label>
               <input type="text" name='studentid' onChange={(e)=> inputHandle(e)} value={user.studentid} />
           </div>    
       </div> 
       
       <div className="controls">
         <button onClick={()=> location.reload()}>Reset</button>
         <button onClick={login}>submit</button>
       </div>
       <div className="login_op">
           <span>Dont' have an student account ?&nbsp;</span><NavLink to="/register"> Create account</NavLink>
       </div>
    </div>
 </div>
  )
}

export default Login
