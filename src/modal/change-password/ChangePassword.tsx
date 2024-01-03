import { ButtonSubmit } from '@components/buttonSubmit/ButtonSubmit'
import { Hint } from '@components/hint/Hint'
import { Input } from '@components/input/Input'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './change-password.module.scss'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { statusColor } from '@enum/statusColor'
import { IUpdatePasswordForm } from '@api/types/user-response'
import { updatePassword } from '@store/slices/user-slice'
interface ChangePasswordProps {
  onHide: () => void,
  show: boolean
}

export const ChangePassword: FC<ChangePasswordProps> = ({ show, onHide }) => {

  const dispatch = useAppDispatch()
  const [isNotEmptyOldPassword, setIsNotEmptyOldPassword] = useState<boolean>(false)
  const [isLengthOldPassword, setIsLengthOldPassword] = useState<boolean>(false)
  const [isEnglishOldPassword, setIsEnglishOldPassword] = useState<boolean>(false)
  const [isNumberOldPassword, setIsNumberOldPassword] = useState<boolean>(false)
  const [isUpperCaseOldPassword, setIsUpperCaseOldPassword] = useState<boolean>(false)
  const [isLowerCaseOldPassword, setIsLowerCaseOldPassword] = useState<boolean>(false)
  const [isSpecialSymbolOldPassword, setIsSpecialSymbolOldPassword] = useState<boolean>(false)
  const [isNotEmptyNewPassword, setIsNotEmptyNewPassword] = useState<boolean>(false)
  const [isLengthNewPassword, setIsLengthNewPassword] = useState<boolean>(false)
  const [isEnglishNewPassword, setIsEnglishNewPassword] = useState<boolean>(false)
  const [isNumberNewPassword, setIsNumberNewPassword] = useState<boolean>(false)
  const [isUpperCaseNewPassword, setIsUpperCaseNewPassword] = useState<boolean>(false)
  const [isLowerCaseNewPassword, setIsLowerCaseNewPassword] = useState<boolean>(false)
  const [isSpecialSymbolNewPassword, setIsSpecialSymbolNewPassword] = useState<boolean>(false)
  const [coincidenceConfirmPassword, setCoincidenceConfirmPassword] = useState<boolean>(false)
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true)
  const [isValid, setIsValid] = useState<boolean>(false)

  useEffect(() => {
    if (
      isNotEmptyOldPassword &&
      isLengthOldPassword &&
      isEnglishOldPassword &&
      isNumberOldPassword &&
      isLowerCaseOldPassword &&
      isUpperCaseOldPassword &&
      isSpecialSymbolOldPassword &&
      coincidenceConfirmPassword &&
      isNotEmptyNewPassword &&
      isLengthNewPassword &&
      isEnglishNewPassword &&
      isNumberNewPassword &&
      isLowerCaseNewPassword &&
      isUpperCaseNewPassword &&
      isSpecialSymbolNewPassword &&
      isValid
    ) {
      setDisabledSubmit(false)
    } else {
      setDisabledSubmit(true)
    }

  }, [
    isNotEmptyOldPassword,
    isLengthOldPassword,
    isEnglishOldPassword,
    isNumberOldPassword,
    isLowerCaseOldPassword,
    isUpperCaseOldPassword,
    isSpecialSymbolOldPassword,
    isNotEmptyNewPassword,
    isLengthNewPassword,
    isEnglishNewPassword,
    isNumberNewPassword,
    isLowerCaseNewPassword,
    isUpperCaseNewPassword,
    isSpecialSymbolNewPassword,
    coincidenceConfirmPassword,
    isValid
  ])

  useEffect(() => {
    if (!newPassword && !oldPassword && !confirmPassword) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [oldPassword, newPassword,confirmPassword])
  
  useEffect(() => {
    if(isValid && (newPassword === confirmPassword) && newPassword && confirmPassword){
      setCoincidenceConfirmPassword(true)
    } else {
      setCoincidenceConfirmPassword(false)
    }
  }, [isValid,confirmPassword, newPassword])

  const emptyState = () => {
      setIsNotEmptyOldPassword(false)
      setIsLengthOldPassword(false)
      setIsEnglishOldPassword(false)
      setIsNumberOldPassword(false)
      setIsUpperCaseOldPassword(false)
      setIsLowerCaseOldPassword(false)
      setIsSpecialSymbolOldPassword(false)
      setIsNotEmptyNewPassword(false)
      setIsLengthNewPassword(false)
      setIsEnglishNewPassword(false)
      setIsNumberNewPassword(false)
      setIsUpperCaseNewPassword(false)
      setIsLowerCaseNewPassword(false)
      setIsSpecialSymbolNewPassword(false)
      setCoincidenceConfirmPassword(false)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setDisabledSubmit(true)
      setIsValid(false) 
  }
  const onChangeOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const str: string = e.target.value
    const notEmty = !!str
    const english = /^[^А-Яа-я]+$/.test(str)
    const length = str.length >= 8
    const number = /[0-9]+/.test(str)
    const upper = /[A-Z]+/.test(str)
    const lower = /[a-z]+/.test(str)
    const special = /[!@#$%^&*]+/.test(str)

    setIsEnglishOldPassword(english)
    setIsNotEmptyOldPassword(notEmty)
    setIsLengthOldPassword(length)
    setIsLowerCaseOldPassword(lower)
    setIsUpperCaseOldPassword(upper)
    setIsNumberOldPassword(number)
    setIsSpecialSymbolOldPassword(special)
    setOldPassword(str)
  }
  const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const str: string = e.target.value
    const notEmty = !!str
    const english = /^[^А-Яа-я]+$/.test(str)
    const length = str.length >= 8
    const number = /[0-9]+/.test(str)
    const upper = /[A-Z]+/.test(str)
    const lower = /[a-z]+/.test(str)
    const special = /[!@#$%^&*]+/.test(str)

    setIsEnglishNewPassword(english)
    setIsNotEmptyNewPassword(notEmty)
    setIsLengthNewPassword(length)
    setIsLowerCaseNewPassword(lower)
    setIsUpperCaseNewPassword(upper)
    setIsNumberNewPassword(number)
    setIsSpecialSymbolNewPassword(special)
    setNewPassword(str)
  }
  
  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }
  const onSubmit = () => {
    const payload: IUpdatePasswordForm = {
      oldPassword,
      newPassword,
    }
    
    dispatch(updatePassword(payload))
    onHide()
    emptyState()
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить пароль
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.flex}>
        <div className={styles.element}>
            <Input value={oldPassword} placeholder='Старый пароль' onChange={onChangeOldPassword} />
            <Hint text='пароль не должен быть пустым' color={isValid && isNotEmptyOldPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='минимум 8 символов' color={isValid && isLengthOldPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='латинские буквы' color={isValid && isEnglishOldPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='минимум 1 цифра' color={isValid && isNumberOldPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='минимум 1 заглавная буква' color={isValid && isUpperCaseOldPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='минимум 1 прописная буква' color={isValid && isLowerCaseOldPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='специальный символ:  ! @ # $ % ^ & *' color={isValid && isSpecialSymbolOldPassword ? statusColor.OK : statusColor.ERROR} />
          </div>
          <div className={styles.element}>
            <Input value={newPassword} placeholder='Новый пароль' onChange={onChangeNewPassword} />
            <Hint text='пароль не должен быть пустым' color={isValid && isNotEmptyNewPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='минимум 8 символов' color={isValid && isLengthNewPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='латинские буквы' color={isValid && isEnglishNewPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='минимум 1 цифра' color={isValid && isNumberNewPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='минимум 1 заглавная буква' color={isValid && isUpperCaseNewPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='минимум 1 прописная буква' color={isValid && isLowerCaseNewPassword ? statusColor.OK : statusColor.ERROR} />
            <Hint text='специальный символ:  ! @ # $ % ^ & *' color={isValid && isSpecialSymbolNewPassword ? statusColor.OK : statusColor.ERROR} />
          </div>
          <div className={styles.element}>
            <Input value={confirmPassword} placeholder='Повторить пароль' onChange={onChangeConfirmPassword} />
            <Hint text='пароли совпадают' color={isValid && coincidenceConfirmPassword ? statusColor.OK : statusColor.ERROR} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonSubmit disabled={disabledSubmit} width='200px' text='Изменить' onClick={onSubmit} />
      </Modal.Footer>
    </Modal>
  )
}
