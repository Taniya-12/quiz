import React, { useState,useEffect } from 'react'
import '../../assets/stylesheet/addquiz.css'
import WriteQuestion from './WriteQuestion'
import makeid from '../../common/Utils';


export default function AddQuiz({ curr_quiz, closeModal, getNewQuizData }) {

  const [quiz, setQuiz] = useState(null);
  const [sel_ques, setSelQues] = useState(null);
  const [sel_ques_no, setSelQuesNo] = useState(1);

  useEffect(() => {
    let c_quiz = JSON.parse(JSON.stringify(curr_quiz));
    setSelQues(c_quiz.questions[0]);
    setQuiz(c_quiz);
  }, []);
  console.log("values are : ",quiz);

  const handleChange= (entity)=>(e)=>{
    e.preventDefault();
    let c_quiz = JSON.parse(JSON.stringify(quiz));
    c_quiz[entity]=e.target.value;
    setQuiz(c_quiz)
  };

  const handlecheckbox = (entity , r_entity) => (e) => {
    let c_quiz = JSON.parse(JSON.stringify(quiz));
    // if (c_quiz[entity] === true) {
    //     c_quiz[entity] = false;
    // } else {
    //     c_quiz[entity] = true;
    // }
    c_quiz[entity] = c_quiz[entity] === true ? false : true;
    if (r_entity in c_quiz === false) {
        c_quiz[r_entity] = 0;
    }
    setQuiz(c_quiz);
  };


  // const handleTimer = (e) => {
  //   setCheckedTimer(e.target.checked);
  // };

  // const handleNegMarks = (e) => {
  //   setCheckNegMark(e.target.checked);
  // };

  const CanceladdQuiz = () => {
    closeModal();
  };

  const handleIncrement =(e) =>{
    // if (no_of_ques < max_ques){
    //   setNoOfQues((previous_value)=> previous_value+1);
    // }
    e.preventDefault();
        let c_quiz = JSON.parse(JSON.stringify(quiz));
        c_quiz.questions.push({
            id: makeid(6).toString(),
            ques: "",
            options: {
              option1: "",
              option2: ""
            },
            answer: "0"
        })
        setQuiz(c_quiz);
  };

  const handleQuestionNumberClick = (q_id, q_no) => {
    let cur_ques = quiz.questions.find(item => item.id === q_id);
    setSelQuesNo(q_no);
    setSelQues(cur_ques);
  };
  const handleDeleteQuestion = (q_id, q_index) => {
    console.log("delete question id:", q_id, q_index);
    let c_quiz = JSON.parse(JSON.stringify(quiz));
    if (c_quiz.questions.length > 1) {
        // c_quiz.questions = c_quiz.questions.filter(question => question.id !== q_id);
        let new_questions = [];
        for (let i=0; i<c_quiz.questions.length; i++) {
            if (c_quiz.questions[i].id !== q_id) {
                new_questions.push(c_quiz.questions[i]);
            }
        }
        c_quiz.questions = new_questions;
        setSelQuesNo(q_index === 1 ? 1 : q_index -1);
        setQuiz(c_quiz);
        setSelQues(q_index === 1 ? c_quiz.questions[0] : c_quiz.questions[q_index - 1]);
    } else {
        alert("You cannot remove all questions");
    }
  };

  const modifySelectedQuestion = (question) => {
    setSelQues(question);
  }

  console.log("quiz:", quiz);

  const addquiz_data =(event) =>{
    event.preventDefault();
    const newQuiz = { quiz_title:quiz.quiz_title , subject: quiz.subject, timer_per_ques:quiz.timer_per_ques,negative_marks:quiz.negative_marks}
    getNewQuizData(newQuiz)
  }

  if (quiz === null) return <></>

  return (
    <div className='quiz-box'>
      <div className='newquiz'> NEW QUIZ
        <div className="title-input-box">
          <div className='addtitle_area'><div className='addtitle' >Quiz Title</div></div>
          <input className="add-title_area" type="text" placeholder="" value={quiz.quiz_title} onChange={handleChange("quiz_title")}/>
        </div>
        <div className="title-input-box">
          <div className='addtitle_area'><div className='addtitle' >Subject</div></div>
          <input className="add-title_area" type="text" placeholder="" value={quiz.subject} onChange={handleChange("subject")}/>
        </div>
        <div className='checkpoints-box'>
          <div className='timer-box'>
            {/* <input className='check-box' type='checkbox' /> */}
            <input type="checkbox" id="cb1" checked={quiz.timer_per_ques} onChange={handlecheckbox("timer_per_ques","time")} />
            <label for="cb1"></label>
            <span>Timer</span>
            {quiz.timer_per_ques &&
              <><input className='timer-add' type='number' value={quiz.time} onChange={handleChange("time")}/> <span>Seconds per question</span></>}
          </div>
          <div className='timer-box'>
            {/* <input className='check-box' type='checkbox' /> */}
            <input type="checkbox" id="cb2" checked={quiz.negative_marks} onChange={handlecheckbox("negative_marks","neg_marks")} />
            <label for="cb2"></label>Negative Marking
            {quiz.negative_marks &&
              <div className='n-mark-box'>Deduct<input className='n-marks-add' type='number' id='input-2' value={quiz.neg_marks} onChange={handleChange("neg_marks")}/> per wrong question</div>}
          </div>
        </div>
        <hr className='h-separator' />
        <div className='ques-no-box'> Questions
          <div className='ques-number-box'>
            {/* <div className='question-number' type="button">1</div>
            <div className='question-number' type="button">2</div>
            <div className='question-number' type="button">3</div>
            <div className='question-number' type="button">4</div> */}
            {quiz.questions.map((question, index) =>
                (<div className="question-number" key={`q-${question.id}`} onClick={() => handleQuestionNumberClick(question.id, index+1)}>{index+1}</div>
             ))}
          </div>
          <div className='add-ques-button'onClick={handleIncrement}>+ Add Question</div>
          <div className='button-area-1'>
            <div className='ques-button1' onClick={CanceladdQuiz}>Cancel</div>
            <div className='ques-button2'onClick={addquiz_data}>Save</div>
          </div>
        </div>
      </div>
      <WriteQuestion question={sel_ques} sel_ques_no={sel_ques_no} modifySelectedQuestion={modifySelectedQuestion} onDeleteQuestion={handleDeleteQuestion} />
      {/* {select_question===0 &&
      <WriteQuestion  questionNumber={select_question+1}/>
      }
      {select_question>0 &&
      <WriteQuestion  quiz={quiz} questionNumber={select_question+1}/>
       } */}
    </div>
  )
}