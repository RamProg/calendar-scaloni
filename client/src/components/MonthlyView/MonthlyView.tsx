import { daysOfTheWeek } from '@/src/constants'
import { getDaysInMonth, getFirstDayOfTheMonth } from '@/src/utils/dates'
import { useState } from 'react'
import MonthlyNavBar from './MonthlyNavBar/MonthlyNavBar'

const rows = new Array(5).fill(null)
const columns = new Array(7).fill(null)

export type nextOrPrevious = 'next' | 'previous'

const MonthlyView = () => {
  const [month, setMonth] = useState(2)
  const [year, setYear] = useState(2024)

  const onChangeDate = (dateDirection: nextOrPrevious) => {
    if (dateDirection === 'next') {
      if (month === 12) {
        setMonth(1)
        setYear((prev) => prev + 1)
      } else {
        setMonth((prev) => prev + 1)
      }
    }

    if (dateDirection === 'previous') {
      if (month === 1) {
        setMonth(12)
        setYear((prev) => prev - 1)
      } else {
        setMonth((prev) => prev - 1)
      }
    }
  }

  const startingDay = getFirstDayOfTheMonth(month, year)
  const lastDay: number = getDaysInMonth(month, year)

  let nextDay: number = 0

  return (
    <div className="flex flex-col w-screen h-screen">
      <MonthlyNavBar month={month} year={year} onChangeDate={onChangeDate} />
      <table className="w-full h-full mx-auto border border-collapse border-gray-200 table-auto">
        <thead>
          <tr>
            {daysOfTheWeek.map((day) => {
              const firstThreeLetters = day.substring(0, 3)

              return (
                <th
                  key={day}
                  className="h-2 py-2 border border-gray-200"
                  scope="col"
                >
                  {firstThreeLetters}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((_, i) => {
            return (
              <tr key={i}>
                {columns.map((_, j) => {
                  if (nextDay || startingDay === j) {
                    if (nextDay < lastDay) {
                      nextDay++
                    } else {
                      nextDay = 0
                    }
                  }

                  return (
                    <td
                      key={`${i}-${j}`}
                      className="px-4 py-2 text-center align-text-top border border-gray-200"
                    >
                      {nextDay > 0 ? nextDay : ''}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MonthlyView
