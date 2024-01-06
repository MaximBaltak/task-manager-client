import React, { useState } from 'react'
import styles from './header-mobile.module.scss'
import { Logo } from '@components/logo/Logo'
import MenuMobileSVG from '@assets/image/menu-mobile.svg'
import { DialogProfile } from '../dialog-profile/DialogProfile'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.scss'
import { useAppSelector } from '@hooks/useAppSelector'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { exitUser } from '@store/slices/user-slice'
export const HeaderMobile = () => {
    const [show, setShow] = useState<boolean>(false)
    const user = useAppSelector(({user}) => user.user) 
    const dispatch = useAppDispatch()
    const onShow = () => setShow(true)
    const onClose = () => setShow(false)
    return (
        <>
            <div className={styles.header}>
                <div className={styles.wrapper}>
                    <Logo size='md' color='white' />
                    <p onClick={onShow} className={styles.profile}>{user?.name}</p>
                </div>
                <div className={styles.menu}>
                    <div className={styles.out}>
                        <p onClick={() => dispatch(exitUser())} className={styles.text}>Выйти</p>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle as='div' id="dropdown-basic">
                            <img className={styles.mobile} src={MenuMobileSVG} alt="меню" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item >
                            <Link className={styles.link} to='/home/task'>
                                Задачи
                            </Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            
                </div>
            </div>
            <DialogProfile user={null} onClose={onClose} show={show} />
        </>
    )
}
