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


function QuestionContent() {
  /* load question, put answer, compare question, load time, load controls */
    const {token} = useAuth();
    const [liveData, setliveData] = useState([]);
    const [examInfo, setEinfo] = useState([]);
    const [edtime, setedtime] = useState(0);
    const [etime, setetime] = useState(0);
    const [datalen, setdataLen] = useState(0);
    let [identify, setidentify] = useState(null);
    const [ansLoading, setansLoading] = useState(false);
    const [reqload, setreqload] = useState(true);
    const [livedate,setlivedate] = useState(null);
    // test
    const test = ()=>{  return  setlivedate(new Date) }
    useEffect( ()=>{
        getQuestion();
    },[]);
      setTimeout( ()=>{
        test();
      },3000)
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
                setEinfo(rsdata.exam)
                setedtime(rsdata.exam.schedule.datetime)
                setetime(rsdata.exam.schedule.timespam)
                setliveData(rsdata.question);
                setdataLen(rsdata.question.length);
                setreqload(false)
            }else{
                console.log(rsdata.message)
            }
        }catch(err){
            console.log(`question getting request error ${err}`)
        }
    }

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
        if(ans =="" || ans == " " || ans.length < 1){
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
                 getQuestion()
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
                setansLoading('')
                toast.warning(rsdata.message)
            }
        }catch(err){
            console.log(`request send error ${err}`);
            
        }
        // make request.
    }
 // date and time management.
  // getting
  const gdate = new Date(edtime).toString().substring(0,15);
  const gtime = etime;
  // machine
  const date = new Date().toDateString();
  function AMPM(date) {
      var hours = date.getHours();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      var strTime =  ampm;
      return strTime;
    }
  function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
//   // compare only day and month || houre.
   let message = '';
   let start = false;
 
