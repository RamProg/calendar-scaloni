import { useState } from 'react'
import MonthlyNavBar from './MonthlyNavBar/MonthlyNavBar'
import MonthlyCalendar from './MonthlyCalendar/MonthlyCalendar'
import { MonthType } from '@/src/types'

export type nextOrPrevious = 'next' | 'previous'

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const MonthlyView = () => {
  const [month, setMonth] = useState<MonthType>(currentMonth as MonthType)
  const [year, setYear] = useState<number>(currentYear)

  const onChangeDate = (dateDirection: nextOrPrevious) => {
    if (dateDirection === 'next') {
      if (month === 12) {
        setMonth(1)
        setYear((prev) => prev + 1)
      } else {
        setMonth((prev) => prev + 1 as MonthType)
      }
    }

    if (dateDirection === 'previous') {
      if (month === 1) {
        setMonth(12)
        setYear((prev) => prev - 1)
      } else if (month > 12) {
        setMonth((prev) => prev - 1 as MonthType)
      }
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen p-4">
      <MonthlyNavBar month={month} year={year} onChangeDate={onChangeDate} />
      <MonthlyCalendar month={month} year={year} />
    </div>
  )
}

export default MonthlyView
