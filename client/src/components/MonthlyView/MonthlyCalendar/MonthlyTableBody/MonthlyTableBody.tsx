import useEvents from '@/src/hooks/useEvents/useEvents';
import { MonthType } from '@/src/types';
import { getDaysInMonth, getFirstDayOfTheMonth } from '@/src/utils/dates';
import MonthlyTableCell from './MonthlyTableCell/MonthlyTableCell';

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

  const startingDay = getFirstDayOfTheMonth(month, year);
  const lastDay: number = getDaysInMonth(month, year);

  let nextDay: number = 0;

  const isToday = (today: number) => {
    const date = new Date();
    const compareDate = new Date(year, month - 1, today);

    return date.toDateString() === compareDate.toDateString();
  };

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
                    <MonthlyTableCell
                      key={nextDay}
                      month={month}
                      year={year}
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
