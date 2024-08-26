import React, { useEffect, useState } from 'react'
import '../assets/styles/Question.css'
import { GiAlarmClock } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import { FaRecordVinyl } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import {toast} from 'react-toastify'
import { FaWifi } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";
import { CiMobile4 } from "react-icons/ci";
import { MdPortableWifiOff } from "react-icons/md";
import { IoLogoTableau } from "react-icons/io5";
import { MdGroups } from "react-icons/md";

function QuestionContent() {
  /* load question, put answer, compare question, load time, load controls */
    const {token} = useAuth();
    const [liveData, setliveData] = useState([]);
    const [ansData, setansData] = useState([]);
    const [ansLoading, setansLoading] = useState(false);

    useEffect( ()=>{
        getQuestion();
    },[])   
    const params = useParams();
    const [examId, setexamId] = useState(params.id);
    const navigate = useNavigate();

    // function to get question
    const getQuestion = async ()=>{
        const url = 'http://localhost:3000/api/exam/question/get';
        try{
            const response = await fetch(url, {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`,
                    "examId":examId,
                }
            });
            const rsdata = await response.json();
            if(response.ok){
                // console.log(rsdata.message)
                setliveData(rsdata.question);
            }else{
                // console.log(rsdata.message)
            }
        }catch(err){
            console.log(`question getting request error ${err}`)
        }
    }
    // function get answer.
    // const getAnswer = async ()=>{
    //     const url = 'http://localhost:3000/api/exam/answer/get';
    //     try{
    //         const response = await fetch(url, {
    //             method:"GET",
    //             headers:{
    //                 "Content-Type":"application/json",
    //                 "Authorization":`Bearer ${token}`,
    //                 "examid":examId,
    //             }
    //         });
    //         const rsdata = await response.json();
    //         if(response.ok){
    //             console.log(rsdata.message)
    //             setansData(rsdata.ansdata);
    //         }else{
    //             console.log(rsdata.message)
    //         }
    //     }catch(err){
    //         console.log(`error of getting get answer ${err}`)
    //     }
    // }

    // change answer input field.
     // input change.
     const handleInput = (e,index)=>{
        const {name, value} = e.target;
        const list = [...liveData];
        list[index][name] = value;
        setliveData(list);
        console.log('input field change/ click')
      }

      // submitting answer
      const submitNow = async(index, params, ans, rs)=>{
        if(ans.length < 1){
          return alert('answer is required!')
        }
        setansLoading(params);
        // setsubmitLoading(params);
        // // back respone then.
        // setTimeout( ()=>{setsubmitLoading(false)},500)
        // setprogressInfo({...progressInfo, complite: progressInfo.complite+1})
        const time = new Date().getHours() + ':' + new Date().getMinutes() + ':'+ new Date().getSeconds();
        // let's check is Reject true or not.
        console.log(`Index : ${index}, Token: ${token}, Exam Id: ${examId}, Question Id: ${params}, Answer: ${ans}, Reject Status: ${1}, Time: ${time}, Time Count: ${'5 min 2 sec'}`);
        // make request.
        const data = {
            examid:examId,
            questionid:params,
            getanswer:ans,
            canstime:time,
            timecount:'1 min 5 sec',
            reject:rs,
        }
        
        // make request.
        const url = 'http://localhost:3000/api/exam/answer/put';
        try{
            const response = await fetch(url, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const rsdata = await  response.json();
            if(response.ok){
                // get load again question data. )) question data is compare to ans get question data.
                // getQuestion()
                // let's check rejecttype, then show message
                // lets' store async storage.
                // localStorage.setItem('exits_exam',[{
                // }]);
                // localStorage.setItem('complited_exam',[{
                // }]);
                setansLoading('')
                if(rsdata.message){
                toast.error('question is rejected.')
                }else{
                toast.success('answer submitted.')
                }
                // loading.
            }else{
                // console.log(rsdata.message)
                setansLoading('')
                toast.warning(rsdata.message)
            }
        }catch(err){
            console.log(`request send error ${err}`);
            
        }
        // make request.
    }
    
  return (
    <div>
   
    <div className="main_content mt63" style={{borderRadius:5,position:'relative',}}>
        <div className='waiting'>
        
         <FaWifi className='wifi' />
            <h3><AiOutlineLoading className='loading' /> HSC ICT Exam  &nbsp; 30 Aug 2024, 4:30PM</h3>
            
        </div>
    </div>
    <div className="inform informq">
<div className='informlft'>
 <a href="#" className='back' onClick={()=> navigate('/exam-joinned')}><MdOutlineArrowBack /> Back</a> &nbsp;&nbsp;&nbsp;&nbsp;

</div>
        <div className="informlft time">
            <GiAlarmClock className='clock' />
            <span>0 Minute 0 Secounds / 15.00 minutes</span>
   
        </div>
        <div className="numinform">
            <span className='alignspan'><FaRecordVinyl /> <span className='s1'>30</span>/<span className='s2'>10</span>/<span className='s3'>5.</span></span>
        </div>
    </div>

    <div className="data_context">
        {liveData.map( (r,i)=>{
            return(
                <div key={i} className="txt_content">
                {ansLoading==r._id ?  <div className='qloading'> Loading.. </div> : ''}
                   
                <h1 className="indIKd GW0XC cS4Vcb-pGL6qe-fwJd0c">
                    <div className='count'>{i+1}</div>
                    {r.question}</h1>
            <div className="cS4Vcb-pGL6qe-k1Ncfe">{r.qhint ? r.qhint : ''}</div>
                <div className="op">
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.oa} value={r.option.oa} /> <label htmlFor={r.option.oa}>A) {r.option.oa}</label></div>
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.ob} value={r.option.ob} /> <label htmlFor={r.option.ob}>B) {r.option.ob}</label></div>
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.oc} value={r.option.oc} /> <label htmlFor={r.option.oc}>C) {r.option.oc}</label></div>
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.od} value={r.option.od} /> <label htmlFor={r.option.od}>D) {r.option.od}</label></div>
                </div> 
            <div className="yAfywc MjJqGe efwPxe xdVOWd cd29Sd kM7Sgc ">
                <span onClick={()=>submitNow(i, r._id, r.answer, true)} className="iLgTbf indIKd cS4Vcb-pGL6qe-lfQAOe">
                    <MdOutlineCancel />
                    Leave</span>
    
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span  onClick={()=>submitNow(i, r._id, r.answer, false)} className="iLgTbf indIKd cS4Vcb-pGL6qe-lfQAOe" >
                    <BsSend />
                    Answer</span>
            </div>
            </div>
            );
        })}
      

    </div>
    </div>
  )
}

export default QuestionContent
