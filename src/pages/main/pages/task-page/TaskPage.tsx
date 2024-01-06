import React, { useEffect, useState } from 'react'
import styles from "./task-page.module.scss"
import { ButtonCreate } from '@components/buttonCreate/ButtonCreate'
import { CreateTask } from '@modal/createTask/CreateTask'
import { StatusBoard } from './components/statusBoard/StatusBoard'
import { statusOptions } from '@const/constData'
import { useAppSelector } from '@hooks/useAppSelector'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { getTasks, initBoard } from '@store/slices/task-slice'
import { DialogTask } from './components/dialogTask/DialogTask'
export const DetailModalContext = React.createContext({})
export const TaskPage = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(({ task }) => task.tasks)
  const creates = useAppSelector(({ task }) => task.taskCreate)
  const workes = useAppSelector(({ task }) => task.taskWorks)
  const closes = useAppSelector(({ task }) => task.taskClosed)
  const [isDetail, setIsDetail] = useState<boolean>(false)
  const [maxHeight, setMaxHeight] = useState<number>(80)
  const [show, setShow] = useState<boolean>(false)
  const [taskDetailId, setTaskDetailId] = useState<number>(0)
  const onHide = () => setShow(false)
  const onHideMoadl = () => {
    setIsDetail(false)
    setTaskDetailId(0)
  }
  const onShowModal = (taskId: number) => {
    setTaskDetailId(taskId)
    setIsDetail(true)
  }

  useEffect(() => {
    if (tasks) {
      dispatch(initBoard())
    }
  }, [tasks])
  useEffect(() => {
    dispatch(getTasks())
  }, [])

  useEffect(() => {
    const max = (Math.max(creates.length, workes.length, closes.length) * 160)
    setMaxHeight(max)
  }, [creates, closes, workes])
  return (
    <div style={{height: "94vh"}}>
      <DetailModalContext.Provider value={{ onShowModal }}>
        {
          tasks.length ? (
            <div className={styles.flex}>
              <StatusBoard height={maxHeight} tasks={creates} status={statusOptions[0]} />
              <StatusBoard height={maxHeight} tasks={workes} status={statusOptions[1]} />
              <StatusBoard height={maxHeight} tasks={closes} status={statusOptions[2]} />
            </div>
          ) : (
            <div className={styles.text}>
              <p>Создайте первую задачу для отображения доски задачи</p>
            </div>
          )
        }
      </DetailModalContext.Provider>
      <CreateTask show={show} onHide={onHide} />
      <ButtonCreate onClick={() => setShow(true)} />
      <DialogTask id={taskDetailId} show={isDetail} onClose={onHideMoadl} />
    </div>
  )
}
