import { DateDirection, MonthType } from '@/src/types';
import MonthlyCalendar from './MonthlyCalendar/MonthlyCalendar';
import MonthlyNavBarContainer from './MonthlyNavBarContainer/MonthlyNavBarContainer';

type MonthlyViewProps = {
  month: MonthType;
  year: number;
  onChangeDate: (dateDirection: DateDirection) => void
};

const MonthlyView: React.FC<MonthlyViewProps> = ({
  month,
  year,
  onChangeDate,
}) => {
  return (
    <div className="flex flex-col w-screen h-screen p-4">
      <MonthlyNavBarContainer month={month} year={year} onChangeDate={onChangeDate} />
      <MonthlyCalendar month={month} year={year} />
    </div>
  );
};

export default MonthlyView;
