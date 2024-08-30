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
    const {token, cUser} = useAuth();
    const [liveData, setliveData] = useState([]);
    const [examInfo, setEinfo] = useState([]);
    const [edtime, setedtime] = useState(0);
    const [etime, setetime] = useState(0);
    const [datalen, setdataLen] = useState(0);
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
        const url = `${window.location.origin}/api/exam/question/get`;
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
                setreqload(false)
                console.log(rsdata.message)
            }
        }catch(err){
            console.log(`question getting request error ${err}`)
        }
    }
     // input change.
     const handleInput = (e,index)=>{
        const {name, value} = e.target;
        const list = [...liveData];
        list[index][name] = value;
        setliveData(list);
      }
      // submitting answer
      const submitNow = async(index, params, ans, rs)=>{
        if(rs==false){ if(ans =="" || ans == " " || ans.length < 1){ return alert('answer is required!') } }
        setansLoading(params);
        const time = new Date().getHours() + ':' + new Date().getMinutes() + ':'+ new Date().getSeconds();
        const data = {
            examid:examId, questionid:params,getanswer:ans,
            canstime:time,timecount:'1 min 5 sec',reject:rs,
        }
        // make request.
        const url = `${window.location.origin}/api/exam/answer/put`;
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
                 getQuestion()
                setansLoading('')
                if(rsdata.message){
                toast.error('question is rejected.')
                }else{
                toast.success('answer submitted.')
                }
            }else{
                setansLoading('')
                toast.warning(rsdata.message)
            }
        }catch(err){
            console.log(`request send error ${err}`);
            
        }
    }
  const gdate = new Date(edtime).toString().substring(0,15);
  const gtime = etime;
  // machine
  function machinedateint(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
}
  const date = new Date().toDateString();
    function AMPM(date) {
        var hours = date.getHours();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        var strTime =  ampm;
        return strTime;
      }
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

   let message = '';
   let start = false;

 try{
    
    var gampm = gtime.slice(-2);

    if(date==gdate){
        message = 'Exam will start shortly.';
        if(gampm == AMPM(livedate)){
            const rep1 = formatAMPM(livedate).replace(AMPM(livedate), '').trim();
            const range1 =  rep1.replace(':','.');
            const prep2 = gtime.replace(gampm, '').trim();
            const prange2 = prep2.replace(':','.');
            if(parseFloat(range1) >= parseFloat(prange2)){
                message = '';
                start = true;
                // time to complete.
                var inttime = gtime.replace(gampm,'').trim();
                var lastint = inttime.slice(-2);
                var calcmin = parseInt(lastint)+parseInt(examInfo.timetocomplete);
                let ovhour=0;
                if(calcmin==60){ calcmin=0; ovhour=1;}
                else if(calcmin>60){ ovhour=1; calcmin = calcmin-60; }
                let gethour;
                inttime[1]==":" ? gethour = inttime.slice(0, 1) : gethour = inttime.slice(0, 2);
                const mergetime = parseInt(gethour)+ovhour+':'+calcmin+' '+gampm;
                const rep2 = mergetime.replace(gampm, '').trim();
                const range2 = rep2.replace(':','.');
                if(parseFloat(range1)>=parseFloat(range2)){ navigate('/exam-finished') }
             }
        }
     }else if(machinedateint(new Date) > edtime) { navigate('/') } // 2
 
 }catch(err){ console.log('')}
 let cnt = 0;

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
            <span className='alignspan'><FaRecordVinyl /> <span className='s1'>{datalen}</span>/<span className='s2'>0</span><span className='s3'></span></span>
        </div>
    </div>

    <div className="data_context">
    {start ? <div> 
        {liveData.map( (r,i)=>{
            let smbl=[]; var op;

            if(r.symbol == 'ক'){ smbl=['ক','খ','গ','ঘ']}
            else if(r.symbol=='a'){smbl=['A','B','C','D']}
            else if(r.symbol=='i'){smbl=['I','II','III','IV']}
            else if(r.symbol=='1'){smbl=['1','2','3','4']}

            if(r.ansdata.length>0){
            function checka(id){ return id.userid === cUser._id }
              if(r.ansdata.find(checka)){ op = r.ansdata[0].questionid;}else{op = null;}
            }else{op = null;}

            try{
            if(r._id!=op){ 
            return(
                <div key={i} className="txt_content">
                {ansLoading==r._id ?  <div className='qloading'> Loading.. </div> : ''}
                   
                <h1 className="indIKd GW0XC cS4Vcb-pGL6qe-fwJd0c">
                    <div className='count'>{i+1}</div>
                    {r.question}</h1>
            <div className="cS4Vcb-pGL6qe-k1Ncfe">{r.qhint ? r.qhint : ''}</div>
               {r.type==1 ? 
                <div className="op">
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.oa} value={r.option.oa} /> <label htmlFor={r.option.oa}>{smbl[0]}) {r.option.oa}</label></div>
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.ob} value={r.option.ob} /> <label htmlFor={r.option.ob}>{smbl[1]}) {r.option.ob}</label></div>
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.oc} value={r.option.oc} /> <label htmlFor={r.option.oc}>{smbl[2]}) {r.option.oc}</label></div>
                    <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.od} value={r.option.od} /> <label htmlFor={r.option.od}>{smbl[3]}) {r.option.od}</label></div>
                </div> 
                :  <div> {r.type==2 ? <div>
                       <div className='main_content prvimg' style={{margin:'12px 0',}}> 
                        <img src={r.refurl} /> </div>
                   <div className="op">
                   <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.oa} value={r.option.oa} /> <label htmlFor={r.option.oa}>A) {r.option.oa}</label></div>
                   <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.ob} value={r.option.ob} /> <label htmlFor={r.option.ob}>B) {r.option.ob}</label></div>
                   <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.oc} value={r.option.oc} /> <label htmlFor={r.option.oc}>C) {r.option.oc}</label></div>
                   <div><input onClick={(e)=>handleInput(e,i)} name='answer' type="radio" id={r.option.od} value={r.option.od} /> <label htmlFor={r.option.od}>D) {r.option.od}</label></div>
               </div></div>
                        : <div>
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
            ) }else{cnt++; 
                if(datalen==cnt){
                    return navigate('/exam-finished')

                } 
            }
        }catch(err){console.log('wrong ')}
        })}
      </div>
      : <div> <div className="wrapper"> 
      <div className="wrapper-cell">
         <div className="image"></div>
         <div className="text">
             <div className="text-line"> </div>
             <div className="text-line"></div>
             <div className="text-line"></div>
             <div className="text-line"></div>
         </div>
     </div>
     <div className="wrapper-cell">
         <div className="image"></div>
         <div className="text">
             <div className="text-line"></div>
             <div className="text-line"></div>
             <div className="text-line"></div>
             <div className="text-line"> </div>
         </div>
     </div>
     <div className="wrapper-cell">
         <div className="image"></div>
         <div className="text">
             <div className="text-line"></div>
             <div className="text-line"></div>
             <div className="text-line"></div>
             <div className="text-line"></div>
         </div>
     </div>
 </div>
     </div>
    } </div> </div>
    : <div className='mt63'><div style={{textAlign:'center',padding:50,fontSize:17,fontWeight:500}}> Loading... </div> </div> } </div>
  )
}

export default QuestionContent