//    // hour and minute equal.
 try{
    var gampm = gtime.slice(-2);
    if(date==gdate){
        message = 'Exam will start shortly.';
    // step 2
        // step 3
        if(gampm == AMPM(livedate)){
            // step 4
            if(formatAMPM(livedate) >= gtime){
                message = '';
                start = true;
                // time to complete.
                var inttime = gtime.replace(gampm,'').trim();
                var lastint = inttime.slice(-2);
                var calcmin = parseInt(lastint)+parseInt(examInfo.timetocomplete);
                // 2 sum >= 60 -> constands.
                let ovhour=0;
                if(calcmin==60){
                    calcmin=0;
                    ovhour=1;
                    // # hour+1, min = 0.
                    // 1. hour increase. and mini 0. 
                    // start 55, completed 10, = 60 + 5.
                    // 60 er besi koto royeche seta nite hobe. calmin -60 = curr min.
                }else if(calcmin>60){
                    ovhour=1;
                    calcmin = calcmin-60;
                    // # hour+1, min = calcmin - 60;
                }
                // calcmin>=60 ? calcmin = parseInt(examInfo.timetocomplete) : ''
                let gethour;
                inttime[1]==":" ? gethour = inttime.slice(0, 1) : gethour = inttime.slice(0, 2);
                // ovhour ? gethour = parseInt(gethour)+1 : null;
                const mergetime = parseInt(gethour)+ovhour+':'+calcmin+' '+gampm;
                if(formatAMPM(livedate)>=mergetime){
                    // change route, congratulation exam is finished, exam is over parse examid.
                    navigate('/exam-finished')
                }
             }
        }
     }else if(date > gdate){
        navigate('/')
     }

 }catch(err){
    console.error(err)
 }
 
   // date and time ended.
  return (
    <div>
    {reqload != true ? 
    <div>
   
    <div className="main_content mt63" style={{borderRadius:5,position:'relative',}}>
        <div className='waiting'>
        
         <FaWifi className='wifi' />
            <h3>{start ? '' : <AiOutlineLoading className='loading' /> }&nbsp; {examInfo.name},  &nbsp; <span style={{color:'red'}}>{gdate}</span>, {etime}</h3>
            
        </div>
    </div>
    <div className="inform informq">
<div className='informlft' style={{position:'relative',top:8}}>
 <a href="#" className='back' onClick={()=> navigate('/exam-joinned')}><MdOutlineArrowBack /> Back</a> &nbsp;&nbsp;&nbsp;&nbsp;

</div>
        <div className="informlft time" style={{padding:0}}>
            <GiAlarmClock className='clock' />
            <span>0 Minute 0 Secounds / {examInfo.timetocomplete}.00 minutes</span>
   
        </div>
        <div className="numinform">
            <span className='alignspan'><FaRecordVinyl /> <span className='s1'>{datalen}</span>/<span className='s2'>0</span>/<span className='s3'>0</span></span>
        </div>
    </div>

    <div className="data_context">
    {start ? <div> 
        {liveData.map( (r,i)=>{
            let smbl=[];


            if(r.symbol == 'ক'){ smbl=['ক','খ','গ','ঘ']}
            else if(r.symbol=='a'){smbl=['A','B','C','D']}
            else if(r.symbol=='i'){smbl=['I','II','III','IV']}
           
            // var obj = r.ansdata[i].questionid ? r.ansdata[i].questionid : false;
            // setidentify(0)
            // check lenght, then this based set index.
            console.log(r.ansdata)
            try{
            if(r._id!=r.ansdata[i].questionid || r._id == r._id){ // 0 index.
                // if queistion user id == machine user id, then, compare.
            return(
                <div key={i} className="txt_content">
                {ansLoading==r._id ?  <div className='qloading'> Loading.. </div> : ''}
                   
                <h1 className="indIKd GW0XC cS4Vcb-pGL6qe-fwJd0c">
                    <div className='count'>{i+1}</div>
                    {r.question}</h1>
            <div className="cS4Vcb-pGL6qe-k1Ncfe">{r.qhint ? r.qhint : ''}</div>
            {/* type */}
             
               {r.type==1 ? 
                <div className="op">
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.oa} value={r.option.oa} /> <label htmlFor={r.option.oa}>{smbl[0]}) {r.option.oa}</label></div>
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.ob} value={r.option.ob} /> <label htmlFor={r.option.ob}>{smbl[1]}) {r.option.ob}</label></div>
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.oc} value={r.option.oc} /> <label htmlFor={r.option.oc}>{smbl[2]}) {r.option.oc}</label></div>
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.od} value={r.option.od} /> <label htmlFor={r.option.od}>{smbl[3]}) {r.option.od}</label></div>
                </div> 
                : 
                <div>
                    {r.type==2 ? 
                       <div>
                       <div className='main_content prvimg' style={{margin:'12px 0',}}> 
                        <img src={r.refurl} />
                       </div>
                       <div className="op">
                   <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.oa} value={r.option.oa} /> <label htmlFor={r.option.oa}>A) {r.option.oa}</label></div>
                   <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.ob} value={r.option.ob} /> <label htmlFor={r.option.ob}>B) {r.option.ob}</label></div>
                   <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.oc} value={r.option.oc} /> <label htmlFor={r.option.oc}>C) {r.option.oc}</label></div>
                   <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.od} value={r.option.od} /> <label htmlFor={r.option.od}>D) {r.option.od}</label></div>
               </div> 
                       </div>
                        : 
                      <div>
                      <div className='main_content prvimg' style={{margin:'12px 0',}}> 
                      <img src={r.refurl} />
                     </div>
                       <div className='ansinput'>
                        <input type='text' placeholder='Write the question answer... ' onChange={(e)=>handleInput(e,i)} name='answer'  />
                       </div>
                      </div>
                    }
                </div>
                }
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
            ); }
        }catch(err){console.log(' ')}
        })}
      </div>
      : 
     <div>
     <div class="wrapper">
     <div class="wrapper-cell">
         <div class="image"></div>
         <div class="text">
             <div class="text-line"> </div>
             <div class="text-line"></div>
             <div class="text-line"></div>
             <div class="text-line"></div>
         </div>
     </div>
     <div class="wrapper-cell">
         <div class="image"></div>
         <div class="text">
             <div class="text-line"></div>
             <div class="text-line"></div>
             <div class="text-line"></div>
             <div class="text-line"> </div>
         </div>
     </div>
     <div class="wrapper-cell">
         <div class="image"></div>
         <div class="text">
             <div class="text-line"></div>
             <div class="text-line"></div>
             <div class="text-line"></div>
             <div class="text-line"></div>
         </div>
     </div>
 </div>
     </div>
    }

    </div>
    </div>
    : <div className='mt63'><div style={{textAlign:'center',padding:50,fontSize:17,fontWeight:500}}> Loading... </div> </div> }
    </div>
  )
}

export default QuestionContent
