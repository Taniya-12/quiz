import React, { useState,useEffect } from 'react'
import '../assets/stylesheet/Admin.css'
import bg from '../assets/images/common_bg.jpg';
import quiz_it from '../assets/icons/quiz_it_logo.svg';
import down from '../assets/icons/down.svg'
import AddUserModel from './modals/AddUserModel';
import AllQuiz from './modals/AllQuiz';
import AllUser from './modals/AllUser';
import { All_QuizData } from '../assets/static/login_credential'
import { users } from '../assets/static/login_credential'
import AddQuiz from './modals/AddQuiz';
import makeid from '../common/Utils';
import { AddQuestion_Data } from '../assets/static/login_credential';


export default function Admin() {

  const [addnewuser, setAddNewUser] = useState(false)
  const [all_user_data, setAllUserData] = useState(users)
  const [addnewquiz, setAddNewQuiz] = useState(false)
  const [quizes, setQuizes] = useState([]);
  const [curr_quiz, setCurrQuiz] = useState(null);

  let logged_in_user = sessionStorage.getItem('logged_in_user');
  logged_in_user = JSON.parse(logged_in_user);
  console.log("logged_in user is : ",logged_in_user);

  const adduser = (event) => {
    event.preventDefault()
    setAddNewUser(true)
  }

  const getNewUserData = (data) => {
    setAllUserData([...all_user_data, data])
    setAddNewUser(false)
  };



  useEffect(() => {
    const logged_in_user = JSON.parse(sessionStorage.getItem('logged_in_user'));
    setQuizes(JSON.parse(JSON.stringify(AddQuestion_Data)));
  }, []);

  const getNewQuizData = (input) =>{
    setQuizes([...quizes, input])
    setAddNewQuiz(false)
  };

  const handleFetchQuiz = (quiz_id) => {
    console.log("quiz_id:", quiz_id);
    let c_quiz = {};
    if (quiz_id === 0) {
        c_quiz = {
          id: 0,
          quiz_title: "",
          subject: "",
          timer_per_ques: false,
          negative_marks: false,
          time: 0,
          neg_marks: 0,
          questions: [
            {
              id: makeid(6).toString(),
              ques: "",
              options: {
              option1: "",
              option2: ""
              },
              answer: ""
            }
            ]
        }
    } else {
      c_quiz = quizes.find(item => item.id === quiz_id);
    }
    setCurrQuiz(c_quiz);
    setAddNewQuiz(true);
  };

  const addquiz = () => {
    handleFetchQuiz(0);
  }


  return (

    <div className="u-background" style={{ backgroundImage: `url(${bg})` }}>
      <div className='u-headerarea'>
        <img src={quiz_it} className="u-quiz-logo" />
        <div className='u-userdetails'>
          <div className='u-username'>Admin Login : {logged_in_user.user_name}</div>
          <img className='u-userimage' src={logged_in_user.profile_img} />
        </div>
      </div>
      <div className='a-body'>
        <div className="a-upper_area">
          <div className="a-text"><div className='maintext'>All Quizes</div></div>
          <div className='addquiz'><div className='add-text' onClick={addquiz}>+ Add Quiz</div></div>
          <div className="a-cardArea">
            {
              quizes.map((item) => {
                return <AllQuiz key={`quz-${item.id}`} handleFetchQuiz={handleFetchQuiz} panel_data={item} />
              })
            }
            <div className='downicon'><img src={down} /></div>

          </div>

        </div>
        <div className="a-upper_area">
          <div className="a-text"><div className='maintext'>All Users</div></div>
          <div className='addquiz' onClick={adduser} ><div className='add-text'>+ Add User</div></div>
          <div className="a-cardArea">
            <div className='foradmin'>
              {
                all_user_data.map((item) => {
                  if (item.user_type.toLowerCase() === 'admin' || item.user_type.toLowerCase() === 'primeadmin') {
                    return <AllUser all_userdata={item} />
                  }
                  return null;
                })
              }
            </div>
            <div className='foruser'>
              {
                all_user_data.map((item) => {
                  if (item.user_type.toLowerCase() === 'user') {

                    return <AllUser all_userdata={item} key={item.id} />
                  }
                  return null;
                })
              }
            </div>
            <div className='downicon'><img src={down} /></div>
          </div>

        </div>
      </div>
      {
        addnewuser === true &&
        < AddUserModel getNewUserData={getNewUserData} closeModal={setAddNewUser} />
      }
      {
        addnewquiz === true &&
        <AddQuiz curr_quiz={curr_quiz} closeModal={() => setAddNewQuiz(false)} getNewQuizData={getNewQuizData} />
      }

    </div>
  )
}
