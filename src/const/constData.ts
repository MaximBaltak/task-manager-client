import { IStatusSelect } from "@components/selectStatus/types/selectStatus"
import { statusTask, statusTaskColor } from "@enum/statusTaskType"

export const statusOptions: IStatusSelect[] = [
    {
      id: 1,
      name: 'Создана',
      value: statusTask.CREATED,
      color: statusTaskColor.CREATED
    },
    {
      id: 2,
      name: 'В работе',
      value: statusTask.WORKS,
      color: statusTaskColor.WORKS          
    },
    {
      id: 3,
      name: 'Закрыта',
      value: statusTask.CLOSED,
      color: statusTaskColor.CLOSED
    }
]
export const defaultStatus: IStatusSelect = {
  id: 1,
  name: 'Создана',
  value: statusTask.CREATED,
  color: statusTaskColor.CREATED
}