import { ButtonSubmit } from '@components/buttonSubmit/ButtonSubmit'
import React, { FC } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './delete-profile.module.scss'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { deleteUser } from '@store/slices/user-slice'

interface DeleteProfileProps {
    onHide: () => void,
    show: boolean
}

export const DeleteProfile: FC<DeleteProfileProps> = ({show,onHide}) => {
  const dispatch = useAppDispatch()
  const onSubmit = () => {
    
    dispatch(deleteUser())
    onHide()
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className={styles.flex}>
            Вы точно хотите удалить свой профиль?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonSubmit background='#03C138' width='100px' text='Да' onClick={onSubmit}/>
        <ButtonSubmit background='#FF0606' width='100px' text='Нет' onClick={onHide}/>
      </Modal.Footer>
    </Modal>
  )
}
