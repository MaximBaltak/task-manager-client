import { IStatusChartData } from '@components/chart/types/status-chart'
import React, { FC, useEffect, useState } from 'react'
import { Pie, PieChart, Tooltip, Legend, LabelList, Cell } from 'recharts'
import styles from './status-chart.module.scss'
import { ErrorStatusChar } from '../error-status-char/ErrorStatusChar'
interface StatusChartProps {
    data: IStatusChartData[]
}



const renderLegend = ({ payload }: any) => {

    if (payload) {
        return (
            <div className={styles.wrapper}>
                {(payload as any[]).map((el, i) =>
                    <div className={styles.legend} key={i}>
                        <div className={styles.indicator} style={{ background: el.color }}></div>
                        <p className={styles.text} style={{ color: el.color }}>{el.value}</p>
                    </div>)}
            </div>
        )
    }
    return null
}

const formatValue = (props: any) => {
    const RADIAN = Math.PI / 180;
    const radius = props.innerRadius + (props.outerRadius - props.innerRadius) * 0.5 + 71;
    const x = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
    const y = props.cy + radius * Math.sin(-props.midAngle * RADIAN);
    return (
        <text
            x={x}
            y={y}
            fill={props.fill}
            dominantBaseline="central"
        >
            {props.value}
        </text>
    )
}
export const StatusChart: FC<StatusChartProps> = ({ data }) => {
    const [colors, setColors] = useState<string[]>([])
    const [chartData, setChartData] = useState<IStatusChartData[]>([])

    useEffect(() => {
        if (data.length) {
            const newColors: string[] = data.map(item => item.color)
            setChartData([...data])
            setColors([...newColors])
        }
    }, [data])

    if(chartData.length) {
        return (
            <PieChart
            margin={{
                left: 50,
                bottom: 20
              }} 
            width={300} height={300} >
            <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={(chartData as any[])}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                fill="grey"
                label={formatValue}
            >
                <Tooltip />
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
            </Pie>
            <Legend content={renderLegend} />
        </PieChart>
        )
    }
    return <ErrorStatusChar/>
}