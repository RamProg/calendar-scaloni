import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { EventType } from '@/src/types';
import { useState } from 'react';
import { getMonthName } from '@/src/utils/dates';
import MonthlyTableCell from './MonthlyTableCell/MonthlyTableCell';

type MonthlyTableCellContainerProps = {
  dayEvents: EventType[];
  day: number;
  month: number;
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

  return (
    <MonthlyTableCell
      date={date}
      openModal={openModal}
      isDayEventsModalOpen={isDayEventsModalOpen}
      setIsDayEventsModalOpen={setIsDayEventsModalOpen}
      hasMoreThanThreeEvents={hasMoreThanThreeEvents}
      dayEvents={dayEvents}
      day={day}
    />
  );
};

export default MonthlyTableCellContainer;
