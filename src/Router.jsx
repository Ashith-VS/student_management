import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Pages/Login'
import Register from './Pages/Register'
import StudentManagement from './Pages/StudentManagement'
const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/studentManagement" element={<StudentManagement/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Router