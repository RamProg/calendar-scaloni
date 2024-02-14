import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { EventType, MonthType } from '@/src/types';
import { useState } from 'react';
import { getMonthName } from '@/src/utils/dates/dates';
import MonthlyTableCell from './MonthlyTableCell/MonthlyTableCell';

type MonthlyTableCellContainerProps = {
  dayEvents: EventType[];
  day: number;
  month: MonthType;
  year: number;
  hasMoreThanThreeEvents: boolean;
};

const MonthlyTableCellContainer: React.FC<MonthlyTableCellContainerProps> = ({
  dayEvents,
  month,
  year,
  day,
  hasMoreThanThreeEvents,
}) => {
  const [isDayEventsModalOpen, setIsDayEventsModalOpen] =
    useState<boolean>(false);
  const { openModal } = useEventModal();

  const date = `${day} ${getMonthName(month)} ${year}`;

  const toogleModal = () => {
    setIsDayEventsModalOpen((prev) => !prev);
  };

  return (
    <MonthlyTableCell
      date={date}
      openModal={openModal}
      isDayEventsModalOpen={isDayEventsModalOpen}
      toogleModal={toogleModal}
      hasMoreThanThreeEvents={hasMoreThanThreeEvents}
      dayEvents={dayEvents}
      day={day}
    />
  );
};

export default MonthlyTableCellContainer;
