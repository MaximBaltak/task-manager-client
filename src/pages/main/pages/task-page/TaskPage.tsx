import React, { useEffect, useState } from 'react'
import styles from "./task-page.module.scss"
import { ButtonCreate } from '@components/buttonCreate/ButtonCreate'
import { CreateTask } from '@modal/createTask/CreateTask'
import { StatusBoard } from './components/statusBoard/StatusBoard'
import { statusOptions } from '@const/constData'
import { ITask } from '@api/types/task-response'
import { useAppSelector } from '@hooks/useAppSelector'
import { statusTask } from '@enum/statusTaskType'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { initBoard } from '@store/slices/task-slice'

export const TaskPage = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(({ task }) => task.tasks)
  const creates = useAppSelector(({ task }) => task.taskCreate)
  const workes = useAppSelector(({ task }) => task.taskWorks)
  const closes = useAppSelector(({ task }) => task.taskClosed)
  const [maxHeight, setMaxHeight] = useState<number>(80)
  const [show, setShow] = useState<boolean>(false)
  const onHide = () => setShow(false)
  useEffect(() => {
    if (tasks) {
      dispatch(initBoard())
    }
  }, [tasks])
  useEffect(() => {
    const max = (Math.max(creates.length, workes.length, closes.length) * 160)
    setMaxHeight(max)
  }, [creates, closes, workes])
  return (
    <>
      <div className={styles.flex}>
        <StatusBoard  height={maxHeight} tasks={creates} status={statusOptions[0]} />
        <StatusBoard  height={maxHeight} tasks={workes} status={statusOptions[1]} />
        <StatusBoard  height={maxHeight} tasks={closes} status={statusOptions[2]} />
      </div>
      <CreateTask show={show} onHide={onHide} />
      <ButtonCreate onClick={() => setShow(true)} />
    </>
  )
}
