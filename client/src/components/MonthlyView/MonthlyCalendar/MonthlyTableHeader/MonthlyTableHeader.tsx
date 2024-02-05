import { daysOfTheWeek } from '@/src/constants'

const MonthlyTableHeader = () => {
  return (
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
  )
}

export default MonthlyTableHeader
