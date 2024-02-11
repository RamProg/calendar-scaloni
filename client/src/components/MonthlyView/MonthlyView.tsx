import { useState } from 'react';
import MonthlyNavBar from './MonthlyNavBar/MonthlyNavBar';
import MonthlyCalendar from './MonthlyCalendar/MonthlyCalendar';
import { MonthType } from '@/src/types';

export type DateDirection =
  | 'nextMonth'
  | 'previousMonth'
  | 'previousYear'
  | 'nextYear'
  | 'today';

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const MonthlyView = () => {
  const [month, setMonth] = useState<MonthType>(currentMonth as MonthType);
  const [year, setYear] = useState<number>(currentYear);

  const onChangeDate = (dateDirection: DateDirection) => {
    switch (dateDirection) {
      case 'today':
        setMonth(currentMonth as MonthType);
        setYear(currentYear);
        break;
      case 'nextYear':
        setYear((prev) => prev + 1);
        break;
      case 'previousYear':
        setYear((prev) => prev - 1);
        break;
      case 'nextMonth':
        if (month === 12) {
          setMonth(1);
          setYear((prev) => prev + 1);
        } else {
          setMonth((prev) => (prev + 1) as MonthType);
        }
        break;
      case 'previousMonth':
        if (month === 1) {
          setMonth(12);
          setYear((prev) => prev - 1);
        } else {
          setMonth((prev) => (prev - 1) as MonthType);
        }
        break;
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen p-4">
      <MonthlyNavBar month={month} year={year} onChangeDate={onChangeDate} />
      <MonthlyCalendar month={month} year={year} />
    </div>
  );
};

export default MonthlyView;
