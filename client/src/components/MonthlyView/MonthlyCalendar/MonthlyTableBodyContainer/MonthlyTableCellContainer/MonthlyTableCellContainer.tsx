import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { EventType } from '@/src/types';
import { useState } from 'react';
import MonthlyTableCell from './MonthlyTableCell/MonthlyTableCell';

type MonthlyTableCellContainerProps = {
  dayEvents: EventType[];
  day: number;
  hasMoreThanThreeEvents: boolean;
};

const MonthlyTableCellContainer: React.FC<MonthlyTableCellContainerProps> = ({
  dayEvents,
  day,
  hasMoreThanThreeEvents,
}) => {
  const [isDayEventsModalOpen, setIsDayEventsModalOpen] =
    useState<boolean>(false);
  const { openModal } = useEventModal();

  const toogleModal = () => {
    setIsDayEventsModalOpen((prev) => !prev);
  };

  return (
    <MonthlyTableCell
      openModal={openModal}
      isDayEventsModalOpen={isDayEventsModalOpen}
      toogleModal={toogleModal}
      hasMoreThanThreeEvents={hasMoreThanThreeEvents}
      dayEvents={dayEvents}
      day={String(day)}
    />
  );
};

export default MonthlyTableCellContainer;
