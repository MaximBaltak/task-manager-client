import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './auth.module.scss'
import { Input } from '@components/input/Input'
import { Hint } from '@components/hint/Hint'
import { ButtonSubmit } from '@components/buttonSubmit/ButtonSubmit'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { IFormLogin } from '@store/types/actions-types'
import { statusColor } from '@enum/statusColor'
import { loginUser } from '@store/slices/user-slice'

export const Auth= () => {
    const dispatch = useAppDispatch()
    const [isNotEmptyLogin, setIsNotEmptyLogin] = useState<boolean>(false)
    const [isEnglishLogin, setIsEnglishLogin] = useState<boolean>(false)
    const [isNotEmptyPassword, setIsNotEmptyPassword] = useState<boolean>(false)
    const [isLengthPassword, setIsLengthPassword] = useState<boolean>(false)
    const [isEnglishPassword, setIsEnglishPassword] = useState<boolean>(false)
    const [isNumberPassword, setIsNumberPassword] = useState<boolean>(false)
    const [isUpperCasePassword, setIsUpperCasePassword] = useState<boolean>(false)
    const [isLowerCasePassword, setIsLowerCasePassword] = useState<boolean>(false)
    const [isSpecialSymbolPassword, setIsSpecialSymbolPassword] = useState<boolean>(false)
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true)
    const [isValid, setIsValid] = useState<boolean>(false)
    
    useEffect(()=> {
        if(
        isNotEmptyLogin &&
        isEnglishLogin &&
        isNotEmptyPassword &&
        isLengthPassword &&
        isEnglishPassword &&
        isNumberPassword &&
        isLowerCasePassword &&
        isUpperCasePassword &&
        isSpecialSymbolPassword &&
        isValid
        ){
            setDisabledSubmit(false)
        } else {
            setDisabledSubmit(true)
        }
        
    },[
        isNotEmptyLogin,
        isEnglishLogin,
        isNotEmptyPassword,
        isLengthPassword,
        isEnglishPassword,
        isNumberPassword,
        isLowerCasePassword,
        isUpperCasePassword,
        isSpecialSymbolPassword,
        isValid
    ])
    
    useEffect(() => {
        if(!login && !password){
            setIsValid(false)
        } else{
            setIsValid(true)
        } 
    },[password,login])
    
    
    const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        const str: string = e.target.value
        const notEmty = !!str
        const english = /^[^А-Яа-я]+$/.test(str)
        setIsEnglishLogin(english)
        setIsNotEmptyLogin(notEmty)
        setLogin(str)
    }
    
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const str: string = e.target.value
        const notEmty = !!str
        const english = /^[^А-Яа-я]+$/.test(str)
        const length = str.length >= 8
        const number = /[0-9]+/.test(str)
        const upper = /[A-Z]+/.test(str)
        const lower = /[a-z]+/.test(str)
        const special = /[!@#$%^&*]+/.test(str)
        
        setIsEnglishPassword(english)
        setIsNotEmptyPassword(notEmty)
        setIsLengthPassword(length)
        setIsLowerCasePassword(lower)
        setIsUpperCasePassword(upper)
        setIsNumberPassword(number)
        setIsSpecialSymbolPassword(special)
        setPassword(str)
    }
    const onSubmit = () => {
        const form: IFormLogin = {
            login,
            password
        }
         dispatch(loginUser(form))
    }
  return (
    <div className={styles.register}>
        <p className={styles.title}>Вход</p>
        <div className={styles.form}>
            <div className={styles.input}>
                <Input placeholder='Логин' value={login} onChange={onChangeLogin}/>
                <Hint text='логин не должен быть пустым' color={isValid && isNotEmptyLogin ? statusColor.OK : statusColor.ERROR}/>
                <Hint text='латинские буквы' color={isValid && isEnglishLogin ? statusColor.OK : statusColor.ERROR} />
            </div>
            <div className={styles.input}>
                <Input placeholder='Пароль' value={password} onChange={onChangePassword}/>
                <Hint text='пароль не должен быть пустым' color={isValid && isNotEmptyPassword ? statusColor.OK : statusColor.ERROR}/>
                <Hint text='минимум 8 символов' color={isValid && isLengthPassword ? statusColor.OK : statusColor.ERROR}/>
                <Hint text='латинские буквы' color={isValid && isEnglishPassword ? statusColor.OK : statusColor.ERROR}/>
                <Hint text='минимум 1 цифра' color={isValid && isNumberPassword ? statusColor.OK : statusColor.ERROR}/>
                <Hint text='минимум 1 заглавная буква' color={isValid && isUpperCasePassword ? statusColor.OK : statusColor.ERROR}/>
                <Hint text='минимум 1 прописная буква' color={isValid && isLowerCasePassword ? statusColor.OK : statusColor.ERROR}/>
                <Hint text='специальный символ:  ! @ # $ % ^ & *' color={isValid && isSpecialSymbolPassword ? statusColor.OK : statusColor.ERROR}/>
            </div>
            <ButtonSubmit text='Войти' disabled={disabledSubmit} onClick={onSubmit}/>
        </div>
    </div>
  )
}
