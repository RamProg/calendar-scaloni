import { DateDirection, MonthType } from '@/src/types';
import { currentMonth, currentYear } from '@/src/utils/dates/dates';
import { createContext } from 'react';

const defaultViewedDateContextType = {
  month: currentMonth as MonthType,
  year: currentYear,
  onChangeDate: () => {},
};

export interface ViewedDateContextType {
  month: MonthType;
  year: number;
  onChangeDate: (dateDirection: DateDirection) => void;
}

export const CurrentViewedDateContext = createContext<ViewedDateContextType>(
  defaultViewedDateContextType
);
