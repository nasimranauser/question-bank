import React, {useState} from 'react'
import icon from '../../public/account.png'
import { ImMobile } from "react-icons/im";
import { RiSortNumberAsc } from "react-icons/ri";
import '../assets/styles/Login.css'
import '../assets/styles/auth.css'
import { NavLink, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {useAuth} from '../context/auth'

function LoginContent() {
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
          const url = `${window.location.origin}/api/auth/login`;
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
                navigate('/');
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
    <div>
      <div className='loadings'></div>
       <div className='lcontent mt63'>
         <div>
          <img src={icon} alt='asd' />
         </div>
         <div>
          <div>
           <NavLink to={'/register'}>Register</NavLink>
          </div>
           <div className='cfield'>
            <ImMobile />
             <label>Enter your phone number</label>
             <input type='number' name='phone' onChange={(e)=> inputHandle(e)}
             value={user.phone}
             />
           </div>
           <div className='cfield'>
           <RiSortNumberAsc />
           <label >Enter your student ID</label>
           <input type='text' name='studentid' onChange={(e)=> inputHandle(e)}
           value={user.studentid} />
         </div>
         <div className='fieldtermbtn'>
          <label><input type='checkbox' /> Accept Terms and conditon <NavLink > Read Terms</NavLink> </label>  
         <div>
           <button onClick={()=> location.reload()}>Clear</button>
           <button onClick={login}>Submit</button>
           </div>
         </div>
         <div className='forgotfield'>
            <NavLink to={'/'}>Forgot student ID ?</NavLink>
           </div>
         </div>
       </div>
    </div>
  )
}

export default LoginContent
