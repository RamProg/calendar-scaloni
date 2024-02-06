import { daysOfTheWeek } from '@/src/constants';

const MonthlyTableHeader = () => {
  return (
    <thead className="rounded-lg">
      <tr>
        {daysOfTheWeek.map((day) => {
          const firstThreeLetters = day.substring(0, 3);

          return (
            <th
              key={day}
              className="h-2 py-2 border-l border-gray-200 first:border-l-0"
              scope="col"
            >
              {firstThreeLetters}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default MonthlyTableHeader;
