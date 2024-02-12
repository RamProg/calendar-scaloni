import Button from '@/src/components/Button/Button';
import { DateDirection } from '../MonthlyView';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { getMonthName } from '@/src/utils/dates';
import { isMobile } from 'react-device-detect';

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

  const { serverErrors } = useEventModal();

  const monthString = getMonthName(month);

  return (
    <nav>
      {isMobile && (
        <h1 className="m-2 text-4xl text-center">
          {monthString} {year}
        </h1>
      )}
      <div className="flex justify-between p-2">
        <div className="flex items-center">
          <Button
            styleType="secondary"
            onClick={() => onChangeDate('today')}
            label={'Today'}
          />
        </div>
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
            {!isMobile ? (
              <h1 className="m-2 text-4xl text-center w-72">
                {monthString} {year}
              </h1>
            ): <div className="w-10"/>}
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
          <Button
            styleType="secondary"
            onClick={() => openModal()}
            label={'New'}
          />
        </div>
      </div>
      <div className="flex justify-center">
        {serverErrors.getData && (
          <span className="text-red-500">
            There was an issue connecting to the server...
          </span>
        )}
      </div>
    </nav>
  );
};

export default MonthlyNavBar;
