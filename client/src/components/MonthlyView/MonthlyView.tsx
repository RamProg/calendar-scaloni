import { daysOfTheWeek } from "@/src/constants";
import { getDaysInMonth, getFirstDayOfTheMonth } from "@/src/utils/dates";

const MonthlyView = () => {
  const rows = new Array(5).fill(null);
  const columns = new Array(7).fill(null);

  const startingDay = getFirstDayOfTheMonth(2, 2024); // Wednesday

  let nextDay: number = 0;
  const lastDay: number = getDaysInMonth(2, 2024);

  return (
    <table className="w-screen h-screen mx-auto border border-collapse border-gray-200 table-auto">
      <thead>
        <tr>
          {daysOfTheWeek.map((day, i) => (
            <th key={i} className="h-2 py-2 border border-gray-200" scope="col">
              {day.substring(0, 3)}
            </th>
          ))}
        </tr>
      </thead>
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
                    className="px-4 py-2 text-center align-text-top border border-gray-200"
                  >
                    {nextDay > 0 ? nextDay : ""}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MonthlyView;
