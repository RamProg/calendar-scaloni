import MonthlyView from './MonthlyView/MonthlyView';
import { useCurrentViewedDate } from '@/src/hooks/useCurrentViewedDate/useCurrentViewedDate';

const MonthlyViewContainer: React.FC = () => {
  const { month, year, onChangeDate } = useCurrentViewedDate();

  return <MonthlyView onChangeDate={onChangeDate} month={month} year={year} />;
};

export default MonthlyViewContainer;
