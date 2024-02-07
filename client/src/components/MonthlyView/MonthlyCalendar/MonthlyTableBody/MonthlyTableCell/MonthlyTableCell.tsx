import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { EventType } from '@/src/types';

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
  const { openModal } = useEventModal();

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
          <li className="mx-2 text-center underline list-none">Show More</li>
        )}
      </ul>
    </>
  );
};

export default MonthlyTableCell;
