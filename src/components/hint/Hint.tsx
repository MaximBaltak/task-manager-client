import React, { FC } from 'react'
import styles from './Hint.module.scss'

interface HintProps {
    text: string,
    color: string    
}
export const Hint: FC<HintProps> = ({color, text}) => {
  return (
    <div className={styles.hint}>
        <div style={{background: color}} className={styles.status}></div>
        <p style={{color}} className={styles.text}>{text}</p>
    </div>
  )
}
