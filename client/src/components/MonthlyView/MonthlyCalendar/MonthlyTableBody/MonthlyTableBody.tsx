import useEvents from '@/src/hooks/useEvents/useEvents';
import { MonthType } from '@/src/types';
import { getDaysInMonth, getFirstDayOfTheMonth } from '@/src/utils/dates';
import MonthlyTableCell from './MonthlyTableCell/MonthlyTableCell';

const eventsInMonth = {
  0: [{}, {}],
  1: {},
};

eventsInMonth[0];

type MonthlyTableBodyProps = {
  month: MonthType;
  year: number;
};

const rows = new Array(5).fill(null);
const columns = new Array(7).fill(null);

const MonthlyTableBody: React.FC<MonthlyTableBodyProps> = ({ month, year }) => {
  const { monthlyEventsByDay } = useEvents({
    month,
    year,
  });

  console.log({ monthlyEventsByDay });

  const startingDay = getFirstDayOfTheMonth(month, year);
  const lastDay: number = getDaysInMonth(month, year);

  let nextDay: number = 0;

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
                  className="overflow-hidden align-text-top border-t border-l border-gray-200 first:border-l-0"
                >
                  {nextDay > 0 && (
                    <MonthlyTableCell
                      dayEvents={monthlyEventsByDay[nextDay]?.slice(0, 3)}
                      dayNumber={nextDay}
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
