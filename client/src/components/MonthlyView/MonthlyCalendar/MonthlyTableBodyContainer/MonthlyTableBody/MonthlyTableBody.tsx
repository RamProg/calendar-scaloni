import { EventsByDayType } from '@/src/types';
import MonthlyTableCellContainer from '../MonthlyTableCellContainer/MonthlyTableCellContainer';

export type MonthlyTableBodyProps = {
  startingDay: number;
  lastDay: number;
  isToday: (today: number) => boolean;
  nextDay: number;
  columns: unknown[];
  rows: unknown[];
  monthlyEventsByDay: EventsByDayType;
};

const MonthlyTableBody: React.FC<MonthlyTableBodyProps> = ({
  nextDay,
  startingDay,
  lastDay,
  isToday,
  columns,
  rows,
  monthlyEventsByDay,
}) => {
  return (
    <tbody>
      {rows.map((_, i) => {
        return (
          <tr key={i}>
            {columns.map((_, j) => {
              if (nextDay || startingDay === j) {
                if (nextDay < lastDay) {
                  nextDay++;
                } else {
                  nextDay = 0;
                }
              }

              return (
                <td
                  key={`${i}-${j}`}
                  className={`overflow-hidden align-text-top border-t border-l border-gray-200 first:border-l-0 ${isToday(nextDay) && 'bg-blue-100'} hover:bg-pink-50`}
                >
                  {nextDay > 0 && (
                    <MonthlyTableCellContainer
                      key={nextDay}
                      dayEvents={monthlyEventsByDay[nextDay]}
                      day={nextDay}
                      hasMoreThanThreeEvents={
                        monthlyEventsByDay[nextDay]?.length > 3
                      }
                    />
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default MonthlyTableBody;
