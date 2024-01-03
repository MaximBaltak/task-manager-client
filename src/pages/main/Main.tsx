import React from 'react'
import './main.module.scss'
import { Container } from 'react-bootstrap'
import { Header } from './components/header/Header'
import { Outlet } from 'react-router-dom'
export const Main = () => {
    return (
    <>
        <Header/>
        <Container>
            <Outlet/>
        </Container>
    </>
  )
}
