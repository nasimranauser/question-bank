import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../assets/styles/Homecontent.css'
import {NavLink, useNavigate, useSearchParams} from 'react-router-dom'
import { MdAccountBox } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { GiPaperBoat } from "react-icons/gi";
import { FaConnectdevelop } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";
import { useAuth } from '../context/auth';

function Content() {
  const {isAuth, cUser} = useAuth();
   useEffect( ()=>{
    getExam();
   },[]);
   const [exam, setExam] = useState([]);
   // gettting question
    const getExam = async()=>{
        const url = 'http://localhost:3000/api/exam/get';
        try{
            const response = await fetch(url, {
                method: "GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const ress = await response.json();
            if(response.ok){
                setExam(ress.edata);
            }
        }catch(err){
            setExam([]);
            console.error(err);
        }
    }
  // getting question.
    const navigate = useNavigate();
    // const overview = ()=>{
    //     navigate('/overview');
    // }

    // Adding Question in to the action

    const addQuestion = async()=>{
        const data = {
            identityexam:"66ae4147771c96bf34164a7e",
            question:"What is a CPU?",
            answer:" ",
            qhint:"Advance computer operating system. ",
            type:"1",
            refurl:"testurl.png",
            option:{
                oa:"Controll Processing Unit",
                ob:"Controll Per Unit",
                oc:"Contract Avoe Unit",
                od:"Correct Avobe Utility"
            },
            hassanswer:"a"
        }
        const url = 'http://localhost:3000/api/exam/question/add';
        try{
            const response = await fetch(url, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
            });
            const rsdata = await response.json();
            if(response.ok){
                console.log(rsdata.message)
            }else{
                alert(rsdata.message)
            }
        }catch(err){
            console.log(`Request send error ${err}`);
            
        }
    }

    // add examination.
    const addExam = async(req, res)=>{
        const data = {
            name:"HSC Account Model Test Exam",
            etype:"",
            qtype:"",
            title:"Hsc accounting model test exam 2024",
            desc:" ",
            refurl:"Business study",
            marks:{
                fullmark:150,
                perqmark:2,
                passmark:25,
                negetivemark:0.25, 
            },
            schedule:{
                datetime:1,
                timespam:'12:00PM',
                timehour:1,
                timeminute:1,
            },
            identity:{
                class:"SSC, HSC",
                deparment:"Business Study",
            },
            authority:{
                orgname:'',
            },
            award:{
                a1:'',
                a2:'',
                a3:'',
                a4:'',
                a5:'',
                a6:'',
                a7:'',
                a8:'',
                a9:'',
                a10:'',
            },
            rules:{
                r1:'',
                r2:'',
                r3:'',
                r4:'',
                r5:'',
            },
            price:180,
        }
        const url = 'http://localhost:3000/api/exam/add';
        try{
            const response = await fetch(url, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
            });
            const rsdata = await response.json();
            if(response.ok){
                console.log(rsdata.message)
            }else{
                alert(rsdata.message)
            }
        }catch(err){
            console.log(`Request send error ${err}`);
            
        }
    }
    const compare = ()=>{
        
    }
  return (
    <>
        <div className='main_row'>
          <div className="main_content mt63">
          <Carousel style={{width:'100%',}}>
                <div>
                    <img src="./slide1.jpg" />
                    <p className="legend">Question Bank - 2024</p>
                </div>
                <div>
                    <img src="./slide2.jpg" />
                    <p className="legend">Powred by - IT SATELLITE</p>
                </div>
                <div>
                    <img src="./slide2.jpg" />
                    <p className="legend">Question Bank - 2024</p>
                </div>
            </Carousel>
    </div>
    {isAuth ?  <div className='notification' >
        <div> <h4 ><IoMdNotificationsOutline /> Good Morning <span style={{color:'green'}}>{cUser.name}</span> Have an nice day.  </h4></div>
       <div> <MdOutlineArrowCircleRight /></div>
    </div> :  <div onClick={()=> navigate('/login')} className='notification' >
        <div> <h4 ><IoMdNotificationsOutline /> Login  your student account here.  </h4></div>
       <div> <MdOutlineArrowCircleRight /></div>
    </div>}
 
    <div className="inform">
        <div className="history">
            <div className="counter">
                <FaConnectdevelop />
            </div>
            <NavLink to={'/exam-joinned'}>
            <div  className="infotxt">
                Joined Exam
            </div> 
            </NavLink>
           </div>
        <div className="history">
            <div className="counter">
                 <CiCircleCheck />
            </div>
            <NavLink to={'/completed-exam'}>
          <div className="infotxt">
            Complited Exam
          </div>
          </NavLink>
        </div>
        
        <div className="history">
            <div className="counter">
                 <MdHistory />
            </div>
            <NavLink to={'/history'}>
           <div className="infotxt">
            History
           </div>
           </NavLink>
        </div>
        <div className="history">
            <div className="counter">
                 <MdOutlineAccountCircle />
            </div>
            <NavLink to={isAuth ? '/my-profile' : '/login'}>
           <div className="infotxt">
            My Profile
           </div>
           </NavLink>
        </div>
    </div>
   
    <div className="econtent" style={{height:'48.4vh', overflowY:'scroll'}}>
        <div className="controlexam">
           <div>
            <h3><GiPaperBoat /> Examination</h3>
           </div> 
           <div>
            <input type="search" /> <button>Search</button>
           </div> 
           </div>
           {exam.length == 0 ? <div style={{textAlign:'center',padding:30,fontSize:15,color:'#333'}}><strong style={{borderBottom:'1px solid #333'}}>At the moment Not published any <span style={{color:'green'}}>Examination</span>! Please waite.</strong> </div> : ''}
           {exam.map( (e,i)=>{
            const datetostr = new Date(e.schedule.datetime).toString().substring(0,15);
            return(
         <div key={i}>
          <div className="exam_live">
           <div className="date">
            <div className="sl">
                <div className="slcontent">{i+1}</div>
            </div>
              <div className="d">
              {datetostr}
              </div>
           </div>
           <div className="context">
             <div className="ecp1">
                <ul>
                    <li><strong>Exam Name:</strong> {e.name}</li>
                    <li><strong>Joined Price:</strong> {e.price} Tk</li>
                    <li><strong>Exam Authority:</strong> {e.authority.orgname}</li>
                    <li><strong>Exam Reward:</strong> {e.award.a1 ? 'True': 'Null'}</li>
                   
                </ul>
             </div>
             <div className="ecp2">
                <ul>
                <li><strong>Exam Type: </strong> {e.etype ? e.etype : 'Fee'}</li>
                    <li><strong>Question Type:</strong> {e.qtype ? e.qtype : 'Default'}</li>
                    <li><strong>Per Question Mark:</strong> {e.perqmark ? e.perqmark : '2'}</li>
                    <li><strong>Exam Qualification:</strong> {e.identity.class ? e.identity.class : 'Global'}</li>
                    </ul>
             </div>
            
           </div>
           <div className="ecp3" style={{background:'#fff'}}>
                <ul>
                    <li><strong>Full Mark of Exam:</strong> {e.marks.fullmark}</li>
                    <li><strong>Pass Mark:</strong> {e.marks.passmark}</li>
                    <li><strong>Negetive Mark:</strong> {e.marks.negetivemark}</li>
                </ul>
             </div>
           <div className="controls">
            <NavLink to={`/overview/${e.name}/${e._id}`}>
              <button style={{borderRadius:'50px'}}>Join Now <FiArrowRightCircle /></button>   
            </NavLink>
            
           </div>
       </div>
                </div>
            )
           })}
    </div>

<div>

      

</div>

    </div>
    </>
  )
}

export default Content
