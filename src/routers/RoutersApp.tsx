import { useAppDispatch } from '@hooks/useAppDispatch'
import { useAppSelector } from '@hooks/useAppSelector'
import { Login } from '@pages/login/Login'
import { Main } from '@pages/main/Main'
import { TaskPage } from '@pages/main/pages/task-page/TaskPage'
import { updateAuth } from '@store/slices/user-slice'
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cookies from 'universal-cookie'

export const RoutersApp = () => {
  const isAuth = useAppSelector(({user}) => user.isAuth)
  const dispatch = useAppDispatch()
  const cookie = new Cookies(null,{path: '/'})
  useEffect(() => {
    setInterval(() => {
      if(cookie.get('auth')){
        dispatch(updateAuth(true))
      } else{
        dispatch(updateAuth(false))
      }
    },2000)
  },[])
  
  useEffect(() => {
      if(cookie.get('auth')){
        dispatch(updateAuth(true))
      } else{
        dispatch(updateAuth(false))
      }
  },[])
  
  return (
    <Routes>
      <Route path='/' element={isAuth ? <Navigate to='/home'/>:<Navigate to='/login'/>}/>
      <Route path='/login' element={isAuth ? <Navigate to='/home'/>:<Login/>}/>
      <Route path='/home' element={isAuth ? <Main/>: <Navigate to='/login'/>}>
        <Route path='' element={<Navigate to='dashboard'/>}/>
        <Route path='dashboard' element={<TaskPage/>}/>
      </Route>
    </Routes>
  )
}
