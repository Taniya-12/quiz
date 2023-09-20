import React from 'react'
import '../assets/stylesheet/Quizcard.css'


export default function Quizcard({ quiz_data }) {

  //let img_url = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  return (
    <div className='q-card' style={{ backgroundImage: `url(${quiz_data.background_img})` }}>{quiz_data.title}
      <div className='qcard_box'>
        <div className='card-text-box'>
          <div className='card-text'>Question : {quiz_data.n_question}<br />Timer : {quiz_data.timer === true ? "Yes" : "No"}<br />Negative Marking : {quiz_data.negative === true ? "Yes" : "No"}</div>
        </div>
        <div className='qcard-button'>Take Quiz</div>
      </div>
    </div>

  )
}