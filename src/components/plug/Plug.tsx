import React, { FC } from 'react'
import styles from './plug.module.scss'

interface PlugProps {
    message: string
}
export const Plug: FC<PlugProps> = ({message}) => {
  return (
    <div className={styles.overlay}>
        <p className={styles.text}>{message}</p>
    </div>
  )
}
