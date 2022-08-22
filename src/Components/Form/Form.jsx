import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

//css
import "./Form.css"

const Form = ({getAllUsers, updateInfo, setUpdateInfo, handleCloseForm}) => {
  
  useEffect(() => {
    if (updateInfo) {
      reset(updateInfo)
    } 
  }, [updateInfo])
  

  const defaultValue = {
    email: "",
    password: "",
    first_name:"",
    last_name:"",
    birthday:""

  }
  const createUser = (data) =>{
    const URL = "https://users-crud1.herokuapp.com/users/"
    axios.post(URL, data)
    .then(res => {
      console.log(res.data)
      getAllUsers()
    })
    .catch(err => console.log(err))
  }


  const updateMovie = data => {
    const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
    axios.patch(URL, data)
    .then(res => {
        console.log(res.data)
        getAllUsers()
    })
    .catch(err => console.log(err))
  }

  const {register, reset, handleSubmit} = useForm()
      
  const submit = data =>{
    if (updateInfo) {
      updateMovie(data)
      setUpdateInfo()
    } else {
      createUser(data);
    }
    reset(defaultValue)
    handleCloseForm()
  }
  
  return (
    <form onSubmit={handleSubmit(submit)} className='form' >
        <i onClick={handleCloseForm} class="form__close fa-solid fa-xmark"></i>
        <h2 className='form__title' >
          {updateInfo 
          ? "Update User" 
          : "Create New User"}
        </h2>
        <ul className='form__list'>

          <li className='form__item'>
            <label htmlFor="email">Email</label> <br className='br' />
            <input placeholder='Email' {...register("email")} type="email" id="email"/>
          </li>

          <li className='form__item'>
            <label htmlFor="password">Password</label> <br className='br'/>
            <input placeholder='Password' {...register("password")} type="password" id="password"/>
          </li>

          <li className='form__item'>
            <label htmlFor="first_name">First Name</label> <br className='br'/>
            <input placeholder='First Name' {...register("first_name")} type="text" id="first_name"/>
          </li>
          
          <li className='form__item'>
            <label htmlFor="last_name">Last Name</label> <br className='br'/>
            <input placeholder='Last Name' {...register("last_name")} type="text" id="last_name"/>
          </li>

          <li className='form__item'>
            <label htmlFor="birthday">Birthday</label> <br className='br'/>
            <input placeholder='Birthday' {...register("birthday")} type="date" id="birthday"/>
          </li> 

        </ul>
        <button className='form__btn' >{updateInfo ? "Update" : "Create"}</button>
    </form>
  )
}

export default Form