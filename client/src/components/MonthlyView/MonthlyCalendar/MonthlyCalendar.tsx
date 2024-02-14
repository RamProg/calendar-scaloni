import MonthlyTableHeader from './MonthlyTableHeader/MonthlyTableHeader';
import MonthlyTableBodyContainer from './MonthlyTableBodyContainer/MonthlyTableBodyContainer';

const MonthlyCalendar: React.FC = () => {
  return (
    <div className="w-full h-full overflow-hidden border border-gray-200 rounded-2xl">
      <table className="w-full h-full border-collapse table-fixed ">
        <MonthlyTableHeader />
        <MonthlyTableBodyContainer />
      </table>
    </div>
  );
};

export default MonthlyCalendar;
