import React, { FC, useState } from 'react'
import styles from './dialog-profile.module.scss'
import './dialog-profile.scss'
import { Offcanvas } from 'react-bootstrap'
import { Chart } from '@components/chart/Chart'
import EditSVG from '@assets/image/edit.svg'
import { ChangeName } from '@modal/change-name/ChangeName'
import { ChangeLogin } from '@modal/change-login/ChangeLogin'
import { ChangePassword } from '@modal/change-password/ChangePassword'
import { DeleteProfile } from './../../../../modal/delete-profile/DeleteProfile';
import { IUser } from '@api/types/user-response'
import { format } from 'date-fns'
interface DialogProfileProps {
  user: IUser | null
  onClose: () => void
  show: boolean
}
export const DialogProfile: FC<DialogProfileProps> = ({onClose,show,user}) => {
  const [isModalChangeName, setIsModalChangeName] = useState<boolean>(false)
  const [isModalChangeLogin, setIsModalChangeLogin] = useState<boolean>(false)
  const [isModalChangePassword, setIsModalChangePassword] = useState<boolean>(false)
  const [isModalDeleteProfile, setIsModalDeleteProfile] = useState<boolean>(false)
  
  const onHideChangeName = () => {
    setIsModalChangeName(false)
  }
  const onHideChangeLogin = () => {
    setIsModalChangeLogin(false)
  }
  const onHideChangePassword = () => {
    setIsModalChangePassword(false)
  }
  
  const onHideDeleteProfile = () => {
    setIsModalDeleteProfile(false)
  }
  
  return (
    <>
    <Offcanvas show={show} onHide={onClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className={styles.header}>
              <p className={styles.title}>{user?.name}</p>
              <div className={styles.desc}>
                <p className={styles.login}>{user?.login}</p>
                <div>
                  <p className={styles.register}>Регистрация:</p>
                  {user && <p className={styles.date}>{format(user.createAt,'dd.MM.yyyy')}</p>}
                </div>
              </div>
            </div>  
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{position: 'relative'}}>
          <p className={styles['title-chart']}>Статистика по статусам задач</p>
          <Chart/>
          <div className={styles.edit}>
            <div className={styles.flex}>
              <p>Изменить имя</p>
              <img onClick={() => setIsModalChangeName(true)} src={EditSVG} alt="edit" />
            </div>
            <div className={styles.flex}>
              <p>Изменить логин</p>
              <img onClick={() => setIsModalChangeLogin(true)} src={EditSVG} alt="edit" />
            </div>
            <div className={styles.flex}>
              <p>Изменить пароль</p>
              <img onClick={() => setIsModalChangePassword(true)} src={EditSVG} alt="edit" />
            </div>
          </div>
          <p onClick={() => setIsModalDeleteProfile(true)} className={styles.delete}>Удалить аккаунт</p>
        </Offcanvas.Body>
      </Offcanvas>
      <ChangeName show={isModalChangeName} onHide={onHideChangeName}/>
      <ChangeLogin show={isModalChangeLogin} onHide={onHideChangeLogin} />
      <ChangePassword show={isModalChangePassword} onHide={onHideChangePassword}/>
      <DeleteProfile show={isModalDeleteProfile} onHide={onHideDeleteProfile}/>
      </>
  )
}
