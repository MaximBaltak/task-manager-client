import React, { FC } from 'react'
import './chart.module.scss'
import { StatusChart } from './components/status-chart/StatusChart';
import { statusTaskColor } from '@enum/statusTaskType';
import { IStatusChartData } from './types/status-chart';
interface IChartProps {
    data: IStatusChartData[]
}
export const Chart: FC<IChartProps> = ({data}) => {
    return (
        <StatusChart data={data}/>
    );
}
