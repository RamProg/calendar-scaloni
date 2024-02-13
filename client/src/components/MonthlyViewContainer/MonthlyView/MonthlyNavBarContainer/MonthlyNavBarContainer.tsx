import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { getMonthName } from '@/src/utils/dates/dates';
import MonthlyNavBar from './MonthlyNavBar/MonthlyNavBar';
import { DateDirection } from '@/src/types';

type MonthlyNavBarContainerProps = {
  month: number;
  year: number;
  onChangeDate: (newDateDirection: DateDirection) => void;
};

const MonthlyNavBarContainer: React.FC<MonthlyNavBarContainerProps> = ({
  month,
  year,
  onChangeDate,
}) => {
  const { openModal } = useEventModal();

  const { serverErrors } = useEventModal();

  const monthString = getMonthName(month);

  return (
    <MonthlyNavBar
      openModal={openModal}
      serverErrors={serverErrors}
      monthString={monthString}
      year={year}
      onChangeDate={onChangeDate}
    />
  );
};

export default MonthlyNavBarContainer;
