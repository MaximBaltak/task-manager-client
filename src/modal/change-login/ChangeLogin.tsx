import { ButtonSubmit } from '@components/buttonSubmit/ButtonSubmit'
import { Hint } from '@components/hint/Hint'
import { Input } from '@components/input/Input'
import React, { FC } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './change-login.module.scss'
interface ChangeLoginProps {
    onHide: () => void,
    show: boolean
}

export const ChangeLogin: FC<ChangeLoginProps> = ({show,onHide}) => {
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
            <Input placeholder='Новый логин' onChange={() => {}}/>
            <Hint text='логин не должен быть пустым' color='#FF0606'/>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonSubmit width='200px' text='Изменить' onClick={onHide}/>
      </Modal.Footer>
    </Modal>
  )
}
