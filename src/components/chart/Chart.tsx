import React from 'react'
import './chart.module.scss'
import { StatusChart } from './components/status-chart/StatusChart';
import { statusTaskColor } from '@enum/statusTaskType';

export const Chart = () => {
    return (
        <StatusChart data={[
            {
                name: 'Создана',
                value: 5,
                color: statusTaskColor.CREATED
            },
            {
                name: 'В работе',
                value: 5,
                color: statusTaskColor.WORKS
            },
            {
                name: 'Закрыта',
                value: 5,
                color: statusTaskColor.CLOSED
            }
        ]}/>
    );
}
