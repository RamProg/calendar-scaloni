import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { EventType } from '@/src/types';
import DayEventsModal from './DayEventsModal/DayEventsModal';
import { useState } from 'react';
import { getMonthName } from '@/src/utils/dates';

type MonthlyTableCellProps = {
  dayEvents: EventType[];
  day: number;
  month: number;
  year: number;
  hasMoreThanThreeEvents: boolean;
};

const MonthlyTableCell: React.FC<MonthlyTableCellProps> = ({
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
    <>
      <p className="py-1 text-center">{day}</p>
      <ul className="h-1 list-disc list-inside">
        {dayEvents?.slice(0, 3).map((event) => {
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
