import React, { useState } from 'react'
import styles from './header.module.scss'
import { Logo } from '@components/logo/Logo'
import { Link } from 'react-router-dom'
import { TooltipHint } from '@components/tooltip/TooltipHint'
import TaskSVG from '@assets/image/task.svg'
import { DialogProfile } from '../dialog-profile/DialogProfile'
export const Header = () => {
    const [show, setShow] = useState<boolean>(false)
    
    const onShow = () => setShow(true)
    const onClose = () => setShow(false)
    return (
    <>
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <Logo size='md' color='white' />
                <TooltipHint text='Профиль' placement='bottom'>
                <p onClick={onShow} className={styles.profile}>Балтак Максим Владимирович</p>
                </TooltipHint>
            </div>
            <div className={styles.menu}>
                <Link to='/home/task'>
                    <TooltipHint text='задачи' placement='bottom'>
                        <img className={styles.task} src={TaskSVG} alt="задачи" />
                    </TooltipHint>
                </Link>
            </div>
            <div className={styles.out}>
                <p className={styles.text}>Выйти</p>
            </div>
        </div>
        <DialogProfile onClose={onClose} show={show}/>
    </>
    )
}
