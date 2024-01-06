import React, { useEffect } from 'react'
import './main.module.scss'
import { Container } from 'react-bootstrap'
import { Header } from './components/header/Header'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { getUser } from '@store/slices/user-slice'
import { useAppSelector } from '@hooks/useAppSelector'
export const Main = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(({user}) => user.user)
    useEffect(() => {
        if(!user) {
            dispatch(getUser())
        }
    },[user])
    
    return (
    <>
        <Header/>
        <Outlet/>
    </>
  )
}
