import React, { FC } from 'react'
import styles from './buttonSubmit.module.scss'

interface ButtonSubmitProps {
  text: string,
  color?: string,
  width?: string,
  height?: string,
  background?: string,
  disabled?: boolean,
  onClick: (event: any) => void
}
export const ButtonSubmit: FC<ButtonSubmitProps> = ({ color, disabled, text, width, height, background, onClick }) => {
  const styleButton = {
    color,
    width,
    height,
    background,
    cursor: disabled ? 'auto': 'pointer',
    opacity: disabled ? 0.4 : 1
  }
  return (
    <button disabled={disabled} className={styles.submit} style={styleButton} onClick={onClick}>{text}</button>
  )
}
