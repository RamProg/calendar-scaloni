import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { getMonthName } from '@/src/utils/dates/dates';
import MonthlyNavBar from './MonthlyNavBar/MonthlyNavBar';
import { useCurrentViewedDate } from '@/src/hooks/useCurrentViewedDate/useCurrentViewedDate';

const MonthlyNavBarContainer: React.FC = () => {
  const { month, year, onChangeDate } = useCurrentViewedDate();
  const { openModal, serverErrors } = useEventModal();

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
