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
  const {isAuth, cUser, loadUser} = useAuth();
   useEffect( ()=>{
    loadUser();
    getExam();
   },[]);
   const [exam, setExam] = useState([]);
   const [loadexam, setloadexam] = useState(true);
   // gettting question
    const getExam = async()=>{
        const url = `${window.location.origin}/api/exam/get`;
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
                setloadexam(false);
            }else{setloadexam(false)}
        }catch(err){
            setExam([]);
           setloadexam(false)
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
            identityexam:"66cb9bced6259f8571d9bef1",
            symbol:'ক',
            question:"Draw a simple table code in input box?",
            answer:" ",
            qhint:"html computer programming ",
            type:"3", // type 1 is a option, type 2 is a image option, type 3 is a image and input.
            refurl:"https://npscpt.edu.bd/api/html-table.png",
            option:{
                oa:"",
                ob:"",
                oc:"",
                od:""
            },
            hassanswer:"<table><tr><th></th></tr><tr><td></td></tr></table>"
        }
        const url = `${window.location.origin}/api/exam/question/add`;
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
        const url = `${window.location.origin}/api/exam/add`;
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

    const lookupdata = async()=>{
        try{
            const url = `${window.location.origin}/api/admin/lookup`;
            const response = await fetch(url, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const rs = await response.json();
            if(response.ok){
                console.log('success');
                console.log(rs.data);
            }else{
                console.log('faild!')
                console.log(rs.message)
            }
        }catch(err){
            console.log(`request send error ${err}`);
        }
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
    {isAuth ?  <div className='notification' onClick={lookupdata}>
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
           {exam.length == 0 ? <div style={{textAlign:'center',padding:30,fontSize:15,color:'#333'}}>{loadexam ? 'Loading... Please wait!' : <strong style={{borderBottom:'1px solid #333'}}> At the moment Not published any <span style={{color:'green'}}>Examination</span>! Please waite.</strong>} </div> : ''}
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
