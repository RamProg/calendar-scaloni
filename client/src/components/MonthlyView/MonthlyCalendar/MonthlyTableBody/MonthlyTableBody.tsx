import useTasks from '@/src/hooks/useTasks/useTasks';
import { MonthType } from '@/src/types';
import { getDaysInMonth, getFirstDayOfTheMonth } from '@/src/utils/dates';

type MonthlyTableBodyProps = {
  month: MonthType;
  year: number;
};

const rows = new Array(5).fill(null);
const columns = new Array(7).fill(null);

const MonthlyTableBody: React.FC<MonthlyTableBodyProps> = ({ month, year }) => {
  const tasks = useTasks(month, year);

  const firstThreeTasks = tasks.slice(0, 3);
  const showMore = tasks.length > 3;

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
                  className="overflow-hidden align-text-top border border-gray-200"
                >
                  {nextDay > 0 && (
                    <>
                      <p className="py-1 text-center">{nextDay}</p>
                      <ul className="h-1 list-disc list-inside">
                        {firstThreeTasks.map((task, i) => {
                          return (
                            <li
                              key={task.id}
                              className="mx-2 overflow-hidden text-overflow-ellipsis whitespace-nowrap"
                            >
                              {task.title}
                            </li>
                          );
                        })}
                        {showMore && (
                          <li className="mx-2 text-center underline list-none">
                            Show More
                          </li>
                        )}
                      </ul>
                    </>
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
