import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import CardUsers from './Components/Card User/CardUsers'
import Form from './Components/Form/Form'


function App() {

  //js
  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [isFormOpen, setIsFormOpen] = useState(false)


  const getAllUsers = () =>{
    const URL = "https://users-crud1.herokuapp.com/users/"
    axios.get(URL)
    .then(res =>setUsers(res.data))
    .catch(err => console.log(err))
  }


  useEffect(() => {
    getAllUsers()
  }, [])
  
  const handleOpenForm  = () =>{
    setIsFormOpen(true)
  }

  const handleCloseForm = () =>{
    setIsFormOpen(false)
  }

  return (
    <div className="App">
    <div className="App__header">
    <h1>Users</h1>
    <button className='App__addBtn' onClick={handleOpenForm}>+</button>
    </div>
    <div className={isFormOpen ? "App__formContainer" : "App__formContainerNone"}>
      <Form 
      getAllUsers={getAllUsers}
      updateInfo={updateInfo} 
      setUpdateInfo={setUpdateInfo}
      handleCloseForm={handleCloseForm}
      />
    </div>
    <div className="App__cardContainer">
      {
        users?.map(user =>(
          <CardUsers
          key={user.id}
          user={user}
          getAllUsers={getAllUsers}
          setUpdateInfo={setUpdateInfo}
          handleOpenForm={handleOpenForm}
          />
        ))
      }
    </div>
    </div>
  )
}

export default App
