import React from "react";
import '../assets/stylesheet/User.css';
import bg from '../assets/images/common_bg.jpg';
import quiz_it from '../assets/icons/quiz_it_logo.svg';
import Quizcard from "./Quizcard";
import AttemptQuiz from "./AttemptQuiz";
import leftArrow from "../assets/icons/LeftArrow.svg";
import rightArrow from "../assets/icons/RightArrow.svg";
import { Quiz_data } from "../assets/static/login_credential";
import { Attempt_data } from "../assets/static/login_credential";





export default function Home() {

  let logged_in_user = sessionStorage.getItem('logged_in_user');
  logged_in_user = JSON.parse(logged_in_user);


  return (
    <div className="u-background" style={{ backgroundImage: `url(${bg})` }}>
      <div className='u-headerarea'>
        <img src={quiz_it} className="u-quiz-logo" />
        <div className='u-userdetails'>
          <div className='u-username'>{logged_in_user.user_name}</div>
          <img className='u-userimage' src={logged_in_user.profile_img} />
        </div>
      </div>
      <div className="u-body">
        <div className="u-upper-area">
          <div className="u-text">All Quizes</div>
          <div className="u-cardcaresole">
            <div className="arrow" > <img src={leftArrow} /></div>
            <div className="u-cardArea">
              {
                Quiz_data.map((item) => {
                  return <Quizcard quiz_data={item} />
                })
              }

            </div>
            <div className="arrow" ><img src={rightArrow} /></div>
          </div>
        </div>
        <div className="u-lower-area">
          <div className="u-text">Attempted Quizes</div>
          <div className="l-cardcaresole">
            <div className="arrow" ><img src={leftArrow} /></div>
            <div className="l-cardArea">
              {
                Attempt_data.map((item) => {
                  return <AttemptQuiz attempt_quiz={item} />
                })
              }
            </div>
            <div className="arrow" ><img src={rightArrow} /></div>
          </div>
        </div>
      </div>
    </div >
  )
}
