import { EventType } from '@/src/types';
import DayEventsModalContainer from './DayEventsModalContainer/DayEventsModalContainer';

type MonthlyTableCellProps = {
  dayEvents: EventType[];
  day: string;
  hasMoreThanThreeEvents: boolean;
  openModal: (event: EventType) => void;
  isDayEventsModalOpen: boolean;
  toogleModal: () => void;
};

const MonthlyTableCell: React.FC<MonthlyTableCellProps> = ({
  dayEvents,
  day,
  hasMoreThanThreeEvents,
  openModal,
  isDayEventsModalOpen,
  toogleModal,
}) => {
  return (
    <div data-testid="monthly-table-cell">
      <p className="py-1 text-center">{day}</p>
      <ul className="h-1 list-disc list-inside">
        {dayEvents?.slice(0, 3).map((event) => {
          return (
            <li
              key={`${event._id}-${day}`}
              className="mx-[2px] overflow-hidden text-sm list-none sm:mx-2 text-overflow-ellipsis whitespace-nowrap sm:text-base cursor-pointer hover:text-blue-800"
              onClick={() => openModal(event)}
            >
              {event.title}
            </li>
          );
        })}
        {hasMoreThanThreeEvents && (
          <>
            <li
              className="mx-2 mb-1 text-sm text-center underline list-none sm:mx-2 text-overflow-ellipsis whitespace-nowrap sm:text-base sm:mb-1 hover:cursor-pointer hover:text-blue-800"
              onClick={toogleModal}
            >
              <span className="hidden md:inline">Show </span>More
            </li>
            {isDayEventsModalOpen && (
              <DayEventsModalContainer
                day={day}
                onClose={toogleModal}
                events={dayEvents}
              />
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default MonthlyTableCell;
