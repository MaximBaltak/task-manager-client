import React, { FC } from 'react'
import styles from './statusBoard.module.scss'
import { CardTask } from '../cardTask/CardTask'
import { IStatusSelect } from '@components/selectStatus/types/selectStatus'
import { ITask } from '@api/types/task-response'
import { itemType } from '@enum/itemType'
import { useDrop } from 'react-dnd'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { IUpdateBoard, IUpdateTaskForm } from '@store/types/actions-types'
import { getCountByStatus, getTasks, updateBoards } from '@store/slices/task-slice'
import { updateTask } from '@store/slices/detail-task-slice'
interface StatusBoardProps {
    status: IStatusSelect,
    tasks: ITask[],
    height: number,
}
export const StatusBoard: FC<StatusBoardProps> = ({ status,tasks,height }) => {
    const dispatch = useAppDispatch()
    const [ {isOver}, dropRef] = useDrop(() => {
        return {
            accept: itemType.CARD_TASK,
          async drop(item: any) {
                const form: IUpdateTaskForm = {
                    id: item.task.id,
                    status: status.value
                  }
                  await dispatch(updateTask(form))
                  dispatch(getTasks())
            },
            collect(monitor) {
                return {
                    isOver: monitor.isOver()
                }
            },
        }
    })
    return (
        <div ref={dropRef} style={{
            minHeight: height,
            backgroundColor: isOver ? '#ff707033': "transparent"
            }} className={styles.board}>
            <div className={styles.header} style={{ background: status.color }}>
                <p>{status.name}</p>
            </div>
            <ul className={styles.list}>
                {
                    tasks.map(task => 
                        <li key={task.id}><CardTask task={task} statusColor={status.color} /></li>)
                }
            </ul>
        </div>
    )
}