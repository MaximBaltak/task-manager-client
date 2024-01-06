import React, { FC, useState } from 'react'
import styles from './cardTask.module.scss'
import { DialogTask } from '../dialogTask/DialogTask'
import { ITask } from '@api/types/task-response'
import { DragPreviewImage, useDrag } from 'react-dnd'
import { itemType } from '@enum/itemType'
import S from '@assets/image/logo.svg'

interface CardTaskProps {
    statusColor: string,
    task: ITask
}
export const CardTask:FC<CardTaskProps> = ({statusColor,task}) => {
  const [isDetail, setIsDetail] = useState<boolean>(false)
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: itemType.CARD_TASK,
    previewOptions: {
      offsetX: 0.5,
      offsetY: 0.5
    },
    item: { task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const onHide = () => setIsDetail(false)
  const onShow = () => setIsDetail(true)
  return(
    <>
      <div ref={dragRef}  style={{
        border: `1px solid ${statusColor}`,
        opacity: isDragging ? 0 : 1,
        }} className={styles.card}>
          <p onClick={onShow} className={styles.id}>Task-{task.id}</p>
          <p className={styles.title}>{task.title}</p>
      </div>
    <DialogTask id={task.id} show={isDetail} onClose={onHide}/>
    </>
  )
}
