import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { EventType } from '@/src/types';
import DayEventsModal from './DayEventsModal/DayEventsModal';
import { useState } from 'react';

type MonthlyTableCellProps = {
  dayEvents: EventType[];
  dayNumber: number;
  hasMoreThanThreeEvents: boolean;
};

const MonthlyTableCell: React.FC<MonthlyTableCellProps> = ({
  dayEvents,
  dayNumber,
  hasMoreThanThreeEvents,
}) => {
  const [isDayEventsModalOpen, setIsDayEventsModalOpen] =
    useState<boolean>(false);
  const { openModal } = useEventModal();

  const date = dayNumber;

  return (
    <>
      <p className="py-1 text-center">{dayNumber}</p>
      <ul className="h-1 list-disc list-inside">
        {dayEvents?.map((event) => {
          return (
            <li
              key={event.id}
              className="mx-2 overflow-hidden text-overflow-ellipsis whitespace-nowrap"
              onClick={() => openModal(event)}
            >
              {event.title}
            </li>
          );
        })}
        {hasMoreThanThreeEvents && (
          <>
            <li
              className="mx-2 text-center underline list-none"
              onClick={() => setIsDayEventsModalOpen(true)}
            >
              Show More
            </li>
            {isDayEventsModalOpen && (
              <DayEventsModal
                date={`${date}`}
                onClose={() => setIsDayEventsModalOpen(false)}
                events={dayEvents}
              />
            )}
          </>
        )}
      </ul>
    </>
  );
};

export default MonthlyTableCell;
