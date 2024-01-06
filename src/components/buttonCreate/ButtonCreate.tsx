import React, { FC } from 'react'
import AddSVG from '@assets/image/add.svg'
import styles from './buttonCreate.module.scss'
interface ButtonCreateProps {
    onClick: () => void,
    color?: string
}

export const ButtonCreate: FC<ButtonCreateProps> = ({onClick, color}) => {
  return (
    <button style={{background: color}} onClick={onClick} className={styles.button}>
        <img src={AddSVG} alt="добавить" />
    </button>
  )
}
