import { useState } from 'react';
import { DateDirection, MonthType } from '@/src/types';
import MonthlyView from './MonthlyView/MonthlyView';

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const MonthlyViewContainer: React.FC = () => {
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

  return <MonthlyView onChangeDate={onChangeDate} month={month} year={year} />;
};

export default MonthlyViewContainer;
