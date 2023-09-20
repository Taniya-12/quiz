import React from 'react'
import '../assets/stylesheet/AttemptQuiz.css'

export default function AttemptQuiz({ attempt_quiz }) {

  //let image_url = "https://images.unsplash.com/photo-1531169509526-f8f1fdaa4a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  return (
    <div className='attempt-quiz' style={{ backgroundImage: `url(${attempt_quiz.background_image})` }}>
      <div className='a-card_box'>
        <div className='a-card-text-box'> {attempt_quiz.title}</div>
        <div className='a-card-text'>Last attempted on : {attempt_quiz.last_attempt} <br />Score : {attempt_quiz.score}</div>
        <div className='a-card-button'>Retake</div>
      </div>
    </div>
  )
}
