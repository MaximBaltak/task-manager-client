import { ButtonSubmit } from '@components/buttonSubmit/ButtonSubmit'
import React, { FC } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './deleteTask.module.scss'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { deleteTask } from '@store/slices/detail-task-slice'
import { getTasks } from '@store/slices/task-slice'

interface DeleteTaskProps {
    onHide: () => void,
    show: boolean,
    id: number,
    onCloseDetail: () => void 
}

export const DeleteTask: FC<DeleteTaskProps> = ({show,onHide, id,onCloseDetail}) => {
  const dispatch = useAppDispatch()
  const onSubmit = async () => {
   await dispatch(deleteTask(id))
    dispatch(getTasks())
    onCloseDetail()
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
            Вы точно хотите удалить задачу?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonSubmit background='#03C138' width='100px' text='Да' onClick={onSubmit}/>
        <ButtonSubmit background='#FF0606' width='100px' text='Нет' onClick={onHide}/>
      </Modal.Footer>
    </Modal>
  )
}
