import React from 'react'
import '../../assets/stylesheet/alluser.css'
import deleteicon from '../../assets/icons/delete.svg';
import edit from '../../assets/icons/edit.svg'

let user_data = {
  "user_id": "mailto:i.mukherjee@ascendeongroup.com",
  "user_name": "Indranil Mukherjee",
  "password": "3NYd3A1y",
  "user_type": "primeadmin",
  "profile_img": "http://xplore.cloud:3003/training/1688311016669-277360560.png",
}

export default function AllUser({ all_userdata }) {

  // let image_url = "https://images.unsplash.com/photo-1688503677973-0c68fcc15175?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"

  return (
    <div className='all-userbox'>
      <img className='userbox-img' style={{ backgroundImage: `url(${all_userdata.profile_img})` }} />
      <div className='body-container'>
        {all_userdata.user_type === 'admin' && (<div className='usertype-button'>
          <div className='usertype-buttontext'>Admin</div></div>)}
        {
          all_userdata.user_type === 'primeadmin' && (<div className='usertype-button'>
            <div className='usertype-buttontext'>Prime Admin</div></div>)
        }
        <div className='all-name'>{all_userdata.user_name}</div>
        <div className='foricons'><img src={edit} /><img src={deleteicon} /></div>
      </div>
    </div>
  )
}
