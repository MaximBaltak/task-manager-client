import { ButtonSubmit } from '@components/buttonSubmit/ButtonSubmit'
import { Hint } from '@components/hint/Hint'
import { Input } from '@components/input/Input'
import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import { Modal } from 'react-bootstrap'
import styles from './createTask.module.scss'
import { statusColor } from '@enum/statusColor'
import { Textarea } from '@components/textarea/Textarea'
import { countCharacters } from '@enum/countCharacters'
import { loginUser } from '@store/slices/user-slice'
import { ICreateTaskForm, IFormLogin } from '@store/types/actions-types'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { create } from '@store/slices/detail-task-slice'
interface CreateTaskProps {
    onHide: () => void,
    show: boolean
}

export const CreateTask: FC<CreateTaskProps> = ({show,onHide}) => {
  const [title, setTitle] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const [isNotEmptyTitle, setIsNotEmptyTitle] = useState<boolean>(false)
  const [isMaxLengthTitle, setIsMaxLengthTitle] = useState<boolean>(false)
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true)
  const [isValid, setIsValid] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  useEffect(()=> {
      if(
      isNotEmptyTitle && 
      isMaxLengthTitle &&
      isValid
      ){
          setDisabledSubmit(false)
      } else {
          setDisabledSubmit(true)
      }
      
  },[
      isMaxLengthTitle,
      isNotEmptyTitle,
      isValid
  ])
  
  useEffect(() => {
      if(!title){
          setIsValid(false)
      } else{
          setIsValid(true)
      } 
  },[title])
  
  const emptyState = () => {
    setTitle('')
    setDescription('')
    setIsValid(false)
    setIsMaxLengthTitle(false)
    setIsNotEmptyTitle(false)
    setDisabledSubmit(true)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      const str: string = e.target.value
      const notEmty = !!str
      const isLength = !(str.length > countCharacters.MAX_TITLE_TASK)
      setIsMaxLengthTitle(isLength)
      setIsNotEmptyTitle(notEmty)
      setTitle(str)
  }
  
  const onChangeDecription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }
  
  const onSubmit = () => {
      const form: ICreateTaskForm = {
          title,
          description
      }
       dispatch(create(form))
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
          Создать задачу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.flex}>
        <Input placeholder='Название' value={title} onChange={onChangeTitle} />
        <Hint text='название не должно быть пустым' color={isValid && isNotEmptyTitle ? statusColor.OK : statusColor.ERROR} />
        <Hint text='максимальная длина 100 символов' color={isValid && isMaxLengthTitle ? statusColor.OK : statusColor.ERROR} />
        </div>
        <div className={styles.flex} style={{marginTop: 30}}>
        <Textarea 
        maxCharacters={countCharacters.MAX_DESC_TASK} 
        placeholder='Описание' value={description} onChange={onChangeDecription} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonSubmit disabled={disabledSubmit} width='200px' text='Создать' onClick={onSubmit}/>
      </Modal.Footer>
    </Modal>
  )
}
