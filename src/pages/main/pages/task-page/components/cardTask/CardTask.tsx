import React, { FC, useContext} from 'react'
import styles from './cardTask.module.scss'
import { ITask } from '@api/types/task-response'
import { itemType } from '@enum/itemType'
import { useDrag } from 'react-dnd'
import { DetailModalContext } from '../../TaskPage'

interface CardTaskProps {
    statusColor: string,
    task: ITask
}
export const CardTask:FC<CardTaskProps> = ({statusColor,task}) => {
  const context: any = useContext(DetailModalContext)
  const [{ isDragging }, dragRef] = useDrag(() => ({
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
  
  return(
    <>
      <div ref={dragRef}  style={{
        border: `1px solid ${statusColor}`,
        opacity: isDragging ? 0 : 1,
        }} className={styles.card}>
          <p onClick={() => context.onShowModal(task.id)} className={styles.id}>Task-{task.id}</p>
          <p className={styles.title}>{task.title}</p>
      </div>
    
    </>
  )
}
