import Button from '@/src/components/Button/Button';
import { DateDirection } from '../MonthlyView';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';

type MonthlyNavBar = {
  month: number;
  year: number;
  onChangeDate: (newDateDirection: DateDirection) => void;
};

const MonthlyNavBar: React.FC<MonthlyNavBar> = ({
  month,
  year,
  onChangeDate,
}) => {
  const { openModal } = useEventModal();

  const getMonthName = (monthNumber: number) => {
    const date = new Date(2020, monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  const monthString = getMonthName(month);

  return (
    <nav className="flex justify-between p-2">
      <div className="flex" />
      <div className="flex">
        <div className="flex items-center">
          <Button
            onClick={() => onChangeDate('previousYear')}
            styles="mr-2"
            label={'<<'}
          />
          <Button onClick={() => onChangeDate('previousMonth')} label={'<'} />
        </div>
        <div>
          <h1 className="m-2 text-4xl text-center w-72">
            {monthString} {year}
          </h1>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => onChangeDate('nextMonth')}
            styles="mr-2"
            label={'>'}
          />
          <Button onClick={() => onChangeDate('nextYear')} label={'>>'} />
        </div>
      </div>
      <div className="flex items-center">
        <Button onClick={() => openModal()} label={'+'} />
      </div>
    </nav>
  );
};

export default MonthlyNavBar;
