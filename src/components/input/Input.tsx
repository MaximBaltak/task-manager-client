import React, { ChangeEvent, FC } from 'react'
import styles from './input.module.scss'
interface InputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string, 
}
export const Input: FC<InputProps> = ({onChange,placeholder}) => {
    
  return <input className={styles.input} type="text" placeholder={placeholder} onChange={onChange} />
}
