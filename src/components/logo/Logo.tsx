import React, { FC } from 'react'
import {ReactComponent as LogoSVG} from '@assets/image/logo.svg';

interface LogoProps {
    size: 'bg' | 'md' | 'ml',
}

export const Logo: FC<LogoProps> = ({size}) => {
   const sizeStyle = {
    width: 200,
    height: 107,
   }
   
   if(size === 'md') {
        sizeStyle.width = 84
        sizeStyle.height = 45
   }
   if(size === 'ml') {
    sizeStyle.width = 31
    sizeStyle.height = 16
   }   
   
  return (
    <LogoSVG style={{...sizeStyle}}/>
  )
}
