import { Login } from '@pages/login/Login'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export const RoutersApp = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}
