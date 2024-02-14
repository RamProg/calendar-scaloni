import { DateDirection, MonthType } from '@/src/types';
import { currentMonth, currentYear } from '@/src/utils/dates/dates';
import { ReactNode, useState } from 'react';
import { CurrentViewedDateContext } from '../CurrentViewedDateContext/CurrentViewedDateContext';

export const CurrentViewedDateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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
    <CurrentViewedDateContext.Provider value={{ month, year, onChangeDate }}>
      {children}
    </CurrentViewedDateContext.Provider>
  );
};
