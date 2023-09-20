import React, { useState } from 'react'
import '../../assets/stylesheet/adduser.css'
import user_circle from '../../assets/images/user.png';
import AddImage from './AddImage';

export default function AddUserModel({ getNewUserData, closeModal }) {

  const [addnewimage, SetNewAddImage] = useState(false)
  const [name, setName] = useState("")
  const [userid, setUserId] = useState("")
  // const [userpassword, setUserPassword] = useState("")
  const [usertype, setUserType] = useState("")
  const [userData, setUserData] = useState("")
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");

  const addimage = (event) => {
    event.preventDefault()
    SetNewAddImage(true);
  }
  const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    console.log("RESULT", result);
    return result;

  };


  const adduserdata = (event) => {
    event.preventDefault()
    const newUser = { user_name: name, user_id: userid, password: password, user_type: usertype, profile_img: image }
    getNewUserData(newUser)

  }
  const closeModals = (event) => {
    event.preventDefault();
    SetNewAddImage(false);
  }
  const getContent = (img) => {
    setImage(img);
    console.log("Image", img);
    SetNewAddImage(false);
  }
  const handleGeneratePasswordClick = (e) => {
    e.preventDefault();
    const generatedPassword = makeid(8);
    setPassword(generatedPassword);
    console.log(generatedPassword);
  };

  return (
    <div className='adduser'>
      <div className='add-upper-border'></div>
      <div className="alogin-header">
        {image === null &&
          <>
            <img src={user_circle} alt='userc' onClick={addimage} />
            {
              addnewimage === true &&
              < AddImage closeModal={closeModals} getContent={getContent} />
            }
          </>
        }
        {image !== null &&
          <>
            <img src={image} alt='userc' style={{ borderRadius: "50%", height: "80px", width: "80px", border: "2px solid green", object: "fit: cover" }} onClick={addimage} />
            {
              addnewimage === true &&
              < AddImage closeModal={closeModals} getContent={getContent} />
            }
          </>
        }
      </div>
      <div className="add-input-box">
        <div className='addtext_area'><div className='addtext'>Name</div></div>
        <input className="add-input_area" type="text" placeholder="" value={name} onChange={(e) => { setName(e.target.value) }} />
      </div>
      <div className="add-input-box">
        <div className='addtext_area'><div className='addtext'>User ID</div></div>
        <input className="add-input_area" type="text" placeholder="" value={userid} onChange={(e) => { setUserId(e.target.value) }} />
      </div>
      <div className="add-input-box">
        <div className='addtext_area'><div className='addtext'>password</div></div>
        <div className='add'><input className="add-input_area" placeholder="" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <a href="" className='password-generations' onClick={handleGeneratePasswordClick}>Click to Generate</a>
        </div>
      </div>
      <div className="add-input-box">
        <div className='addtext_area'><div className='addtext'>User Type</div></div>
        {/* <div> */}
        <select className="add-select_area" value={usertype} onChange={(e) => { setUserType(e.target.value) }}>
          <option value="select"></option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        {/* </div> */}
      </div>
      <div className='button-area'>
        <div className='add-button1' onClick={closeModal} >Cancel</div>
        <div className='add-button2' onClick={adduserdata}>Create</div>
      </div>
      <div className='add-lower-border'></div>
    </div >
  )
}
