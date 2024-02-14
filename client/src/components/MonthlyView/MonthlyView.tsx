import MonthlyCalendar from './MonthlyCalendar/MonthlyCalendar';
import MonthlyNavBarContainer from './MonthlyNavBarContainer/MonthlyNavBarContainer';

const MonthlyView: React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-screen p-4">
      <MonthlyNavBarContainer />
      <MonthlyCalendar />
    </div>
  );
};

export default MonthlyView;
