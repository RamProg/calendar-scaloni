import { MonthType } from '@/src/types';
import MonthlyTableHeader from './MonthlyTableHeader/MonthlyTableHeader';
import MonthlyTableBodyContainer from './MonthlyTableBodyContainer/MonthlyTableBodyContainer';

type MonthlyCalendarProps = {
  month: MonthType;
  year: number;
};

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ month, year }) => {
  return (
    <div className="w-full h-full overflow-hidden border border-gray-200 rounded-2xl">
      <table className="w-full h-full border-collapse table-fixed ">
        <MonthlyTableHeader />
        <MonthlyTableBodyContainer month={month} year={year} />
      </table>
    </div>
  );
};

export default MonthlyCalendar;
