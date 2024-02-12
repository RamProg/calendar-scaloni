import Button from '@/src/components/common/Button/Button';
import { isMobile } from 'react-device-detect';
import { DateDirection } from '@/src/components/MonthlyView/MonthlyView';

type MonthlyNavBarProps = {
  openModal: () => void;
  serverErrors: { getData: boolean };
  monthString: string;
  year: number;
  onChangeDate: (newDateDirection: DateDirection) => void;
};

const MonthlyNavBar: React.FC<MonthlyNavBarProps> = ({
  openModal,
  serverErrors,
  monthString,
  year,
  onChangeDate,
}) => {
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
            ) : (
              <div className="w-5" />
            )}
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
