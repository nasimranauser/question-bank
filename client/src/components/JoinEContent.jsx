import React from 'react'
import '../assets/styles/Question.css'
import { GiAlarmClock } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import { FaRecordVinyl } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function QuestionContent() {
    const navigate = useNavigate();
  return (
    <div>
   
    <div className="main_content">
    </div>
    <div className="inform">
<div>
 <a href="#" className='back' onClick={()=> navigate('/')}><MdOutlineArrowBack /> Back</a> &nbsp;&nbsp;&nbsp;&nbsp;

</div>


        <div className="informlft time">
            <GiAlarmClock className='clock' />
            <span>3 Minute 5 Secound / 5.00 minute</span>
   
        </div>
        <div className="numinform">
            <span className='alignspan'><FaRecordVinyl /> You can Joinnded 1 Exam</span>
        </div>
    </div>

    <div className="data_context" >
        <div className="txt_content">
            <h1 className="indIKd GW0XC cS4Vcb-pGL6qe-fwJd0c">
                <div className='count'>1</div>
                গ্রহ কয়টি? কী কী? - Quora</h1>
        <div className="cS4Vcb-pGL6qe-k1Ncfe">ছবি কপিরাইটের বিবেচনাধীন হতে পারে৷&nbsp;<a href="https://support.google.com/legal/answer/3463239?hl=bn" jslog="52885;ved:2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQlZ0DegQIABAV;track:click" className="vNdLpe btTgYb" aria-label="কপিরাইট সম্পর্কে আরও জানুন" target="_blank">আরও জানুন</a></div>
            <div className="op">
                <div><input type="radio" /> <label htmlFor="a">A) Apple</label></div>
                <div><input type="radio" /> <label htmlFor="b">B) Ball</label></div>
                <div><input type="radio" /> <label htmlFor="c">C) Furniture</label></div>
                <div><input type="radio" /> <label htmlFor="d">D) Ambrela</label></div>
            </div> 

        <div className="yAfywc MjJqGe efwPxe xdVOWd cd29Sd kM7Sgc ">
            <span className="iLgTbf indIKd cS4Vcb-pGL6qe-lfQAOe">
                <MdOutlineCancel />
                Leave</span>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="iLgTbf indIKd cS4Vcb-pGL6qe-lfQAOe">
                <BsSend />
                Answer</span>
        </div>
        </div>

        <div className="data_context">
        <div className="txt_content">
            <h1 className="indIKd GW0XC cS4Vcb-pGL6qe-fwJd0c">
                <div className='count'>1</div>
                গ্রহ কয়টি? কী কী? - Quora</h1>
        <div className="cS4Vcb-pGL6qe-k1Ncfe">ছবি কপিরাইটের বিবেচনাধীন হতে পারে৷&nbsp;<a href="https://support.google.com/legal/answer/3463239?hl=bn" jslog="52885;ved:2ahUKEwicmrDs8dWGAxVJSGwGHaK_CRAQlZ0DegQIABAV;track:click" className="vNdLpe btTgYb" aria-label="কপিরাইট সম্পর্কে আরও জানুন" target="_blank">আরও জানুন</a></div>
            <div className="op">
                <div><input type="radio" /> <label htmlFor="a">A) Apple</label></div>
                <div><input type="radio" /> <label htmlFor="b">B) Ball</label></div>
                <div><input type="radio" /> <label htmlFor="c">C) Furniture</label></div>
                <div><input type="radio" /> <label htmlFor="d">D) Ambrela</label></div>
            </div> 

        <div className="yAfywc MjJqGe efwPxe xdVOWd cd29Sd kM7Sgc ">
            <span className="iLgTbf indIKd cS4Vcb-pGL6qe-lfQAOe">
                <MdOutlineCancel />
                Leave</span>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="iLgTbf indIKd cS4Vcb-pGL6qe-lfQAOe">
                <BsSend />
                Answer</span>
        </div>
        </div>



        </div>

    </div>
    </div>
  )
}

export default QuestionContent
