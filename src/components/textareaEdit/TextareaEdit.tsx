import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import styles from './textareaEdit.module.scss'
interface TextareaEditProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onCloseEdit: () => void
  placeholder: string;
  value: string;
  className: string;
  maxCharacters?: number; // максимальное количество символов
}

export const TextareaEdit: FC<TextareaEditProps> = ({
  onChange,
  onCloseEdit,
  placeholder,
  value,
  className,
  maxCharacters = 0,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [characterCount, setCharacterCount] = useState(0); 

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";

      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        20
      )}px`;

      setCharacterCount(value.length); 
    }
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
    <div onDoubleClick={onCloseEdit} onTouchEnd={onCloseEdit}>
      <textarea
        ref={textareaRef}
        className={className}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      {maxCharacters ? <p className={styles.count}>{characterCount}/{maxCharacters}</p> : null}
    </div>
  );
};


