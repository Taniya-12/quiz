import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/stylesheet/Home.css'
import { ReactComponent as QuizItLogo } from '../assets/icons/quiz_it_logo.svg';
//import as_logo from '../images/Ascendeon_Logo.svg';
import { ReactComponent as AsLogo } from '../assets/icons/Ascendeon_Logo.svg'
import bg from '../assets/images/quiz_site_back.jpg';
import quiz from '../assets/images/quiz_it_brand_name.png';
import user_circle from '../assets/images/user.png';
import user from '../assets/images/shape.png';
import pswd from '../assets/images/padlock.png';
import { users } from "../assets/static/login_credential";




export default function Home() {
  //console.log("login", login_data);

  const navigate = useNavigate()

  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [err_msg, setErrMsg] = useState("")
  const [status, setStatus] = useState("none")
  const [loggedin_user, setLoggedinUser] = useState(null)
  const [userData, setUserData] = useState(users);
  const [showWelcome, setshowWelcome] = useState(false)
  const [u_pic, setUPic] = useState(null);



  useEffect(() => {
    if (status === "success") {
      setUPic(loggedin_user.profile_img)
      sessionStorage.setItem('logged_in_user', JSON.stringify(loggedin_user));
      setshowWelcome(true)
      if (loggedin_user.user_type === "primeadmin" || loggedin_user.user_type === "admin") {
        setTimeout(() => {
          navigate('/admin')
        }, 4000);
      } else {
        setTimeout(() => {
          navigate('/user')
        }, 4000);
      }
    }
  }, [status])

  const logged_in = (event) => {
    event.preventDefault()
    let logged_in_user = {};
    logged_in_user = userData.find((item) => item.user_id === userId)
    //console.log("===>", userData, logged_in_user);

    if (userId === "" || logged_in_user === undefined) {
      setStatus("error")
      setErrMsg("Please provide valid User ID")

    } else if (password === "") {
      setStatus("error")
      setErrMsg("Please enter password")

    } else if (logged_in_user.password !== password) {
      setStatus("error")
      setErrMsg("Please enter correct password")

    } else {
      setStatus("success");
      setErrMsg("");
      setLoggedinUser(logged_in_user);
      console.log("USER", logged_in_user);
    }


  }

  return (
    <div className="background" style={{ backgroundImage: `url(${bg})` }}>
      <div className="upper-area">
        {/* <img src={quiz_it} className="quiz-logo" alt="logo" /> */}
        <QuizItLogo className="quiz-logo" />
      </div>
      <div className="middle-area">
        <div className="left-area">
          <img src={quiz} />
        </div>
        <div className="right-area">
          <div className="login-box" >
            <div className="login-header">
              <img src={u_pic !== null ? u_pic : user_circle} style={{ borderRadius: "50%", border: status === "error" ? "5px solid red" : status === "success" ? "5px solid green" : "none" }} />
              <p>LOGIN</p>
            </div>
            <div className="error">{err_msg}</div>
            <div className="input-box">
              <img src={user} className="inner_img" />
              <div className="separator"></div>
              <input className="input_area" type="text" placeholder="User ID" value={userId} onChange={(e) => { setUserId(e.target.value) }} />
            </div>
            <div className="input-box">
              <img src={pswd} className="inner_img" />
              <div className="separator"></div>
              <input className="input_area" type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <button className="login-button" onClick={logged_in}>LOGIN</button>

            <div className="forgot-password">
              <span className="forgot-password-text">
                Forgot your Password?
              </span>
              <a href="" className="forgot-password-button">Click Here</a>
            </div>
            {
              showWelcome === true &&
              <div className="welcome_banner">
                <div>WELCOME</div>
                <div id="u_name">{loggedin_user.user_name}</div>
              </div>
            }
          </div>

        </div>
      </div>
      <div className="lower-area">
        {/* <img src={as_logo} className="as_logo" alt="Ascendeon Logo" /> */}
        <AsLogo className="as_logo" />
        <span className="as-name">by Ascendeon Trainees</span>
      </div>
    </div>
  )
}


