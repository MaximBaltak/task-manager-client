import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './textarea.module.scss'
interface TextareaProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    placeholder: string,
    value: string,
    maxCharacters?: number
}
export const Textarea: FC<TextareaProps> = ({onChange,placeholder,value, maxCharacters = 0}) => {
  const [characterCount, setCharacterCount] = useState(0); 

  useEffect(() => {
      setCharacterCount(value.length); 
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(maxCharacters) {
      if (e.target.value.length <= maxCharacters) {
        onChange(e);
        setCharacterCount(e.target.value.length);
      }
    } else {
      onChange(e);
    }
  };
  return (
    <div className={styles.wrapper}>
      <textarea 
      className={styles.input} 
      value={value} placeholder={placeholder}
      onChange={handleInputChange} />
      {maxCharacters ? 
      <p className={styles.count}>{characterCount}/{maxCharacters}</p> 
      : null}
    </div>
  )
}
