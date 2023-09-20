import React, { useState } from 'react'
import '../../assets/stylesheet/allquiz.css'
import deleteiconi from '../../assets/icons/delete.svg';
import editi from '../../assets/icons/edit.svg'
import AddQuiz from './AddQuiz';
import { AddQuestion_Data } from '../../assets/static/login_credential';

let All_QuizData_info = {
  title: "Thermodynamics",
  created_date: "10/03/2022",
  no_of_q: "20",
  publish: "true",
  unpublish: "true",
}

export default function AllQuiz({panel_data, handleFetchQuiz}) {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    handleFetchQuiz(panel_data.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // let image_url = "https://images.unsplash.com/photo-1688503677973-0c68fcc15175?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"

  return (

    <div className='all-quizbox' style={{backgroundImage:`url(${panel_data.img_url})`}}>
      <div className='inner-quizbox'>
        <div className='text-quizbox'>
          <div className='addquiz-title'>{panel_data.quiz_title}<div className='adding-icons'>
            <img src={editi} onClick={openModal} />
            <img src={deleteiconi} /></div>
          </div>
        </div>
        <div className='quiztext'>Created on :{panel_data.created_on}<br />Question : {panel_data.question}</div>
        <div className='allbutton-container'>
          {/* <div className='allquiz-button1'><div className='allquiz-buttontext'> Publish</div></div>
          <div className='allquiz-button2'><div className='allquiz-buttontext'> Publish</div></div> */}
          {panel_data.publish === 'true' ? (
            <div className='allquiz-button1'><div className='allquiz-buttontext'> Published</div></div>
          ) : (
            <div className='allquiz-button1'><div className='allquiz-buttontext'> Saved</div></div>
          )}
          {panel_data.unpublish === 'true' ? (
            <div className='allquiz-button2'><div className='allquiz-buttontext'> Unpublish</div></div>
          ) : (
            <div className='allquiz-button2'><div className='allquiz-buttontext'> Publish</div></div>
          )}
        </div>
      </div>
      {isModalOpen && ( <AddQuiz  closeModal={closeModal} AddQuestion_Data={AddQuestion_Data} initialQuizTitle={panel_data.quiz_title}  initialSubject={panel_data.subject} />
      )}
    </div >
  )
}

