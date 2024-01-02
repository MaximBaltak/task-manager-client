import React from 'react'
import styles from './register.module.scss'
import { Input } from '@components/input/Input'
import { Hint } from '@components/hint/Hint'
import { ButtonSubmit } from '@components/buttonSubmit/ButtonSubmit'

export const Register = () => {
  return (
    <div className={styles.register}>
        <p className={styles.title}>Регистрация</p>
        <div className={styles.form}>
            <div className={styles.input}>
                <Input placeholder='Имя' onChange={() => {}}/>
                <Hint text='имя не должно быть пустым' color='#FF0606'/>
            </div>
            <div className={styles.input}>
                <Input placeholder='Логин' onChange={() => {}}/>
                <Hint text='логин не должен быть пустым' color='#FF0606'/>
            </div>
            <div className={styles.input}>
                <Input placeholder='Пароль' onChange={() => {}}/>
                <Hint text='пароль не должен быть пустым' color='#FF0606'/>
                <Hint text='минимум 8 символов' color='#FF0606'/>
                <Hint text='латинские буквы' color='#FF0606'/>
                <Hint text='минимум 1 цифра' color='#FF0606'/>
                <Hint text='минимум 1 заглавная буква' color='#FF0606'/>
                <Hint text='минимум 1 прописная буква' color='#FF0606'/>
                <Hint text='специальный символ:  ! @ # $ % ^ & *' color='#FF0606'/>
            </div>
            <ButtonSubmit text='Зарегистрироваться' onClick={() => {}}/>
        </div>
    </div>
  )
}
