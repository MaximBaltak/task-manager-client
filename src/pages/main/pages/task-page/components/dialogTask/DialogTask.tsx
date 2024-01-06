import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './dialogTask.module.scss'
import { Offcanvas } from 'react-bootstrap'
import { SelectStatus } from '@components/selectStatus/SelectStatus'
import { IStatusSelect } from '@components/selectStatus/types/selectStatus'
import { statusTask, statusTaskColor } from '@enum/statusTaskType'
import { DeleteTask } from '@modal/deleteTask/DeleteTask'
import { TextareaEdit } from '@components/textareaEdit/TextareaEdit'
import { countCharacters } from '@enum/countCharacters'
import { defaultStatus, statusOptions } from '@const/constData'
import { ITask } from '@api/types/task-response'
import { useAppSelector } from '@hooks/useAppSelector'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { update, updateStatus } from '@store/slices/detail-task-slice'
import { IUpdateStatusTaskForm, IUpdateTaskForm } from '@store/types/actions-types'
interface DialogTaskProps {
  onClose: () => void
  show: boolean,
  id: number
}


export const DialogTask: FC<DialogTaskProps> = ({onClose,show}) => {
    const task = useAppSelector(state => state.detailTask.task)
    const dispatch = useAppDispatch() 
    const [selectedStatus,setSelectedStatus] = useState<IStatusSelect[]>([defaultStatus])
    const [isShow, setIsShow] = useState<boolean>(false)
    const [descEdit, setDescEdit] = useState<string>("");
    const [titleEdit, setTitleEdit] = useState<string>("");
    const [isEditTitle,setIsEditTitle] = useState<boolean>(false)
    const [isEditDescription,setIsEditDescription] = useState<boolean>(false)
    
    useEffect(() => {
      if(show && task){
          const statusName = task.status
          const status = statusOptions.find(el => el.value === statusName) ?? {} as IStatusSelect
          setSelectedStatus([status])
      } else {
        setDescEdit('')
        setIsEditDescription(false)
        setIsEditTitle(false)
        setTitleEdit('')
      }
    },[show,task])
    
    const onShow = () => setIsShow(true)
    const onHide = () => setIsShow(false)
    
    const onChangeStatus = (value: IStatusSelect[]) => {
      if(value[0].value !== task?.status) {
        const form: IUpdateStatusTaskForm = {
          id: 12,
          status: value[0].value
        }
        dispatch(updateStatus(form))
      }
      setSelectedStatus([...value])
    }
    const onChangeDescEdit = (event:ChangeEvent<HTMLTextAreaElement>) => {
      setDescEdit(event.target.value)
    };
    const onChangeTitleEdit = (event:ChangeEvent<HTMLTextAreaElement>) => {
      setTitleEdit(event.target.value)
    };
    
    const openEditTitle = () => {
      if(task){
        setTitleEdit(task.title)
        setIsEditTitle(true)
      } 
    }
    const openEditDescription = () => {
      if(task){
        setDescEdit(task.description)
        setIsEditDescription(true)
      } 
    }
    const closeEditTitle = () => {
      if(!titleEdit.length) return;
      
      if(task?.title !== titleEdit) {
        const form: IUpdateTaskForm = {
          id: 12,
          title: titleEdit
        }
          dispatch(update(form))
      }
      setIsEditTitle(false)
    }
    
    const closeEditDesc = () => {
         if(task?.description !== descEdit) {
        const form: IUpdateTaskForm = {
          id: 12,
          description: descEdit
        }
          dispatch(update(form))
      }
      setIsEditDescription(false)
    }
    
    return (
    <>
    <Offcanvas show={show} onHide={onClose} placement='end'>
        <Offcanvas.Header>
          <Offcanvas.Title style={{width: '100%'}}>
          <div className={styles.flex} >
            <p className={styles.id}>Task-{task?.id}</p>
            <SelectStatus options={statusOptions} selected={selectedStatus} onChange={onChangeStatus}/>
          </div>
          {
            isEditTitle? 
            <TextareaEdit onCloseEdit={closeEditTitle} maxCharacters={countCharacters.MAX_TITLE_TASK} className={styles.editTitle} value={titleEdit} onChange={onChangeTitleEdit} placeholder='Название'/>
            :<p onDoubleClick={openEditTitle} className={styles.title}>{task?.title}</p>   
          }
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{position: 'relative'}}>
          {
            isEditDescription ?
            <TextareaEdit onCloseEdit={closeEditDesc} maxCharacters={countCharacters.MAX_DESC_TASK} className={styles.editDesc} value={descEdit} onChange={onChangeDescEdit} placeholder='Описание'/> 
            :
            <p onDoubleClick={openEditDescription} className={styles.desc}>{task?.description}</p>
          }
          
          <p className={styles.delete} onClick={onShow}>Удалит задачу</p>
        </Offcanvas.Body>
      </Offcanvas>
      <DeleteTask show={isShow} onHide={onHide}/>
      </>
  )
}
