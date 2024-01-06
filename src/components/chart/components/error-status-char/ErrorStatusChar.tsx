import React from 'react'
import { Pie, PieChart } from 'recharts'
import styles from './error-status-char.module.scss'
const formatValue = (props: any) => {
  const RADIAN = Math.PI / 180;
  const radius = props.innerRadius + (props.outerRadius - props.innerRadius) * 0.5 + 71;
  const x = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
  const y = props.cy + radius * Math.sin(-props.midAngle * RADIAN);
  return (
    <text
      x={x - 4}
      y={y}
      fill={props.fill}
      dominantBaseline="central"
      opacity={0.2}
    >
      0
    </text>
  )
}

export const ErrorStatusChar = () => {
  return (
    <div style={{ position: 'relative'}}>
    <p className={styles.error}>Нет данных</p>
    <PieChart 
    margin={{
      left: 50,
      bottom: 20
    }} 
    width={300} height={300} >
      <Pie
        isAnimationActive={false}
        opacity={0.2}
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={[{
          color: 'grey',
          value: 1
        }]}
        cx="50%"
        cy="50%"
        innerRadius={0}
        outerRadius={80}
        fill="grey"
        label={formatValue}
      />
    </PieChart>
    </div>
  )
}
