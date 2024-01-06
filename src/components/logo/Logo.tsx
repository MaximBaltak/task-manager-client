import React, { FC } from 'react'
import {ReactComponent as LogoSVG} from '@assets/image/logo.svg';
import {ReactComponent as LogoWhiteSVG} from '@assets/image/logo-white.svg';

interface LogoProps {
    size: 'bg' | 'md' | 'ml',
    color?: "white"
}

export const Logo: FC<LogoProps> = ({size,color}) => {
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
   
   if(color === 'white'){
        return  <LogoWhiteSVG style={{...sizeStyle}}/>
   }
   
   return  <LogoSVG style={{...sizeStyle}}/>
}
