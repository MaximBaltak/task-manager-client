import { Login } from '@pages/login/Login'
import { Main } from '@pages/main/Main'
import { TaskPage } from '@pages/main/pages/task-page/TaskPage'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export const RoutersApp = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Main/>}>
        <Route path='' element={<Navigate to='task'/>}/>
        <Route path='task' element={<TaskPage/>}/>
      </Route>
    </Routes>
  )
}
