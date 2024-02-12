import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { EventType } from '@/src/types';
import DayEventsModal from './DayEventsModal/DayEventsModal';
import { useState } from 'react';
import { getMonthName } from '@/src/utils/dates';
import { isDesktop } from 'react-device-detect';

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
              key={`${event._id}-${day}`}
              className="mx-[2px] overflow-hidden text-sm list-none sm:mx-2 text-overflow-ellipsis whitespace-nowrap sm:text-base mb-1 sm:mb-1 cursor-pointer hover:text-blue-800"
              onClick={() => openModal(event)}
            >
              {event.title}
            </li>
          );
        })}
        {hasMoreThanThreeEvents && (
          <>
            <li
              className="mx-2 mb-1 text-center underline list-none sm:mx-2 text-overflow-ellipsis whitespace-nowrap sm:text-base sm:mb-1 hover:cursor-pointer hover:text-blue-500"
              onClick={() => setIsDayEventsModalOpen(true)}
            >
              {isDesktop && 'Show '}More
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
