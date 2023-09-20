import React, { useState } from 'react'
import '../../assets/stylesheet/AddImage.css'

export default function AddImage(props) {


  const [image, setImage] = useState("")
  //const [userimage, setUserImage] = useState([])

  const adduserimage = (event) => {
    event.preventDefault();
    props.getContent(image);
  }

  return (
    <div className='addimage'>
      <div className="addimage-input-box">
        <div className='addimage_area'><div className='addurl' >URL</div></div>
        <input className="add-imageurl_area" type="text" placeholder="Enter image URL" value={image} onChange={(e) => { setImage(e.target.value) }} />
      </div>
      <div className='addimage-button' onClick={adduserimage}>SUBMIT</div>
    </div>
  )
}