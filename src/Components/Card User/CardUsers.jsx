import React from 'react'
import axios from "axios"
import "./CardUsers.css"

const CardUsers = ({user, getAllUsers, setUpdateInfo, handleOpenForm}) => {

  const deleteUser = () => {
      const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
      axios.delete(URL)
      .then(res => {
        console.log(res.data);
        getAllUsers()
      } )
      .catch(err => console.log(err))
  }

  const handleUpdateClick = ( )=>{
    setUpdateInfo(user)
    handleOpenForm()
  }

  return (

    <div className='card'>
      <h2 className='card__userName'>
      <i class="fa-solid fa-circle-user"></i>
      {`${user["first_name"]} ${user["last_name"]}`}
      </h2>
      <hr className='line'/>
      <ul className='card__userInfo'>
        <li>Email: <br /> <i class="fa-solid fa-envelope"></i> <span>{user.email}</span> </li>
        <li>Birthday: <br /> <i class="fa-solid fa-gift"></i> <span>{user.birthday}</span> </li>
      </ul>
      <hr className='line'/>
      <div className="card__buttons">
        <button className='card__btn' onClick={deleteUser} ><i class="fa-solid fa-trash-can"></i></button>
        <button className='card__btn' onClick={handleUpdateClick} ><i class="fa-solid fa-pen"></i></button>
      </div>
    </div>
  )
}

export default CardUsers