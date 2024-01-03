import React, { ChangeEvent, FC } from 'react'
import styles from './input.module.scss'
interface InputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    value: string
}
export const Input: FC<InputProps> = ({onChange,placeholder,value}) => {
    
  return <input className={styles.input} type="text" value={value} placeholder={placeholder} onChange={onChange} />
}
