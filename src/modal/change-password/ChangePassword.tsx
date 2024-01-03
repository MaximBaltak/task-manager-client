import { ButtonSubmit } from '@components/buttonSubmit/ButtonSubmit'
import { Hint } from '@components/hint/Hint'
import { Input } from '@components/input/Input'
import React, { FC } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './change-password.module.scss'
interface ChangePasswordProps {
    onHide: () => void,
    show: boolean
}

export const ChangePassword: FC<ChangePasswordProps> = ({show,onHide}) => {
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
          Изменить пароль
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.flex}>
            <div className={styles.element}>
              <Input placeholder='Новый пароль' onChange={() => {}}/>
              <Hint text='пароль не должен быть пустым' color='#FF0606'/>
              <Hint text='минимум 8 символов' color='#FF0606'/>
              <Hint text='латинские буквы' color='#FF0606'/>
              <Hint text='минимум 1 цифра' color='#FF0606'/>
              <Hint text='минимум 1 заглавная буква' color='#FF0606'/>
              <Hint text='минимум 1 прописная буква' color='#FF0606'/>
              <Hint text='специальный символ:  ! @ # $ % ^ & *' color='#FF0606'/>
            </div>
            <div className={styles.element}>
              <Input placeholder='Повторить пароль' onChange={() => {}}/>
              <Hint text='пароль совпадают' color='#FF0606'/>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonSubmit width='200px' text='Изменить' onClick={onHide}/>
      </Modal.Footer>
    </Modal>
  )
}
