import { EventType } from '@/src/types';
import DayEventsModalContainer from './DayEventsModalContainer/DayEventsModalContainer';
import { isDesktop } from 'react-device-detect';

type MonthlyTableCellProps = {
  dayEvents: EventType[];
  day: number;
  hasMoreThanThreeEvents: boolean;
  date: string;
  openModal: (event: EventType) => void;
  isDayEventsModalOpen: boolean;
  setIsDayEventsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MonthlyTableCell: React.FC<MonthlyTableCellProps> = ({
  dayEvents,
  day,
  hasMoreThanThreeEvents,
  date,
  openModal,
  isDayEventsModalOpen,
  setIsDayEventsModalOpen,
}) => {
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
              <DayEventsModalContainer
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
