import { ButtonSubmit } from '@components/buttonSubmit/ButtonSubmit'
import { Hint } from '@components/hint/Hint'
import { Input } from '@components/input/Input'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './change-name.module.scss'
import './style.scss'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { statusColor } from '@enum/statusColor'
import { IUpdateUser } from '@api/types/user-response'
import { updateUser } from '@store/slices/user-slice'
interface ChangeNameProps {
    onHide: () => void,
    show: boolean
}

export const ChangeName: FC<ChangeNameProps> = ({show,onHide}) => {
  
  const dispatch = useAppDispatch()
  const [isNotEmptyName, setIsNotEmptyName] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [disabledSubmit,setDisabledSubmit] = useState<boolean>(true)
  
  useEffect(()=> {
      if(isNotEmptyName ){
          setDisabledSubmit(false)
      } else {
          setDisabledSubmit(true)
      }
      
  },[isNotEmptyName])
  
  
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
      const str: string = e.target.value
      const notEmty = !!str
      
      setIsNotEmptyName(notEmty)
      setName(str)
  }
  
  const onSubmit = () => {
      const form: IUpdateUser = {
          name,
      }
      dispatch(updateUser(form))
      onHide()
      setDisabledSubmit(true)
      setIsNotEmptyName(false)
      setName('')
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
          Изменить имя
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.flex}>
        <Input placeholder='Имя' value={name} onChange={onChangeName} />
        <Hint text='имя не должно быть пустым' color={isNotEmptyName ? statusColor.OK : statusColor.ERROR} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonSubmit disabled={disabledSubmit} width='200px' text='Изменить' onClick={onSubmit}/>
      </Modal.Footer>
    </Modal>
  )
}
