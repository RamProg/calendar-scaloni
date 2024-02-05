import { nextOrPrevious } from '../MonthlyView'

type MonthlyNavBar = {
  month: number
  year: number
  onChangeDate: (newDateDirection: nextOrPrevious) => void
}

const MonthlyNavBar: React.FC<MonthlyNavBar> = ({
  month,
  year,
  onChangeDate,
}) => {
  const getMonthName = (monthNumber: number) => {
    const date = new Date(2020, monthNumber - 1)
    return date.toLocaleString('default', { month: 'long' })
  }

  const monthString = getMonthName(month)

  return (
    <div className="flex justify-between p-2">
      <div className="flex items-center">
        <button
          className="p-2 rounded-lg"
          onClick={() => onChangeDate('previous')}
        >
          Previous
        </button>
      </div>
      <div>
        <h1>
          {monthString} {year}
        </h1>
      </div>
      <div className="flex items-center">
        <button className="p-2 rounded-lg" onClick={() => onChangeDate('next')}>
          Next
        </button>
      </div>
    </div>
  )
}

export default MonthlyNavBar
