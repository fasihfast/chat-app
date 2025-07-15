// import { useState } from 'react'
import './App.css'
// import Navbar from './components/Navbar'
// import { Routes,Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import ProfilePage from './pages/ProfilePage'


function App() {


  return (
  <div>
    <h1 className='bg-amber-300'>Hello Tailwind CSS</h1>
    {/* <Navbar/> */}
    {/* <Routes>
      
      <Route path='/' element={<HomePage />} /> 
      <Route path='/signup' element={<SignUpPage />}  />
      <Route path='/login' element={<LogInPage />} />
      <Route path='/profile' element={<ProfilePage />} />

    </Routes> */}

  </div>
  )
}

export default App
