import React, { useEffect, useState } from 'react'
import '../../assets/stylesheet/writeques.css'
import cross_sign from '../../assets/icons/xmark.svg'
import delete_img from '../../assets/icons/delete.svg'
import { AddQuestion_Data } from '../../assets/static/login_credential'
import makeid from '../../common/Utils'

export default function WriteQuestion({question, sel_ques_no, modifySelectedQuestion, onDeleteQuestion}) {

  const max_option = 4;

  const [cur_question, setCurQuestion] = useState(null);

  const handleDeleteQuestion = () => {
    onDeleteQuestion(question.id, sel_ques_no);
};

  useEffect(() => {
    setCurQuestion(JSON.parse(JSON.stringify(question)));
  }, [question])





  const addOption = (e) => {
    e.preventDefault();
    // let sel_question = JSON.parse(JSON.stringify(cur_question));
    let sel_question = {...cur_question};
    if (Object.keys(sel_question.options).length < max_option) {
      const u_opt_id = makeid(6).toString();
      sel_question.options[u_opt_id] = "";
      modifySelectedQuestion(sel_question);
      setCurQuestion(sel_question);
    }
  };



  const handleChange= (entity)=>(e)=>{
    e.preventDefault();
    let c_quiz = JSON.parse(JSON.stringify(cur_question));
    c_quiz[entity]=e.target.value;
    modifySelectedQuestion(c_quiz)
  };

  const handleOptionChange = (key) => (e) => {
    e.preventDefault();
    let c_question = {...cur_question};
    c_question.options[key] = e.target.value;
    modifySelectedQuestion(c_question);
  }

  const handleremoveOption= (key) => {
    // setOptions((previousvalue) => previousvalue.filter((option) => option.id !== optionId));
    let sel_question = { ...cur_question };
    delete sel_question.options[key];
    modifySelectedQuestion(sel_question);
    setCurQuestion(sel_question);
  };

  // console.log("cur_question:", cur_question);

  if (cur_question === null) return (<></>);

  return (
    <div className='w-question-box'>
      <div className='w-ques-box'>
        <div className='write-ques'>question no # {sel_ques_no}
          <input className='main-ques' type='text' placeholder='Write question here....' value={cur_question.ques} onChange={handleChange("ques")}/>
          <div className='answer-options'>Options
          {
            Object.keys(cur_question.options).map((item, index) => {
              return (
                <div className="option-box" key={`opt-${index}`}>
                  <div className='o-title_area'>
                    <div className='o-addtitle'>Option {index+1}</div>
                  </div>
                  <input className="o-add-title_area" type="text" placeholder="" value={cur_question.options[item]} onChange={handleOptionChange(item)}/>
                  <img src={cross_sign} className="image-div" onClick={()=> handleremoveOption(item)} />
                </div>
              )
            })
          }
            <div className='add-option' onClick={addOption}>+Add Option</div>
          </div>

            <div className='add-answer'>Answer

            <select className="answer-select_area" value={cur_question.answer} onChange={handleChange("answer")}>
              <option value="0">Select...</option>
              {
                Object.keys(cur_question.options).map((item, index) => {
                  return <option key={`mq-${item}`} value={item}>Option {index+1}</option>
                })
              }
            </select>

            <img src={delete_img} className="delete-div12" onClick={handleDeleteQuestion} />
          </div>

        </div>
      </div>
    </div>
  )
}
