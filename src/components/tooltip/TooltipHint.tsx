import React, { FC, ReactElement } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import './tooltipHint.scss'
interface TooltipHintProps {
    children: ReactElement,
    text: string,
    placement?: "left-start" | "top" | "bottom" 
}
export const TooltipHint: FC<TooltipHintProps> = ({ children, text,placement = "left-start" }) => {
    const renderTooltip = (props:any) => (
        <Tooltip id="button-tooltip" {...props}>
            {text}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement={placement}
            delay={{ show: 100, hide: 100 }}
            overlay={renderTooltip}>
            {children}
        </OverlayTrigger>
    )
}
