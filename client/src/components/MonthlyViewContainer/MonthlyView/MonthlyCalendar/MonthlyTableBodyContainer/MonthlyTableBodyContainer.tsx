import useEvents from '@/src/hooks/useEvents/useEvents';
import { MonthType } from '@/src/types';
import { getDaysInMonth, getFirstDayOfTheMonth } from '@/src/utils/dates/dates';
import MonthlyTableBody from './MonthlyTableBody/MonthlyTableBody';

type MonthlyTableBodyContainerProps = {
  month: MonthType;
  year: number;
};

const rows = new Array(5).fill(null);
const columns = new Array(7).fill(null);

const MonthlyTableBodyContainer: React.FC<MonthlyTableBodyContainerProps> = ({
  month,
  year,
}) => {
  const { monthlyEventsByDay } = useEvents({
    month,
    year,
  });

  const startingDay = getFirstDayOfTheMonth(month, year);
  const lastDay: number = getDaysInMonth(month, year);

  const nextDay: number = 0;

  const isToday = (today: number) => {
    const date = new Date();
    const compareDate = new Date(year, month - 1, today);

    return date.toDateString() === compareDate.toDateString();
  };

  return (
    <MonthlyTableBody
      startingDay={startingDay}
      lastDay={lastDay}
      isToday={isToday}
      nextDay={nextDay}
      month={month}
      year={year}
      columns={columns}
      rows={rows}
      monthlyEventsByDay={monthlyEventsByDay}
    />
  );
};

export default MonthlyTableBodyContainer;
