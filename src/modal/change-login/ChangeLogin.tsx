import { ButtonSubmit } from '@components/buttonSubmit/ButtonSubmit'
import { Hint } from '@components/hint/Hint'
import { Input } from '@components/input/Input'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './change-login.module.scss'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { statusColor } from '@enum/statusColor'
import { loginUser, updateUser } from '@store/slices/user-slice'
import { IFormLogin } from '@store/types/actions-types'
import { IUpdateUser } from '@api/types/user-response'
interface ChangeLoginProps {
    onHide: () => void,
    show: boolean
}

export const ChangeLogin: FC<ChangeLoginProps> = ({show,onHide}) => {
  
  const dispatch = useAppDispatch()
    const [isNotEmptyLogin, setIsNotEmptyLogin] = useState<boolean>(false)
    const [isEnglishLogin, setIsEnglishLogin] = useState<boolean>(false)
    const [login, setLogin] = useState<string>('')
    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true)
    const [isValid, setIsValid] = useState<boolean>(false)
    
    useEffect(()=> {
        if(
        isNotEmptyLogin &&
        isEnglishLogin &&
        isValid
        ){
            setDisabledSubmit(false)
        } else {
            setDisabledSubmit(true)
        }
        
    },[
        isNotEmptyLogin,
        isEnglishLogin,
        isValid
    ])
    
    useEffect(() => {
        if(!login){
            setIsValid(false)
        } else{
            setIsValid(true)
        } 
    },[login])
    
    const emptyState = () => {
      setDisabledSubmit(true)
      setIsEnglishLogin(false)
      setIsValid(false)
      setIsNotEmptyLogin(false)
      setLogin('')
    }
    const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        const str: string = e.target.value
        const notEmty = !!str
        const english = /^[^А-Яа-я]+$/.test(str)
        setIsEnglishLogin(english)
        setIsNotEmptyLogin(notEmty)
        setLogin(str)
    }
    
    const onSubmit = () => {
        const form: IUpdateUser = {
            login,
        }
         dispatch(updateUser(form))
         onHide()
         emptyState()
    }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить логин
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.flex}>
        <Input placeholder='Логин' value={login} onChange={onChangeLogin}/>
                <Hint text='логин не должен быть пустым' color={isValid && isNotEmptyLogin ? statusColor.OK : statusColor.ERROR}/>
                <Hint text='латинские буквы' color={isValid && isEnglishLogin ? statusColor.OK : statusColor.ERROR} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonSubmit width='200px' text='Изменить' onClick={onSubmit}/>
      </Modal.Footer>
    </Modal>
  )
}
