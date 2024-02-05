import { MonthType } from '@/src/types'
import MonthlyTableHeader from './MonthlyTableHeader/MonthlyTableHeader'
import MonthlyTableBody from './MonthlyTableBody/MonthlyTableBody'

type MonthlyCalendarProps = {
  month: MonthType
  year: number
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ month, year }) => {
  return (
    <table className="w-full h-full mx-auto border border-collapse border-gray-200 table-fixed">
      <MonthlyTableHeader />
      <MonthlyTableBody month={month} year={year} />
    </table>
  )
}

export default MonthlyCalendar
