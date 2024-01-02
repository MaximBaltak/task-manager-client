import { Logo } from '@components/logo/Logo'
import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import styles from './login.module.scss'
import { Register } from './components/register/Register'
import LoginSvg from '@assets/image/login.svg'
import RegisterSvg from '@assets/image/register.svg'
import { TooltipHint } from '@components/tooltip/TooltipHint'
import { typeAuth } from '@enum/typeAuth'
import { Auth } from './components/auth/Auth'

export const Login = () => {
    const [type, setType] = useState<typeAuth>(typeAuth.LOGIN)
    return (
        <>
            {
                type === typeAuth.REGISTER ?
                    <TooltipHint text='Войти'>
                        <img
                        onClick={() => setType(typeAuth.LOGIN)} 
                        className={styles.mode}
                        src={LoginSvg} alt="Войти" />
                    </TooltipHint> :
                    <TooltipHint text='Зарегистрироваться'>
                        <img
                        onClick={() => setType(typeAuth.REGISTER)}
                        className={styles.mode} 
                        src={RegisterSvg} alt="Зарегистрироваться" />
                    </TooltipHint>
            }

            <Container style={{ position: 'relative' }}>
                <Row className={styles.wrapper}>
                    <Logo size='bg' />
                </Row>
                <Row style={{ marginTop: 50 }} className={styles.wrapper}>
                    {
                        type === typeAuth.REGISTER ? <Register /> : <Auth/>
                    }
                </Row>
            </Container>
        </>
    )
}
