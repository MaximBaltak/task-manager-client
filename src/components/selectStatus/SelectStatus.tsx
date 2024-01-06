import React, { FC } from 'react'
import Select, { SelectItemRenderer, SelectRenderer } from 'react-dropdown-select';
import './selectStatus.scss'
import { IStatusSelect } from './types/selectStatus';
interface SelectStatusProps {
  options: IStatusSelect[]
  selected: IStatusSelect[],
  onChange: (value: IStatusSelect[]) => void
}

export const SelectStatus: FC<SelectStatusProps> = ({ selected, options, onChange }) => {

  const optionRenderer = ({ item, methods }: SelectItemRenderer<IStatusSelect>) => {

    return (
      <div
        className='option'
        onClick={() => methods.addItem(item)}
        style={{ color: item.color }} >
        {item.name}
      </div>
    )
  }

  const contentRenderer = ({ props }: SelectRenderer<IStatusSelect>) => {
    const key: string = props.valueField as string
    const item: IStatusSelect = props.values[0]
    return (
      <p style={{ color: item.color, margin: 0 }}>{item[key]}</p>
    )

  }
  return (
    <Select
      className='select'
      options={options}
      values={selected}
      onChange={onChange}
      labelField='name'
      valueField='name'
      searchable={false}
      itemRenderer={optionRenderer}
      contentRenderer={contentRenderer}
    />
  );
}
